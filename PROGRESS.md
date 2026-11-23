# Progress – stahlmann.ch

Status as of 23 November 2026. Onepager for **Stahlmann Konditionstrainer** (Thomas Stadelmann): fitness coaching, sport-test prep for Polizei/Armee/Rettungsdienste, mental coaching – Zürich, Aargau, Zug.

## Pick up on another machine

```sh
git clone https://github.com/marceli-to/stahlmann.ch.git
cd stahlmann.ch
nvm install            # Node 24.22.0 from .nvmrc – Astro 7 needs >= 22.23.4
npm install
npm run dev            # http://localhost:4321
```

Optional, Laravel Herd: if the folder sits in a parked Herd directory, `LocalValetDriver.php` serves the built `dist/` at `https://stahlmann.ch.test` (run `herd secure stahlmann.ch` once, then `npm run build` to refresh).

## Stack

- Astro 7, static output; Tailwind CSS 4 via `@tailwindcss/vite`
- Fonts self-hosted via Fontsource (no Google requests): **Archivo Black** (headlines), **Geist** (body), **JetBrains Mono** (labels, buttons, prices)
- Images through `astro:assets` (WebP, responsive `srcset`)
- Small inline script only for the mobile menu (`Header.astro`)
- SEO: meta + Open Graph/Twitter tags and JSON-LD (`LocalBusiness` with offers, homepage only) in `Layout.astro`; `@astrojs/sitemap`; `public/robots.txt`; `llms.txt` generated from `content.ts` (`src/pages/llms.txt.ts`)
- Accessibility: skip link, labelled sections, decorative glyphs/numbers hidden from screen readers, new-window hints on external links, pointer cursor on buttons

## Design

Source: Figma file "Stahlmann – Logo / Wortmarke" (https://www.figma.com/design/esJLCEg4PyIGOxQUeooJxc/Stahlmann-%E2%80%93-Logo---Wortmarke, fileKey `esJLCEg4PyIGOxQUeooJxc`; final logo is component `Logo / Stahlmann Konditionstrainer`, node `17:46`, on the Brand page; the earlier exploration "Wortmarke 2 – Mit Pulslinie" is node `1:114`) – page **Website – Onepager** (desktop 1440 only) and page **Brand** (logo/wordmark/icon exploration).

Current direction: **"Tactical briefing"** – mission-dossier look. Mono section bars ("01 — Über mich"), square buttons, visible 1px line grid continuing through header and footer, green corner brackets on photos, pricing as a spec table. Colours unchanged from Figma (tokens in `src/styles/global.css`: `ink-*`, `line`, `fg*`, `pulse*`).

Decisions so far:

| Topic | Decision |
| --- | --- |
| Layout direction | Tactical briefing (picked from 5 directions; others archived) |
| Logo | Outlined SVG from Figma component `Logo / Stahlmann Konditionstrainer` (based on Wortmarke 2, no icon tile). KONDITIONSTRAINER is enlarged so it ends at the right edge of STAHLMANN (client request). Web: `src/assets/icons/logo.svg` (wordmark in `currentColor`); print/business cards: `brand/logo-on-dark.svg`, `brand/logo-on-light.svg` (RGB – get CMYK/Pantone values from the printer) |
| Favicon | Pulse tile (Figma Brand mark A) – `public/favicon.svg` |
| Body font | Geist (picked over Archivo, Inter, IBM Plex Sans, Mona Sans) |
| Story section | No overlaid badge – the patch is already on the vest in the photo |
| Mobile layout | Designed by us (Figma has desktop only) |
| Legal pages | Separate `/impressum` and `/datenschutz` |
| Photo hover | Short shake on the hero and portrait photos; corner brackets stay still (`animate-shake`, off with reduced motion) |
| Angebot cards | No icons; title is a numbered green mono h3 (`01 Behörden-Sporttests`) |
| Card alignment | Angebot and Preise cards use CSS subgrid so titles, texts, prices and buttons line up across columns |
| Hinweis note (Story) | Green-tinted box (`bg-pulse-tint`) with white text – bright green with white text fails contrast |
| Header | `position: fixed` (not sticky) – sticky inside the `overflow-x-clip` page wrapper jittered while scrolling in mobile Chrome; wrapper has matching `pt-[calc(4.5rem+1px)]`. Solid background, no backdrop blur (iOS flicker) |
| Signal pulse | Green streak runs along the header line and each section bar (`pulse-line` utility in `global.css`, staggered, off with reduced motion) |

## Structure

```
src/
  site.ts                 WhatsApp number, Instagram, Impressum data (placeholders!)
  content.ts              All page copy + nav, shared by every section
  styles/global.css       Fonts, theme tokens, container-page utility
  layouts/                Layout (head, header, footer), LegalLayout
  pages/                  index, impressum, datenschutz, 404, og (share-image template)
  components/
    Header, Footer, Logo, Button, SectionBar, Brackets
    sections/             Hero, Credentials, Story, Angebot, Preise, Kontakt
    archive/              Unused design directions (see archive/README.md)
brand/                    Logo SVGs for print (on dark / on light)
public/                   favicon.svg, apple-touch-icon.png, og-image.jpg, robots.txt, .htaccess
LocalValetDriver.php      Herd: serves dist/ locally (not deployed)
deploy.sh                 Build + rsync to Hostpoint (staging default, production TODO)
scripts/og-image.sh       `npm run og`: renders public/og-image.jpg
```

## Open before go-live

- [x] `src/site.ts`: WhatsApp number (Thomas' mobile, assumed to be his WhatsApp too – confirm)
- [ ] `src/site.ts`: Instagram URL
- [x] `src/site.ts`: Impressum address, e-mail, phone (Seeblickstrasse 12b, 8918 Unterlunkhofen)
- [ ] Datenschutz text is a first draft (Swiss DSG) – have it reviewed
- [x] Address and phone in the JSON-LD in `Layout.astro`; packages priced "Auf Anfrage" carry no price there
- [x] Share image `public/og-image.jpg` (1200×630) is rendered from `src/pages/og.astro` – re-render with `npm run og` if headline or photo change. `og:image` carries a content hash (`?v=…`) so messengers refetch it; WhatsApp also caches per page URL, so test with a fresh one (e.g. `/?x=2`)
- [x] Staging live at https://stahlmann.ch.marceli.to, deployed with `./deploy.sh`
- [ ] Production: set `HOST_PRODUCTION` / `WEBROOT_PRODUCTION` at the top of `deploy.sh`, then `./deploy.sh production`

## Deployment

`./deploy.sh` builds the committed state (refuses uncommitted changes) with `SITE_URL` set to the target domain, so canonical/OG/sitemap/llms.txt point there, and rsyncs `dist/` over SSH.

- Staging: `pumutuxu@marceli.to:/home/pumutuxu/www/stahlmann.ch/public` → https://stahlmann.ch.marceli.to; gets a `noindex` header and a blocking robots.txt
- Production: not configured yet

## Recent changes (23 Nov)

- New SVG logo (see Design table), used in header, footer and share image; share image re-rendered
- Client feedback applied in `content.ts`: stats labels (Sicherheitsbehörde, KFOR / NATO, American Football, Feuerwehr-Intervention), Über mich wording, new "Männersport" line, "Sportbetreuung" item in the Behörden and 10er-Abo packages, Premium-Coaching renamed to "Coaching nach Mass" and priced "Auf Anfrage", note "1 Session = 1 Lektion à 2 Stunden"
- Coordinates in hero and footer: 47.1795°N 8.5553°E (from the client)
- Real contact details; e-mail and phone are links

## Recent fixes (12 Nov)

- Stats grid (Credentials) overflowed at 360–390px: smaller values with tight leading on phones, hyphenated labels
- Header jitter/flicker on mobile: see Header decision above
- Mobile menu: numbers vertically centred on labels; panel scrolls itself if taller than the screen
- WhatsApp showed the apple-touch-icon instead of the share image (stale preview cache) – cache-busting query on `og:image`

## Next

- Open questions sent to Thomas (`Fragen an Thomas.txt`): Premium title ("Coaching nach Mass" is our pick), session length wording, "Offensive Line", whether the Premium package features stay now that it is priced on request
- Deploy the 23 Nov changes to staging (`./deploy.sh`)

- Confirm on a phone that the header no longer jitters; if it does, turn off the `pulse-line` animation on the header next
- Confirm the WhatsApp preview with a fresh URL
- Fill in the go-live placeholders above

## Ideas / not done

- Favicon could switch to the S-Monogramm (Figma Brand mark B)
- Hero photo is cropped to the right so the wall badge in the shot is mostly cut
- Archived directions (Figma original, Editorial, Poster, Premium) can be restored – see `src/components/archive/README.md`
