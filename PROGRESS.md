# Progress – stahlmann.ch

Status as of 11 November 2026. Onepager for **Stahlmann Konditionstrainer** (Thomas Stadelmann): fitness coaching, sport-test prep for Polizei/Armee/Rettungsdienste, mental coaching – Zürich, Aargau, Zug.

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

## Design

Source: Figma file "Stahlmann – Logo / Wortmarke" – page **Website – Onepager** (desktop 1440 only) and page **Brand** (logo/wordmark/icon exploration).

Current direction: **"Tactical briefing"** – mission-dossier look. Mono section bars ("01 — Über mich"), square buttons, visible 1px line grid continuing through header and footer, green corner brackets on photos, pricing as a spec table. Colours unchanged from Figma (tokens in `src/styles/global.css`: `ink-*`, `line`, `fg*`, `pulse*`).

Decisions so far:

| Topic | Decision |
| --- | --- |
| Layout direction | Tactical briefing (picked from 5 directions; others archived) |
| Logo | Figma Brand "Wortmarke 2 – Mit Pulslinie" (no icon tile) |
| Favicon | Pulse tile (Figma Brand mark A) – `public/favicon.svg` |
| Body font | Geist (picked over Archivo, Inter, IBM Plex Sans, Mona Sans) |
| Story section | No overlaid badge – the patch is already on the vest in the photo |
| Mobile layout | Designed by us (Figma has desktop only) |
| Legal pages | Separate `/impressum` and `/datenschutz` |

## Structure

```
src/
  site.ts                 WhatsApp number, Instagram, Impressum data (placeholders!)
  content.ts              All page copy + nav, shared by every section
  styles/global.css       Fonts, theme tokens, container-page utility
  layouts/                Layout (head, header, footer), LegalLayout
  pages/                  index, impressum, datenschutz, 404
  components/
    Header, Footer, Logo, Button, SectionBar, Brackets
    sections/             Hero, Credentials, Story, Angebot, Preise, Kontakt
    archive/              Unused design directions (see archive/README.md)
public/                   favicon.svg, .htaccess (404 page, asset caching)
LocalValetDriver.php      Herd: serves dist/ locally (not deployed)
```

## Open before go-live

- [ ] `src/site.ts`: real WhatsApp number (`WHATSAPP_NUMBER`, digits only, e.g. `41791234567`)
- [ ] `src/site.ts`: Instagram URL
- [ ] `src/site.ts`: Impressum address, e-mail, phone (currently `[Strasse Nr.]` etc.)
- [ ] Datenschutz text is a first draft (Swiss DSG) – have it reviewed
- [ ] Optional: Open Graph image for link previews (none yet)
- [ ] Deploy: `npm run build`, upload the contents of `dist/` (incl. `.htaccess`) to the Hostpoint web root

## Ideas / not done

- Favicon could switch to the S-Monogramm (Figma Brand mark B)
- Hero photo is cropped to the right so the wall badge in the shot is mostly cut
- Archived directions (Figma original, Editorial, Poster, Premium) can be restored – see `src/components/archive/README.md`
