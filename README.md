# stahlmann.ch

Onepager for Stahlmann Konditionstrainer – Astro 7, Tailwind CSS 4, static output.

Design: Figma file "Stahlmann – Logo / Wortmarke", page "Website – Onepager".

## Development

Requires Node 24 (see `.nvmrc`).

```sh
nvm use
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Placeholders

`src/site.ts` holds the WhatsApp number, Instagram URL and Impressum details – replace before go-live.

## Deployment (Hostpoint)

Run `npm run build` and upload the contents of `dist/` to the web root.

## Herd

`LocalValetDriver.php` lets Herd serve the built `dist/` at https://stahlmann.ch.test – run `npm run build` to refresh it. For live reload use `npm run dev`.
