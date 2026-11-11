// Central site settings. Replace the placeholders before go-live.

// TODO: real WhatsApp number in international format, digits only (e.g. 41791234567)
export const WHATSAPP_NUMBER = '41790000000';

// TODO: real Instagram profile
export const INSTAGRAM_URL = 'https://www.instagram.com/';

export const SITE = {
  name: 'Stahlmann Konditionstrainer',
  owner: 'Thomas Stadelmann',
  url: 'https://stahlmann.ch',
  description:
    'Taktisches Athletiktraining, Sporttest-Vorbereitung für Polizei, Armee und Rettungsdienste sowie Personal Coaching in Zürich, Aargau und Zug.',
  // TODO: Impressum details
  address: {
    street: '[Strasse Nr.]',
    city: '[PLZ Ort]',
    email: '[E-Mail]',
    phone: '[Telefon]',
  },
};

/** wa.me link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
