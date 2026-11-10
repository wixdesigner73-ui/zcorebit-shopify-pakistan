export const packages = [
  { n: '01', name: 'Beginner', price: 'PKR 29,900', blurb: 'A focused first store for a small catalogue.', time: '3–7 working days', plus: '', features: ['Up to 10 products or service listings', 'Theme setup in your brand colours', '1 custom logo concept', 'Mobile layout, navigation and standard checkout', 'COD and shipping settings', '1 revision round and launch checks'] },
  { n: '02', name: 'Growth', price: 'PKR 59,900', blurb: 'A stronger brand experience with room to grow.', time: '3–7 working days', plus: 'Everything in Beginner, plus', features: ['Up to 50 products or service listings', 'Customised home, product and collection pages', '2 custom logo concepts', 'Newsletter signup and 1 recovery email', 'Basic SEO and 2 revision rounds'] },
  { n: '03', name: 'Level Up', price: 'PKR 99,900', blurb: 'Help shoppers find, compare and choose.', time: '3–7 working days', plus: 'Everything in Growth, plus', features: ['Up to 75 products or service listings', 'Product filters and recommendations', 'GA4 and ecommerce event setup', '3 custom logo concepts', '3 revision rounds and mobile speed review'] },
  { n: '04', name: 'Pro', price: 'PKR 149,900', blurb: 'More ways to build trust and drive enquiries or sales.', time: '3–7 working days', plus: 'Everything in Level Up, plus', features: ['Up to 100 products or service listings', 'Reviews, blog and 1 campaign landing page', 'Basic customer account setup', '1 supported app integration and bundle setup', '4 logo concepts and 4 revision rounds'] },
  { n: '05', name: 'Executive', price: 'PKR 249,900', blurb: 'A more tailored store with connected workflows.', time: '7 working days', plus: 'Everything in Pro, plus', features: ['Up to 250 products or service listings', 'Bespoke page layouts within your agreed brief', '1 additional market and language setup', '1 supported courier or business-tool integration', '5 logo concepts, 5 revisions and project coordination'] },
  { n: '06', name: 'Top Tier', price: 'PKR 399,900', blurb: 'A custom experience for more demanding businesses.', time: 'Up to 2 working weeks', plus: 'Everything in Executive, plus', features: ['Up to 500 products or service listings', 'Custom storefront sections and interactions', 'Enhanced customer account presentation', 'Product comparison and advanced filtering', '6 logo concepts and revisions within the agreed scope'] },
];
export const packageOptions = ['Help me choose', ...packages.map(p => `${p.name} · ${p.price}`)];

const R = (name: string, date: string, img: string, text: string) => ({ name, date, img, text });
export const reviews = [
  R('Corey.', '2025-12-09', 'review-client-16.png', 'This company is amazing. They new I was haveing trouble with my previous developers , and they jumped in and got a broken down website up and going so I could sell my product, and while I was selling my product I gave them free reign to design me a new website from the ground up . Website is super nice . I can’t wait to see what the future has in store for HelixPep with zevitechs help and guidance . I recommend if you’re needing a website come check out zevitech.'),
  R('Sarah T.', '2025-04-15', 'review-client-01.jpg', 'Just wanted to say thanks to the team for getting my Shopify store live on time. I had a deadline in mind, and they totally nailed it. Loved how they handled product pages and custom features.'),
  R('Ahmed K.', '2025-03-28', 'review-client-02.jpg', 'This was my first time launching a Shopify store, and they made it so smooth. From design to checkout integration, everything looks and feels premium. Super happy!'),
  R('Lina R.', '2025-02-19', 'review-client-03.jpg', 'I had an old Shopify store that wasn’t converting well. These guys revamped the entire layout and now my sales have literally doubled. Worth every penny.'),
  R('Jason M.', '2025-01-09', 'review-client-04.jpg', 'Can’t recommend them enough for Shopify development. They took my messy ideas and turned them into a fully functioning, mobile-friendly store. Very responsive throughout the process.'),
  R('Mehak F.', '2025-05-01', 'review-client-05.jpg', 'My last developer ghosted me halfway through my Shopify build. Found this agency online and they not only picked up the project but improved everything I had done so far. Legends.'),
  R('Daniel S.', '2025-04-02', 'review-client-06.jpg', 'The level of customization they added to my Shopify store is insane. I asked for a very specific layout, and they built it exactly how I envisioned. Excellent work!'),
  R('Hira N.', '2025-03-13', 'review-client-07.jpg', 'Absolutely love how my Shopify store turned out! The branding, the speed, the layout — everything is on point. I’ve already recommended them to 3 other friends.'),
  R('Eric B.', '2025-02-07', 'review-client-08.jpg', 'They set up my entire Shopify dropshipping store from scratch, including product sourcing plugins. Saved me so much time and headache.'),
  R('Zainab A.', '2025-01-21', 'review-client-09.jpg', 'We run a small clothing brand and wanted something simple but bold. They built a Shopify site that matches our aesthetic perfectly. Super fast loading and easy to manage.'),
  R('Richard C.', '2025-05-10', 'review-client-10.jpg', 'Hired them for a Shopify redesign and they delivered beyond expectations. Cleaner UX, better mobile view, and they even gave some marketing tips. Great experience.'),
  R('Tanya D.', '2025-04-20', 'review-client-11.jpg', 'Professional, quick, and super helpful. They handled the whole Shopify setup including payment gateways, shipping zones, and email automation. Will be working with them again soon.'),
  R('Usman G.', '2025-03-01', 'review-client-12.jpg', 'I had no idea where to start with my Shopify store. These guys walked me through everything and delivered a ready-to-sell site. Honestly felt like a partner, not just a service provider.'),
  R('Emily R.', '2025-02-10', 'review-client-13.jpg', 'Was skeptical at first, but damn, the Shopify site they built for me looks better than I imagined. They even helped me write the product descriptions. Total pros.'),
  R('Moiz J.', '2025-01-30', 'review-client-14.jpg', 'One of the best experiences I’ve had working with any agency. They made my Shopify pet store go live within 10 days and handled every technical thing with ease.'),
  R('Sofia L.', '2025-05-05', 'review-client-15.jpg', 'They didn’t just build a Shopify store — they built a brand presence. The logo, the layout, the storytelling across the site — all felt aligned. Super grateful.'),
];

export const snapshots = [
  { name: 'Jonathan Henry', topic: 'Store design and development', img: 'result-img-02.png' },
  { name: 'Richard Buyers', topic: 'Product recommendations and offers', img: 'result-img-03.png' },
  { name: 'Johnson Smith', topic: 'Search visibility', img: 'result-img-04.png' },
  { name: 'Alice Baker', topic: 'Customer accounts and order tracking', img: 'result-img-05.png' },
  { name: 'Rachel Lisa', topic: 'Store design and usability', img: 'result-img-06.png' },
];

export const faqs = [
  ['What happens after I submit the form?', 'We save your enquiry, then open WhatsApp so you can talk to your project manager. Tap Send in WhatsApp to start the conversation. Your details stay saved for follow-up even if you don’t send the message. Submitting the form does not place a paid order.'],
  ['Are these fixed package prices?', 'Yes. These are fixed PKR development packages for the listed scope. Shopify subscriptions, domain registration, paid themes, apps and third-party charges are separate. Any additional custom work is quoted before it starts.'],
  ['Can I sell with cash on delivery?', 'Yes. We can set up cash on delivery and your shipping rules. Courier apps or online payment providers depend on your account, their availability and your package scope. Their charges are separate.'],
  ['Will my store look exactly like a design preview?', 'The previews are references to help us understand your preferred direction. We customise your store around your branding, content and the features included in your agreed package.'],
  ['Can you build for a service business?', 'Yes. We can present your services, service areas and enquiry journey. Booking tools, subscriptions and specialist integrations are scoped with your project manager before work begins.'],
  ['When do I pay, and how long will it take?', 'After we agree your project, 10% upfront starts the work and the remaining 90% is due after delivery. There is no payment on this enquiry form. Estimated delivery starts after we receive your brief, access and required assets; custom scope and feedback can affect timing.'],
];

export const journey = [
  ['Mobile comes first', 'Readable product pages and touch-friendly buttons for customers arriving from your ads.'],
  ['Your products, clearly presented', 'Useful descriptions, product options and collections that help shoppers choose.'],
  ['Local buying needs', 'Cash on delivery, shipping rules and clear delivery information for your customers.'],
  ['A clear next step', 'Straightforward calls to action and a shopping journey built around your business.'],
];

export const steps = [
  ['01', 'Tell us about your business', 'Share your contact details, what you sell and the package you’re considering. Not sure yet? We’ll help you choose.'],
  ['02', 'Agree your store plan', 'Your project manager confirms the design direction, features, delivery timeline and fixed project scope.'],
  ['03', 'Build, review and launch', 'After agreement, start with 10% upfront. Review your custom store with us, with the balance due after delivery.'],
];

export const heroPoints = [
  ['Made for your brand', 'Your identity, colours and style.'],
  ['Clear product pages', 'Help shoppers understand what you sell.'],
  ['Built for mobile', 'Easy browsing on every screen.'],
  ['Simple path to checkout', 'Make the next step easy to find.'],
];
