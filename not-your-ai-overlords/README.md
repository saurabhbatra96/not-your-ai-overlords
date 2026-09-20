# Not Your A.I. Overlords

A Ghost theme: warm near-black ground, cream panels, rust and dusty-blue
accents, high-contrast serif display type. Built to match the "field notes"
layout — arch portrait hero, one inverted lead panel, a rotating three-colour
card grid, and a rust correspondence band.

## Install

```bash
cd not-your-ai-overlords
zip -r ../not-your-ai-overlords.zip . -x '.*' -x '__MACOSX' -x '*/.*'
```

Then Ghost admin → **Settings → Design → Change theme → Upload theme**.

For local development, symlink the folder into `content/themes/` of your Ghost
install and restart.

## Templates

| File | Used for |
| --- | --- |
| `home.hbs` | Homepage, page 1 — hero, lead post, card grid |
| `index.hbs` | Homepage pages 2+, and the fallback archive |
| `post.hbs` | Posts, with related posts by primary tag |
| `page.hbs` | Static pages |
| `tag.hbs` / `author.hbs` | Collection archives |
| `error.hbs` | 404 and other errors |

## Theme settings

Editable under **Settings → Design → Site-wide / Homepage** without touching code:

- **Eyebrow** — the small caps line above the site title
- **Portrait** — the arch-cropped hero image
- **Byline mark / Byline text** — the small credit chip under the description
- **Lead label** — fallback label for the lead post when it has no tag
- **Section label** — heading over the card grid
- **Show card images** — off by default, matching the design's text-only cards
- **Newsletter eyebrow / heading / body** — copy for the correspondence band
- **Footer note** — the left-hand footer line (the year is appended)

Site title, description, navigation, and both logos come from Ghost's own
settings, so nothing is hardcoded.

## Design notes

- **Colour.** `--rust` (`#c2643c`) is for large type, rules and borders only.
  Small text, buttons and the rust card fill use `--rust-deep` (`#a9522e`),
  which clears 4.5:1 against cream where `--rust` reaches only 3.5:1.
- **Numbering.** The `01 /`, `02 /` prefixes are CSS counters, so they stay
  correct as posts are added and never need a template helper.
- **Card colours** rotate charcoal → blue → rust via `:nth-child(3n)`.
- **Fonts** are Playfair Display and Inter from Google Fonts, each with a
  system fallback stack. To self-host, drop the woff2 files into
  `assets/fonts/`, replace the `<link>` in `default.hbs` with `@font-face`
  rules, and keep the `--font-display` / `--font-body` tokens as they are.

## Requirements

Ghost 5.0 or later (Ghost API v5). No build step — plain CSS and JS.
