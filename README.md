# Zcorebit – Shopify Development Pakistan landing page

React + Vite + TypeScript + Tailwind recreation of the reference landing page.

## Run

```bash
npm install
cp .env.example .env     # fill in the values below
npm run dev              # http://localhost:5173
npm run build            # type-check + production build into dist/
```

## Configuration (public values only)

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Where enquiries are saved |
| `VITE_WHATSAPP_NUMBER` | Digits only, international format (e.g. `923001234567`) |

1. Create a Supabase project and run [supabase/schema.sql](supabase/schema.sql). Row Level Security lets the anonymous key **insert only**; it cannot read enquiries. Read them in the Supabase dashboard.
2. Without Supabase configured, the form shows an honest "not saved" error and never claims success.
3. Never put a `service_role` key in this project.

## Deploy (GitHub Pages)

1. Push to `main`. Repo **Settings → Pages → Source: GitHub Actions**.
2. Add the three variables under **Settings → Secrets and variables → Actions → Variables**.
3. [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds with `VITE_BASE=/<repo>/` automatically.

## Structure

- `src/components/` – Header, Hero, LeadForm, LogoStrip, DesignGallery, PreviewModal, Sections (pricing, reviews, video, snapshots, features, process, FAQ, CTA/footer)
- `src/previews/` – the sample storefronts shown by "Preview design": a shared shop kit (bag, currency, wishlist, shop/product/bag/journal/account pages), 14 product home layouts and 10 service layouts
- `src/data/catalog.json` – all 22 product + 21 service categories with every design card (names, descriptions, per-category products, prices, imagery)
- `src/data/content.ts` – packages, reviews, snapshots, FAQ, process copy

## Notes

- The service-store FAQ questions (not just answers) are written by us; the reference only exposed the answers.
- Preview storefronts are generated from per-category data with shared layouts, so they match the reference's structure and behaviour but not each hand-built original pixel for pixel.
