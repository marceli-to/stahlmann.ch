// Page content shared by all design variants.
import { whatsappLink } from './site';

export const hero = {
  eyebrow: 'Überlass deinen Erfolg nicht dem Zufall.',
  title: 'Kondition, Sporttest-Vorbereitung & mentale Stärke.',
  lead: 'Taktisches Athletiktraining und Personal Coaching für Bewerberinnen und Bewerber von Polizei, Armee und Rettungsdiensten – und für alle Sportlerinnen und Sportler, die mehr wollen. In Zürich, Aargau und Zug.',
  ctaHref: whatsappLink('Hallo Thomas, ich interessiere mich für ein kostenloses Erstgespräch.'),
};

export const stats = [
  { value: '15 Jahre', label: 'Sicherheitsbehörde (Polizei)' },
  { value: '2×', label: 'Auslandseinsatz NATO, Spezialinfanterie' },
  { value: '30+ Jahre', label: 'Leistungssport: Football, Ironman, Marathon' },
  { value: 'Aktuell', label: 'Feuerwehr, Intervention' },
];

export const story = {
  name: 'Thomas «Stahlmann» Stadelmann',
  text: 'Polizei, Spezialinfanterie, Feuerwehr: In meinem Beruf habe ich gelernt, unter Druck klar und handlungsfähig zu bleiben. Als Athlet – über 30 Jahre American Football, dazu Ironman und Marathons – weiss ich, was es heisst, Körper und Kopf an die Grenze zu bringen. Ich kenne die physischen und mentalen Hürden aus eigener Erfahrung, bis hin zu einem Motorrad-Weltrekord in der Todeskugel. Und ich zeige dir, wie du sie überwindest.',
  quote: 'Ich kenne die physischen und mentalen Hürden aus eigener Erfahrung. Und ich zeige dir, wie du sie überwindest.',
  experience: [
    {
      label: 'Beruf',
      text: '15 Jahre Sicherheitsbehörde, zwei Auslandseinsätze in einer Spezialinfanterie, heute Feuerwehr / Intervention.',
    },
    {
      label: 'Frauensport',
      text: '5 Jahre Konditionscoach für Damenteams im Unihockey – mit Fokus auf Verletzungsprävention und Leistungssteigerung.',
    },
    {
      label: 'Sport',
      text: 'American Football für Explosivität und Physis, Marathon und Ironman für Ausdauer und mentale Härte. Nebenbei Thaiboxen.',
    },
  ],
  flex: 'Dank meinem Schichtrhythmus trainiere ich antizyklisch und flexibel – dann, wenn es in deinen Zeitplan passt. Kein Standardprogramm, sondern strukturiertes Training für Körper und Kopf.',
};

export const pillars = [
  {
    title: 'Behörden-Sporttests',
    text: 'Vorbereitung auf die Sporttests von Polizei, Armee, Grenzwacht und Rettungsdiensten. Exakte Simulation von Kraftparcours, Pendellauf und Ausdauer – inklusive Schwimmtraining für die Polizeischule.',
  },
  {
    title: 'Mentale Stärke',
    text: 'Mindset-Coaching, Fokus unter Belastung und Strategien gegen den inneren Schweinehund. Für eiserne Disziplin im Sport und im Alltag.',
  },
  {
    title: 'Back to Sport',
    text: 'Sicherer, strukturierter Wiederaufbau von Ausdauer und funktioneller Kraft nach einer Pause oder Verletzung.',
  },
  {
    title: 'Flexibles Personal Training',
    text: 'Effiziente Trainingsslots unter der Woche, tagsüber oder abends. Ideal für Schichtarbeitende und Selbstständige.',
  },
];

export const packages = [
  {
    tag: 'Behörden-Sporttests',
    title: 'Mission: Einsatzbereit',
    audience: 'Für: Polizei, Armee, Grenzwacht',
    price: "CHF 1'450.–",
    priceNote: 'oder 3 × CHF 490.–',
    features: ['3 Monate Laufzeit', '12 × Personal Training (1:1)', 'Exakte Test-Simulation', 'Trainingsplan für freie Tage', 'Mentaltraining'],
    featured: true,
  },
  {
    tag: '10er-Abo',
    title: 'Stahlmann Kondition',
    audience: 'Für: Athletinnen, Athleten & Wiedereinsteiger',
    price: "CHF 1'350.–",
    priceNote: 'CHF 135.– pro Session',
    features: ['10 × Kondition & Athletik (1:1)', 'Flexibel buchbare Slots', 'Ideal für Schichtarbeitende', 'Outdoor oder im Partner-Gym'],
    featured: false,
  },
  {
    tag: 'Premium-Coaching',
    title: 'Mind & Body Transformation',
    audience: 'Für: Persönliche Weiterentwicklung',
    price: 'CHF 450.–',
    priceNote: 'pro Monat · mind. 3 Monate',
    features: ['Wöchentliches 1:1 Training', 'Wöchentlicher Mindset-Call (30 Min.)', 'Gewohnheiten & Routinen', 'WhatsApp-Support bei Motivationslöchern'],
    featured: false,
  },
].map((pkg) => ({ ...pkg, href: whatsappLink(`Hallo Thomas, ich interessiere mich für das Paket «${pkg.title}».`) }));

export const pricingNote = 'Alle Preise in CHF inkl. allfälliger MWST. Ort: Outdoor oder Partner-Gym in der Region Zürich, Aargau und Zug.';

export const contact = {
  title: 'Bereit für das nächste Level?',
  text: 'Vergiss Ausreden. Schreib mir direkt auf WhatsApp – das erste Beratungsgespräch ist kostenlos.',
  cta: 'Jetzt starten – WhatsApp-Nachricht senden',
  href: whatsappLink('Hallo Thomas, ich bin bereit für das nächste Level!'),
};

export const disciplines = ['Polizei', 'Armee', 'Grenzwacht', 'Feuerwehr', 'Rettungsdienst', 'Football', 'Ironman', 'Marathon', 'Back to Sport', 'Mentale Stärke'];

export const nav = [
  { index: '01', label: 'Story', href: '/#story' },
  { index: '02', label: 'Angebot', href: '/#angebot' },
  { index: '03', label: 'Preise', href: '/#preise' },
  { index: '04', label: 'Kontakt', href: '/#kontakt' },
];
