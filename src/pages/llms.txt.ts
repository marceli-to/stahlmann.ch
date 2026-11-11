// llms.txt (https://llmstxt.org) – generated from the page content so it stays in sync.
import type { APIRoute } from 'astro';
import { SITE, whatsappLink } from '../site';
import { hero, stats, story, pillars, packages, pricingNote, contact } from '../content';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site ?? SITE.url).href;

  const body = `# ${SITE.name}

> ${SITE.description}

${hero.lead}

## Über ${SITE.owner}

${story.text}

${stats.map((s) => `- ${s.value}: ${s.label}`).join('\n')}

${story.experience.map((e) => `- ${e.label}: ${e.text}`).join('\n')}

${story.flex}

## Angebot

${pillars.map((p) => `- ${p.title}: ${p.text}`).join('\n')}

## Preise & Pakete

${packages
  .map(
    (p) => `### ${p.title} (${p.tag})

${p.audience}. ${p.price} (${p.priceNote}).

${p.features.map((f) => `- ${f}`).join('\n')}`,
  )
  .join('\n\n')}

${pricingNote}

## Kontakt

${contact.text} WhatsApp: ${whatsappLink()}

## Seiten

- [Startseite](${url('/')}): Angebot, Über mich, Preise und Kontakt
- [Impressum](${url('/impressum/')})
- [Datenschutz](${url('/datenschutz/')})
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
