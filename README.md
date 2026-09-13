# Future Stack Solutions — portfolio

The portfolio site for Future Stack Solutions, a web development studio in Dhaka.

Live: https://podenapata-sys.github.io/fs-solutions/

## What's here

A single page, in English and Bangla, built the same way as the client work it
shows: plain HTML, CSS and JavaScript. No framework, no build step, no
`npm install`. Clone it and open `index.html`.

```
index.html            the whole page
assets/styles.css     all styling
assets/app.js         language toggle + copyright year, and nothing else
assets/work/          case-study screenshots
```

## Editing it

**Text** lives in `index.html`. Every translatable element carries both languages
as attributes:

```html
<p data-en="English text" data-bn="বাংলা লেখা">English text</p>
```

The element's own content is the English, so the page reads correctly before any
JavaScript runs. `assets/app.js` swaps in `data-bn` when the visitor picks Bangla.
When you add text, add both attributes and put the English between the tags.

**Adding a project.** Copy the `<section class="case">` block, change the
screenshots and copy, and add a nav link. The layout is a grid — it does not need
changing for a second or third project.

**Screenshots** go in `assets/work/` as JPEGs around 1600px wide, quality ~82.
Keep them under about 200 KB each.

## Deploying

Pushing to `main` deploys automatically via `.github/workflows/pages.yml`.
Nothing to build, nothing to install.

## A note on the content

Every figure on the page is measured from the Omega Dental repository, not
estimated: page counts, translated string pairs, price entries, gallery photos,
structured-data blocks and commit count. If the work changes, re-check them
before changing the numbers. There are no invented testimonials, no client logos
that aren't real clients, and no claims about experience that can't be shown.
