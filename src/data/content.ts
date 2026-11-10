export const packages = [
  { n: '01', name: 'Beginner', price: 'PKR 29,900', blurb: 'A focused first store for a small catalogue.', time: '3–7 working days', plus: '', features: ['Up to 10 products or service listings', 'Theme setup in your brand colours', '1 custom logo concept', 'Mobile layout, navigation and standard checkout', 'COD and shipping settings', '1 revision round and launch checks'] },
  { n: '02', name: 'Growth', price: 'PKR 59,900', blurb: 'A stronger brand experience with room to grow.', time: '3–7 working days', plus: 'Everything in Beginner, plus', features: ['Up to 50 products or service listings', 'Customised home, product and collection pages', '2 custom logo concepts', 'Newsletter signup and 1 recovery email', 'Basic SEO and 2 revision rounds'] },
  { n: '03', name: 'Level Up', price: 'PKR 99,900', blurb: 'Help shoppers find, compare and choose.', time: '3–7 working days', plus: 'Everything in Growth, plus', features: ['Up to 75 products or service listings', 'Product filters and recommendations', 'GA4 and ecommerce event setup', '3 custom logo concepts', '3 revision rounds and mobile speed review'] },
  { n: '04', name: 'Pro', price: 'PKR 149,900', blurb: 'More ways to build trust and drive enquiries or sales.', time: '3–7 working days', plus: 'Everything in Level Up, plus', features: ['Up to 100 products or service listings', 'Reviews, blog and 1 campaign landing page', 'Basic customer account setup', '1 supported app integration and bundle setup', '4 logo concepts and 4 revision rounds'] },
  { n: '05', name: 'Executive', price: 'PKR 249,900', blurb: 'A more tailored store with connected workflows.', time: '7 working days', plus: 'Everything in Pro, plus', features: ['Up to 250 products or service listings', 'Bespoke page layouts within your agreed brief', '1 additional market and language setup', '1 supported courier or business-tool integration', '5 logo concepts, 5 revisions and project coordination'] },
  { n: '06', name: 'Top Tier', price: 'PKR 399,900', blurb: 'A custom experience for more demanding businesses.', time: 'Up to 2 working weeks', plus: 'Everything in Executive, plus', features: ['Up to 500 products or service listings', 'Custom storefront sections and interactions', 'Enhanced customer account presentation', 'Product comparison and advanced filtering', '6 logo concepts and revisions within the agreed scope'] },
];
export const packageOptions = ['Help me choose', ...packages.map(p => `${p.name} · ${p.price}`)];

export type Review = { name: string; service: string; text: string; en: string };
// Real client testimonials published on zcorebit.com/#testimonials, with a Roman Urdu translation of each.
export const reviews: Review[] = [
  { name: 'Ayesha Khan', service: 'SEO',
    text: 'Zcorebit ke saath kaam karne se pehle hamari website Google par mushkil se nazar aati thi. Kuch mahine ke SEO kaam ke baad ab hamari ranking kaafi behtar hai aur visitors bhi barh gaye hain. Unhon ne waqt nikaal kar hamara business samjha aur aisi smart strategies istemal kin jin se waqai farq para.',
    en: 'Before working with Zcorebit, our website barely showed up on Google. After a few months of their SEO work, we’re now ranking much higher and getting more visitors. They really took the time to understand our business and used smart strategies that actually made a difference.' },
  { name: 'Ali Raza', service: 'Google Ads',
    text: 'Google Ads se hamein achay nataij nahi mil rahe thay, phir hum ne Zcorebit ke saath kaam shuru kiya. Unki team ne hamari campaigns optimize kin aur budget barhaye baghair conversions barh gayin. Apne ad spend ka asal return dekh kar aakhirkar bohat acha lag raha hai!',
    en: 'We had been struggling to get good results from Google Ads until we partnered with Zcorebit. Their team optimized our campaigns and helped us get more conversions without increasing the budget. It feels great to finally see real returns on our ad spend!' },
  { name: 'Khurram Abbas', service: 'Google My Business',
    text: 'Zcorebit ne hamari Google My Business listing theek aur optimize ki, aur ab zyada local customers hamein asani se dhoond lete hain. Calls aur visits yaqeenan barh gayi hain, aur unki support poore safar mein bohat madadgar rahi.',
    en: 'Zcorebit helped us fix and optimize our Google My Business listing, and now more local customers are finding us easily. The calls and visits have definitely increased, and their support has been really helpful along the way.' },
];

export const faqs = [
  ['What happens after I submit the form?', 'We save your enquiry, then open WhatsApp so you can talk to your project manager. Tap Send in WhatsApp to start the conversation. Your details stay saved for follow-up even if you don’t send the message. Submitting the form does not place a paid order.'],
  ['Are these fixed package prices?', 'Yes. These are fixed PKR development packages for the listed scope. Shopify subscriptions, domain registration, paid themes, apps and third-party charges are separate. Any additional custom work is quoted before it starts.'],
  ['Can I sell with cash on delivery?', 'Yes. We can set up cash on delivery and your shipping rules. Courier apps or online payment providers depend on your account, their availability and your package scope. Their charges are separate.'],
  ['Will my store look exactly like a design preview?', 'The previews are references to help us understand your preferred direction. We customise your store around your branding, content and the features included in your agreed package.'],
  ['Can you build for a service business?', 'Yes. We can present your services, service areas and enquiry journey. Booking tools, subscriptions and specialist integrations are scoped with your project manager before work begins.'],
  ['When do I pay, and how long will it take?', 'After we agree your project, 70% upfront starts the work and the remaining 30% is due after delivery. There is no payment on this enquiry form. Estimated delivery starts after we receive your brief, access and required assets; custom scope and feedback can affect timing.'],
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
  ['03', 'Build, review and launch', 'After agreement, start with 70% upfront. Review your custom store with us, with the remaining 30% due after delivery.'],
];

export const heroPoints = [
  ['Made for your brand', 'Your identity, colours and style.'],
  ['Clear product pages', 'Help shoppers understand what you sell.'],
  ['Built for mobile', 'Easy browsing on every screen.'],
  ['Simple path to checkout', 'Make the next step easy to find.'],
];
