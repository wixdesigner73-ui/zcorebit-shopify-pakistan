// Live Pakistani stores shown as previews. Screenshots live in public/live/<id>-desktop.jpg and <id>-mobile.jpg.
export type LiveSite = { id: string; name: string; url: string; domain: string; kind: string; desc: string };

export const LIVE_CATEGORY_ID = 'live-stores';
export const LIVE_CATEGORY_NAME = 'Live client stores';

export const liveSites: LiveSite[] = [
  { id: 'probfix', name: 'ProbFix', url: 'https://probfix.pk/', domain: 'probfix.pk', kind: 'Cleaning products store', desc: 'Premium household cleaning sprays for limescale, sofas, kitchens, walls and wood, with a product range built around results.' },
  { id: 'purify', name: 'The Purify Shop', url: 'https://thepurifyshop.pk/', domain: 'thepurifyshop.pk', kind: 'Healthy food store', desc: 'Clean teas, rich qahwas, nourishing oats and quinoa, with fresh, authentic products and ready-made bundles.' },
  { id: 'handyshop', name: 'Handy Shop', url: 'https://handyshop.pk/', domain: 'handyshop.pk', kind: 'Spices & breakfast store', desc: 'Pure dehydrated spices, herbal blends and healthy breakfasts, with sale banners, best sellers and category shopping.' },
  { id: 'baazyaft', name: 'Baazyaft', url: 'https://baazyaftshop.com/', domain: 'baazyaftshop.com', kind: 'Handmade fashion store', desc: 'Handmade bags, wallets and notebooks by Pakistani artisans, telling the story behind every piece.' },
  { id: 'grannis', name: "Granni's Kitchen", url: 'https://www.granniskitchen.com/', domain: 'granniskitchen.com', kind: 'Natural food store', desc: 'Lab-tested, chemical-free spices and healthy breakfasts with bundle offers, new arrivals and best sellers.' },
  { id: 'malakangan', name: 'Mala Kangan', url: 'https://malakangan.com/', domain: 'malakangan.com', kind: 'Jewellery store', desc: 'Handcrafted Pakistani jewellery: parandas, bangles, jhumkies and bridal sets, with shop-by-category browsing.' },
];
