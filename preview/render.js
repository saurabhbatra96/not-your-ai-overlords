/* Minimal Ghost-shaped renderer: enough helper surface to preview the theme. */
const hbs = require('handlebars').create();
const fs = require('fs'), path = require('path');
const THEME = path.resolve(__dirname, '..', 'not-your-ai-overlords');
const OUT = process.argv[2];

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

// --- data -----------------------------------------------------------------
const site = {
    title: 'Not Your A.I. Overlords',
    description: 'A warm dispatch from the workbench: engineering, digital craft, and the strange small experiments that make a system sing.',
    url: '#', locale: 'en', logo: null, members_enabled: true,
};
const custom = {
    eyebrow: 'Field notes on making systems feel human',
    portrait: 'portrait.png',
    byline_mark: 'ibm.svg',
    byline_text: 'Saurabh Batra · Engineer / maker',
    lead_label: 'The lead experiment',
    section_label: 'Recent experiments',
    show_card_images: false,
    newsletter_eyebrow: 'Correspondence / once a month',
    newsletter_heading: 'A note from the workbench.',
    newsletter_body: 'No growth loops. Just an occasional bundle of observations, diagrams, and unfinished thoughts.',
    footer_note: 'Made slowly in London',
};
const P = (title, tag, excerpt) => ({
    title, url: '#', excerpt, reading_time: '6 min read',
    primary_tag: {name: tag, slug: tag.toLowerCase(), url: '#'},
    tags: [{name: tag, url: '#'}, {name: 'Craft', url: '#'}],
    authors: [{name: 'Saurabh Batra'}], published_at: '2026-09-02',
});
const posts = [
    P('The case for leaving a little friction in the machine', 'The lead experiment',
      'Perfectly smooth interfaces often erase the evidence of care. A note on designing tools that reveal their joinery, invite curiosity, and give their users something honest to hold onto.'),
    P('Soft edges, hard constraints', 'Systems', 'What crochet taught me about architectural boundaries.'),
    P('Make the tool show its seams', 'Fieldwork', 'A field guide for legible interfaces and generous defaults.'),
    P('The fifteen-minute repair', 'Practice', 'A small ritual for rescuing projects before they calcify.'),
    P('Notes on a slower deploy', 'Systems', 'Shipping less often, and what it did to the review culture.'),
    P('The index that lied', 'Fieldwork', 'A query planner, a stale histogram, and four hours of confusion.'),
    P('Naming things twice', 'Practice', 'Why the second name is usually the right one.'),
];
const pagination = {page: 1, pages: 3, total: posts.length, prev: null, next: 2, limit: 13};
const navigation = [{label: 'Field notes', url: '#', current: false}, {label: 'About', url: '#', current: false}];
const secondary = [{label: 'Archive', url: '#', current: false}];

// --- helpers --------------------------------------------------------------
hbs.registerHelper({
    asset: p => S('file://' + path.join(THEME, 'assets', p)),
    ghost_head: () => S(''), ghost_foot: () => S(''),
    body_class: function () { return this.bodyClass || 'home-template'; },
    meta_title: () => site.title,
    img_url: u => (typeof u === 'string' ? u : ''),
    reading_time: function () { return this.reading_time || '6 min read'; },
    url: function (o) { return (o && o.hash && o.hash.absolute, this.url) || '#'; },
    page_url: n => '#page-' + n,
    content: function () { return S(this.html || ''); },
    comments: () => S(''),
    date: function (d, o) {
        const fmt = (o && o.hash && o.hash.format) || 'D MMM YYYY';
        if (fmt === 'YYYY') return '2026';
        if (fmt === 'YYYY-MM-DD') return '2026-09-02';
        if (fmt === 'MMMM YYYY') return 'September 2026';
        return fmt.includes('MMMM') ? '2 September 2026' : '2 Sep 2026';
    },
    excerpt: function (o) {
        const n = parseInt((o && o.hash && o.hash.words) || 30, 10);
        return (this.excerpt || '').split(/\s+/).slice(0, n).join(' ');
    },
    plural: (n, o) => (n ? (n === 1 ? o.hash.singular : o.hash.plural).replace('%', String(n).padStart(2, '0')) : o.hash.empty),
    navigation: o => {
        const items = (o.hash && o.hash.type === 'secondary') ? secondary : navigation;
        return S(hbs.partials.navigation ? hbs.compile(hbs.partials.navigation)({navigation: items}) : '');
    },
    pagination: () => S(hbs.compile(hbs.partials.pagination)(pagination)),
    foreach: function (list, o) {
        list = list || [];
        const from = parseInt((o.hash.from || 1), 10) - 1;
        const limit = o.hash.limit ? parseInt(o.hash.limit, 10) : list.length;
        const slice = list.slice(from, from + limit);
        return slice.map((item, i) => o.fn(item, {
            data: Object.assign(hbs.createFrame(o.data), {
                index: i, number: i + 1, first: i === 0, last: i === slice.length - 1,
            }),
        })).join('');
    },
    get: function (type, o) {
        const related = posts.slice(1, 4);
        return o.fn(this, {data: hbs.createFrame(o.data), blockParams: [related]});
    },
});

// --- render ---------------------------------------------------------------
function render(tpl, ctx, bodyClass) {
    const inner = hbs.compile(read(tpl).replace(/\{\{!<\s*default\}\}/, ''))(ctx, {
        data: {site, custom, member: null, page: {show_title_and_feature_image: true}},
    });
    return hbs.compile(read('default.hbs'))(
        Object.assign({body: S(inner), bodyClass}, ctx),
        {data: {site, custom, member: null, page: {}}}
    );
}

fs.mkdirSync(OUT, {recursive: true});
fs.writeFileSync(path.join(OUT, 'home.html'), render('home.hbs', {posts, pagination}, 'home-template'));

const post = Object.assign({}, posts[0], {
    html: `<p>The first thing a new tool does is hide its own workings. That is usually sold as a feature.</p>
<h2>Where the seams went</h2>
<p>Somewhere between the wireframe and the release, the joinery gets sanded off. What is left is smooth, confident, and completely opaque — you cannot tell whether the machine is thinking or stalling, whether your input landed or evaporated.</p>
<blockquote>A tool that shows its seams is asking you to trust it for reasons, not on faith.</blockquote>
<p>The fix is rarely more information. It is <strong>better-placed</strong> information: a progress state that names what it is doing, an <code>undo</code> that is visible before you need it.</p>
<ul><li>Name the operation, not the spinner.</li><li>Show the cost before the click.</li><li>Leave the door open for a second opinion.</li></ul>
<h3>A small test</h3>
<p>Hand the thing to someone who has never seen it. Ask them to narrate what they think it is doing. Every place they go quiet is a seam you sanded off too far.</p>`,
});
fs.writeFileSync(path.join(OUT, 'post.html'), render('post.hbs', {post, posts}, 'post-template'));
console.log('rendered to ' + OUT);
