// Central site settings. Replace the placeholders before go-live.

// WhatsApp number in international format, digits only (Thomas' mobile)
export const WHATSAPP_NUMBER = '41792939407';

// TODO: real Instagram profile
export const INSTAGRAM_URL = 'https://www.instagram.com/';

export const SITE = {
  name: 'Stahlmann Konditionstrainer',
  owner: 'Thomas Stadelmann',
  url: 'https://stahlmann.ch',
  description:
    'Taktisches Athletiktraining, Sporttest-Vorbereitung für Polizei, Armee und Rettungsdienste sowie Personal Coaching in Zürich, Aargau und Zug.',
  address: {
    street: 'Seeblickstrasse 12b',
    zip: '8918',
    locality: 'Unterlunkhofen',
    city: '8918 Unterlunkhofen',
    email: 'stth76@yahoo.de',
    phone: '+41 79 293 94 07',
    phoneHref: 'tel:+41792939407',
  },
};

/** wa.me link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
