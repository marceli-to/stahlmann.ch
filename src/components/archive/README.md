# Archived design directions

Backups from the design comparison (November 2026). Not used on the site; kept so a direction can be restored.

| Folder / file | Direction |
| --- | --- |
| `original/` | Figma original (Hero, PulseDivider, Credentials, Story, Angebot, Preise, Kontakt + its rounded `Button`) |
| `VariantEditorial.astro` | Editorial condensed – huge condensed caps, outlined numerals, rules instead of cards |
| `VariantPoster.astro` | Poster campaign – full-bleed hero, expanded caps, green ticker, pill buttons |
| `VariantPremium.astro` | Premium coaching – centred, serif italic accents, glow, bento cards |

All files read their content from `src/content.ts`.

To restore one, import it in `src/pages/index.astro`. Some directions need CSS that was removed from `src/styles/global.css`:

- **All four** were designed with Archivo as the body font (the live site uses Geist) – run `npm i @fontsource-variable/archivo`, add `@import "@fontsource-variable/archivo/wdth.css";` and set `--font-sans: "Archivo Variable", ui-sans-serif, system-ui, sans-serif;`. Editorial and Poster also rely on its width axis (`font-stretch-62%` / `font-stretch-125%`).

- **Premium** uses `font-serif` – run `npm i @fontsource/instrument-serif`, add `@import "@fontsource/instrument-serif/latin-400-italic.css";` and `--font-serif: "Instrument Serif", ui-serif, Georgia, serif;` in `@theme`.
- **Poster** uses `animate-marquee` – add to `@theme`:

  ```css
  --animate-marquee: marquee 40s linear infinite;
  @keyframes marquee { to { transform: translateX(-50%); } }
  ```
