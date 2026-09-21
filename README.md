# Not Your A.I. Overlords

A Ghost theme, plus a **temporary** static render of it for ideating on
GitHub Pages.

- **`not-your-ai-overlords/`** — the Ghost theme. This is the real deliverable
  and the source of truth for all markup and styling.
- **`static/`** — a build-only static site generator. Reads the theme's
  `.hbs` templates, stands in for the Ghost database with the content in
  `static/content.js`, and writes plain HTML to `site/`. **It never modifies
  the theme.**
- **`preview/`** — an older screenshot harness for checking layout at three
  breakpoints.

## Build the static site

```bash
cd static
npm install
node build.js          # writes ../site
cd ../site && python3 -m http.server 8080
```

Then open <http://localhost:8080>.

`.github/workflows/deploy.yml` runs the same build on every push to `main` and
publishes `site/` to GitHub Pages.

## Editing the preview

- **Copy** — `static/content.js` holds the site settings, the theme's custom
  settings, and the posts (title, tag, date, excerpt, HTML body).
- **Design** — edit the theme itself (`not-your-ai-overlords/assets/css/screen.css`
  and the `.hbs` files) and re-run the build. Changes flow through to both the
  preview and the real Ghost theme.
- **Images** — anything in `static/images/` is copied to the site, and a
  resized variant is generated for each width in the theme's `image_sizes`
  (`portrait-s.jpg`, `portrait-m.jpg`, …), so `{{img_url ... size="m"}}` and
  the `srcset`s resolve the way they do in Ghost. Needs ImageMagick locally;
  without it the build warns and serves the original unresized.
- **Hero photograph** — `static/images/portrait.jpg`, set as `custom.portrait`. It now runs full-bleed behind the homepage headline, not in an arch
  in `static/content.js`. It is a 1200px copy of `ai overlord.JPG`; the 1620px
  original lives in the (gitignored) `inspiration-images/`. In Ghost this is a
  `portrait` theme setting, so upload the original there rather than shipping
  it in the theme.

## What the static build fakes

The theme is written for Ghost, so a few things have no static equivalent:

| Ghost feature | In the static preview |
| --- | --- |
| Members / Portal | The Subscribe button jumps to the newsletter form |
| Newsletter signup | `assets/js/static-preview.js` shows the success state; nothing is sent |
| Search | The button renders but does nothing |
| Comments | Hidden |
| `{{#get}}` related posts | Same primary tag first, then most recent |
| Tag pages | Built, but unlinked — shelves are internal by design |

`assets/js/static-preview.js` is generated at build time and is **not** part of
the theme.

## Going back to Ghost

Nothing here has to be undone — the theme was never touched. To retire the
preview:

```bash
rm -rf static site .github/workflows/deploy.yml
```

Then install the theme in Ghost as usual (see
`not-your-ai-overlords/README.md`).
