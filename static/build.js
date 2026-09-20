#!/usr/bin/env node
/* Renders the Ghost theme in ../not-your-ai-overlords to a static site in
   ../site. The theme is never modified — this only reads it.

   Ghost URLs become relative paths so the output works under any base path
   (GitHub project sites live at /<repo>/, so root-relative paths escape it).
   Templates emit two tokens that are substituted per page, by depth:
     %ROOT%   -> './' | '../' | '../../'   (prefix for a path)
     %ROOTNS% -> '.'  | '..'  | '../..'    (no trailing slash; for @site.url)
*/
const hbs = require('handlebars').create();
const fs = require('fs');
const path = require('path');

const THEME = path.resolve(__dirname, '..', 'not-your-ai-overlords');
const OUT = path.resolve(process.argv[2] || path.join(__dirname, '..', 'site'));
const {site, custom, author, posts, pages, navigation, secondaryNavigation} = require('./content.js');
// Ghost's {{@site.url}} — relative, so it survives the project-site subpath.
site.url = '%ROOTNS%';

const themePkg = JSON.parse(fs.readFileSync(path.join(THEME, 'package.json'), 'utf8'));
const PER_PAGE = themePkg.config.posts_per_page;

/* The absolute base used only by 404.html, which GitHub Pages serves for
   arbitrarily deep URLs — relative paths would resolve against the wrong dir. */
const ABSOLUTE_BASE = process.env.SITE_BASE || '/not-your-ai-overlords/';

const S = s => new hbs.SafeString(s);
const read = f => fs.readFileSync(path.join(THEME, f), 'utf8');

// --- partials -------------------------------------------------------------
(function reg(dir, prefix) {
    fs.readdirSync(path.join(THEME, dir)).forEach(name => {
        const rel = path.join(dir, name);
        if (fs.statSync(path.join(THEME, rel)).isDirectory()) return reg(rel, prefix + name + '/');
        hbs.registerPartial(prefix + name.replace('.hbs', ''), read(rel));
    });
}('partials', ''));

// --- model ----------------------------------------------------------------
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const words = html => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

const tagIndex = new Map();
const model = posts.map(p => {
    const tags = p.tags.map(name => {
        const slug = slugify(name);
        if (!tagIndex.has(slug)) tagIndex.set(slug, {name, slug, url: '%ROOT%tag/' + slug + '/', posts: []});
        return tagIndex.get(slug);
    });
    const post = {
        id: p.slug,
        title: p.title,
        slug: p.slug,
        url: '%ROOT%notes/' + p.slug + '/',
        excerpt: p.excerpt,
        custom_excerpt: p.excerpt,
        html: p.html,
        published_at: p.date,
        reading_time: Math.max(1, Math.round(words(p.html) / 200)) + ' min read',
        feature_image: null,
        authors: [author],
        primary_author: author,
        tags,
        primary_tag: tags.find(t => t.name === p.tag) || tags[0],
    };
    return post;
});
model.forEach(p => p.tags.forEach(t => t.posts.push(p)));
const tags = [...tagIndex.values()];

const staticPages = pages.map(p => ({
    id: p.slug, title: p.title, slug: p.slug, url: '%ROOT%' + p.slug + '/',
    excerpt: p.excerpt, custom_excerpt: p.excerpt, html: p.html,
    published_at: new Date().toISOString().slice(0, 10),
    authors: [author], primary_author: author, tags: [], primary_tag: null,
    feature_image: null, reading_time: Math.max(1, Math.round(words(p.html) / 200)) + ' min read',
}));

const navFor = current => navigation.map(n => ({
    label: n.label, url: '%ROOT%' + n.url, current: n.url === current,
}));
const secondaryFor = () => secondaryNavigation.map(n => ({label: n.label, url: '%ROOT%' + n.url, current: false}));

// --- date -----------------------------------------------------------------
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
function formatDate(value, format) {
    const d = value ? new Date(value + 'T12:00:00Z') : new Date();
    const Y = d.getUTCFullYear(), M = d.getUTCMonth(), D = d.getUTCDate();
    return format
        .replace(/YYYY/g, Y)
        .replace(/MMMM/g, MONTHS[M])
        .replace(/MMM/g, MONTHS[M].slice(0, 3))
        .replace(/MM/g, String(M + 1).padStart(2, '0'))
        .replace(/DD/g, String(D).padStart(2, '0'))
        .replace(/\bD\b/g, D);
}

// --- helpers --------------------------------------------------------------
hbs.registerHelper({
    asset: p => S('%ROOT%assets/' + p),
    ghost_head: () => S(''),
    ghost_foot: () => S(''),
    body_class: function () { return this.bodyClass || ''; },
    meta_title: function () { return this.metaTitle || site.title; },
    img_url: u => (typeof u === 'string' && u ? S(u.startsWith('http') ? u : '%ROOT%' + u) : ''),
    reading_time: function () { return this.reading_time || ''; },
    url: function () { return this.url || '%ROOTNS%'; },
    page_url: function (n) { return n === 1 ? '%ROOT%notes/' : '%ROOT%notes/page/' + n + '/'; },
    content: function () { return S(this.html || ''); },
    comments: () => '',
    date: function (value, options) {
        const opts = options || value;
        const fmt = (opts && opts.hash && opts.hash.format) || 'D MMM YYYY';
        const explicit = options ? value : null;
        return formatDate(explicit || this.published_at || null, fmt);
    },
    excerpt: function (options) {
        const n = parseInt((options && options.hash && options.hash.words) || 50, 10);
        const text = (this.excerpt || '').replace(/<[^>]+>/g, '');
        const parts = text.split(/\s+/).filter(Boolean);
        return parts.slice(0, n).join(' ') + (parts.length > n ? '…' : '');
    },
    plural: (n, options) => {
        const h = options.hash;
        if (!n) return h.empty;
        return (n === 1 ? h.singular : h.plural).replace('%', String(n).padStart(2, '0'));
    },
    navigation: function (options) {
        const secondary = options.hash && options.hash.type === 'secondary';
        const items = secondary ? secondaryFor() : navFor(this.currentNav);
        return S(hbs.compile(hbs.partials.navigation)({navigation: items}));
    },
    pagination: function () {
        return this.pagination ? S(hbs.compile(hbs.partials.pagination)(this.pagination)) : '';
    },
    foreach: function (list, options) {
        list = list || [];
        const from = parseInt(options.hash.from || 1, 10) - 1;
        const limit = options.hash.limit ? parseInt(options.hash.limit, 10) : list.length;
        const slice = list.slice(from, from + limit);
        return slice.map((item, i) => options.fn(item, {
            data: Object.assign(hbs.createFrame(options.data), {
                index: i, number: i + 1, first: i === 0, last: i === slice.length - 1,
            }),
        })).join('');
    },
    // {{#get "posts" ... as |related|}} — related posts, same tag first.
    get: function (type, options) {
        const current = this.post;
        const limit = parseInt(options.hash.limit || 3, 10);
        let pool = model.filter(p => !current || p.id !== current.id);
        if (current && current.primary_tag) {
            const same = pool.filter(p => p.primary_tag && p.primary_tag.slug === current.primary_tag.slug);
            pool = same.concat(pool.filter(p => same.indexOf(p) === -1));
        }
        const related = pool.slice(0, limit);
        return options.fn(this, {data: hbs.createFrame(options.data), blockParams: [related]});
    },
});

// --- render ---------------------------------------------------------------
const PREVIEW_SCRIPT = '<script src="%ROOT%assets/js/static-preview.js" defer></script>';

function render(tpl, ctx, bodyClass, metaTitle, currentNav) {
    const context = Object.assign({}, ctx, {bodyClass, metaTitle, currentNav});
    const data = {site, custom, member: null, page: {show_title_and_feature_image: true}};
    const inner = hbs.compile(read(tpl).replace(/\{\{!<\s*default\}\}/, ''))(context, {data});
    return hbs.compile(read('default.hbs'))(Object.assign({body: S(inner)}, context), {data});
}

function write(relPath, html, absoluteBase) {
    const depth = absoluteBase ? null : relPath.split('/').length - 1;
    const root = absoluteBase || (depth === 0 ? './' : '../'.repeat(depth));
    const rootNs = absoluteBase ? absoluteBase.replace(/\/$/, '') : (depth === 0 ? '.' : Array(depth).fill('..').join('/'));
    const out = html
        .replace('</body>', PREVIEW_SCRIPT + '\n</body>')
        // Ghost Portal has no static equivalent; point Subscribe at the form.
        .replace(/#\/portal\/(signup|account)/g, '#newsletter-heading')
        .replace(/%ROOTNS%/g, rootNs)
        .replace(/%ROOT%/g, root);
    const dest = path.join(OUT, relPath);
    fs.mkdirSync(path.dirname(dest), {recursive: true});
    fs.writeFileSync(dest, out);
    return relPath;
}

function paginate(total, page) {
    const pageCount = Math.max(1, Math.ceil(total / PER_PAGE));
    return {
        page, pages: pageCount, total, limit: PER_PAGE,
        prev: page > 1 ? page - 1 : null,
        next: page < pageCount ? page + 1 : null,
    };
}

// clean output
fs.rmSync(OUT, {recursive: true, force: true});
fs.mkdirSync(OUT, {recursive: true});

const written = [];

// home
written.push(write('index.html',
    render('home.hbs', {posts: model, pagination: paginate(model.length, 1)}, 'home-template', site.title, null)));

// /notes/ archive (index.hbs), paginated
const pageCount = Math.max(1, Math.ceil(model.length / PER_PAGE));
for (let n = 1; n <= pageCount; n++) {
    const slice = model.slice((n - 1) * PER_PAGE, n * PER_PAGE);
    const rel = n === 1 ? 'notes/index.html' : 'notes/page/' + n + '/index.html';
    written.push(write(rel, render('index.hbs',
        {posts: slice, pagination: paginate(model.length, n)},
        'paged-template', custom.section_label + ' — ' + site.title, 'notes/')));
}

// posts
model.forEach(post => {
    written.push(write('notes/' + post.slug + '/index.html',
        render('post.hbs', {post, posts: model}, 'post-template', post.title + ' — ' + site.title, 'notes/')));
});

// tag archives
tags.forEach(tag => {
    written.push(write('tag/' + tag.slug + '/index.html',
        render('tag.hbs', {tag, posts: tag.posts, pagination: paginate(tag.posts.length, 1)},
            'tag-template', tag.name + ' — ' + site.title, 'notes/')));
});

// static pages
staticPages.forEach(post => {
    written.push(write(post.slug + '/index.html',
        render('page.hbs', {post}, 'page-template', post.title + ' — ' + site.title, post.slug + '/')));
});

// 404 — absolute base, because Pages serves it from arbitrary depths
written.push(write('404.html',
    render('error.hbs', {error: {statusCode: 404, message: 'Page not found'}}, 'error-template',
        'Not found — ' + site.title, null),
    ABSOLUTE_BASE));

// assets
function copyDir(from, to) {
    fs.mkdirSync(to, {recursive: true});
    fs.readdirSync(from).forEach(name => {
        const src = path.join(from, name), dst = path.join(to, name);
        if (fs.statSync(src).isDirectory()) copyDir(src, dst);
        else fs.copyFileSync(src, dst);
    });
}
copyDir(path.join(THEME, 'assets'), path.join(OUT, 'assets'));
if (fs.existsSync(path.join(__dirname, 'images'))) copyDir(path.join(__dirname, 'images'), path.join(OUT, 'images'));

// static-preview shim: the newsletter form has no backend here.
fs.writeFileSync(path.join(OUT, 'assets/js/static-preview.js'),
`/* Static-preview only — not part of the Ghost theme.
   Ghost's members script handles this form for real; here we just show the
   success state so the layout can be judged. */
(function () {
    var form = document.querySelector('[data-members-form]');
    if (!form) return;
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.classList.add('success');
        form.setAttribute('data-members-form', 'success');
    });
}());
`);

// rss
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.title)}</title>
<description>${esc(site.description)}</description>
<link>${ABSOLUTE_BASE}</link>
${model.map(p => `<item>
<title>${esc(p.title)}</title>
<link>${ABSOLUTE_BASE}notes/${p.slug}/</link>
<guid isPermaLink="false">${p.slug}</guid>
<pubDate>${new Date(p.published_at + 'T12:00:00Z').toUTCString()}</pubDate>
<description>${esc(p.excerpt)}</description>
</item>`).join('\n')}
</channel></rss>
`;
fs.mkdirSync(path.join(OUT, 'rss'), {recursive: true});
fs.writeFileSync(path.join(OUT, 'rss/index.xml'), feed);
fs.writeFileSync(path.join(OUT, 'rss/index.html'),
    '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=index.xml">' +
    '<title>RSS</title><p><a href="index.xml">RSS feed</a></p>\n');
written.push('rss/index.xml');

// Pages must not run the output through Jekyll.
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log('rendered ' + written.length + ' files to ' + OUT);
written.forEach(f => console.log('  ' + f));
