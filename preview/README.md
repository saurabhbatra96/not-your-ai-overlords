# Local preview harness

Renders the theme to static HTML with stubbed Ghost helpers and screenshots it
at three breakpoints — no Ghost install needed. Used to check the layout
against `../inspiration-images/`.

```bash
npm install handlebars playwright
node render.js ./out            # writes out/home.html and out/post.html
node shoot.js  ./out/home.html ./shot-home
```

The helper stubs in `render.js` are approximations (dates and `{{plural}}` are
hardcoded); real Ghost output differs in those spots only.

Set `CHROME_PATH` if Playwright cannot find its own Chromium build.
Drop a `portrait.png` next to the rendered HTML to preview the hero image.
