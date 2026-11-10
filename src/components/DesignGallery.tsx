import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import data from '../data/catalog.json';
import { asset } from '../lib/config';
import { scrollToId, setSel } from '../lib/store';
import { Storefront, type CatalogCat, type Kind } from '../previews/Storefront';
import type { Design } from '../previews/kit';
import PreviewModal from './PreviewModal';

const catalog = data as unknown as { product: CatalogCat[]; service: CatalogCat[] };
// Original-site thumbnails exist for these Clothing & fashion designs; every other card renders a live scaled storefront.
const THUMBS: [string, string][] = [['Bundle Builder', 'atelier-bundle-signature-thumb'], ['Configurator', 'atelier-configurator-signature-thumb'], ['Concierge', 'atelier-concierge-signature-thumb'], ['Campaign', 'atelier-campaign-thumb'], ['Dimensional', 'atelier-dimensional-thumb'], ['Parallax', 'atelier-parallax-thumb'], ['Cinematic', 'atelier-cinematic-thumb'], ['Commerce Studio', 'atelier-commerce-studio-thumb']];
const thumbFor = (cat: CatalogCat, d: Design) => cat.id === 'clothing-and-fashion' ? THUMBS.find(([k]) => d.title.includes(k))?.[1] : undefined;
const labelOf = (cat: CatalogCat, kind: Kind) => (cat.name.startsWith('Other / custom') ? (kind === 'product' ? 'General store' : 'Other services') : cat.name);

function LiveThumb({ kind, cat, design, seed }: { kind: Kind; cat: CatalogCat; design: Design; seed: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.22);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1200)); ro.observe(el); setScale(el.clientWidth / 1200);
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '300px' }); io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  return (
    <div ref={box} className="relative h-full w-full overflow-hidden bg-white" aria-hidden="true">
      {on && <div style={{ width: 1200, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none' }} {...({ inert: '' } as object)}><Storefront kind={kind} cat={cat} design={design} seed={seed} /></div>}
    </div>
  );
}

function DesignCard({ kind, cat, design, seed, onPreview }: { kind: Kind; cat: CatalogCat; design: Design; seed: number; onPreview: () => void }) {
  const th = thumbFor(cat, design); const id = `dc-${cat.id}-${design.title.replace(/\W+/g, '-')}`;
  return (
    <article aria-labelledby={id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card animation-standard hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0">
      <div className="bg-[#ececec] p-[18px] pb-0">
        <div className="overflow-hidden rounded-t-xl bg-white">
          <div className="flex items-center justify-between gap-2 px-4 py-3 text-[11px] font-bold uppercase tracking-[.1em] text-heading"><span className="truncate">{design.title}</span><span className="text-sm tracking-normal">•••</span></div>
          <div className="relative h-[290px] border-t border-border sm:h-[300px]">
            {th ? <img loading="lazy" src={asset(`assets/${th}.webp`)} alt="" className="h-full w-full object-cover object-top" /> : <LiveThumb kind={kind} cat={cat} design={design} seed={seed} />}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-white p-[22px]">
        <p className="text-sm font-semibold text-primary">{design.kind}</p>
        <h3 id={id} className="mt-1 text-2xl font-normal text-heading">{design.title}</h3>
        <p className="mt-3 text-[15px] leading-[1.55] text-paragraph">{design.desc}</p>
        <p className="mb-5 mt-4 text-[15px] font-medium text-primary">Available with every package</p>
        <button onClick={onPreview} className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground animation-standard hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Preview design <ArrowUpRight size={17} /></button>
      </div>
    </article>
  );
}

export default function DesignGallery() {
  const [kind, setKind] = useState<Kind>('product');
  const [catId, setCatId] = useState(catalog.product[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const cats = catalog[kind];
  const cat = cats.find(c => c.id === catId) ?? cats[0];
  const seed = cats.indexOf(cat);
  const choose = (k: Kind) => { setKind(k); setCatId(catalog[k][0].id); setSel({ offer: k === 'product' ? 'Products' : 'Services' }); };
  const design = open !== null ? cat.designs[open] : null;
  const closeRef = useMemo(() => () => setOpen(null), []);

  return (
    <section id="pakistan-designs" className="scroll-mt-28 px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <p className="eyebrow">Start with your design</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[780px]"><h2 className="h2">Find a look you love.</h2><p className="mt-4 text-base leading-[26px] text-paragraph">Choose a reference, then explore the package that fits your needs. Your final store is tailored to your brand and agreed scope.</p></div>
          <a href="#pakistan-packages" onClick={e => { e.preventDefault(); scrollToId('pakistan-packages'); }} className="inline-flex items-center gap-2 pb-2 text-sm font-semibold text-primary underline underline-offset-4">Compare packages <ArrowRight size={16} /></a>
        </div>

        <fieldset className="mt-8">
          <legend className="mb-3 text-base font-medium text-heading">What does your business offer?</legend>
          <div className="grid gap-3 md:grid-cols-2">
            {([['product', 'Product business', 'Sell physical or digital products.'], ['service', 'Service business', 'Salons, spas, home services, consultants and more.']] as const).map(([k, t, d]) => (
              <label key={k} className={`flex cursor-pointer flex-col gap-1.5 rounded-xl border-2 bg-white px-5 py-4 animation-standard ${kind === k ? 'border-primary bg-[#fff3ea]' : 'border-border hover:border-primary/50'}`}>
                <span className="flex items-center gap-3 text-base font-semibold text-heading"><input type="radio" name="offer" className="h-[18px] w-[18px] accent-[#f06927]" checked={kind === k} onChange={() => choose(k)} />{t}</span>
                <span className="pl-[30px] text-[15px] text-paragraph">{d}</span>
              </label>))}
          </div>
        </fieldset>

        <div className="mt-6 max-w-[632px]">
          <label htmlFor="biz-cat" className="mb-2 block text-base font-medium text-heading">Business category</label>
          <div className="relative"><select id="biz-cat" value={cat.id} onChange={e => setCatId(e.target.value)} className="field min-h-[50px] appearance-none pr-12 text-base">{cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-[#ffe6d6] text-primary"><ChevronDown size={16} /></span></div>
          <p className="mt-2 text-sm text-paragraph">Choose the closest match to see relevant design references.</p>
        </div>

        <h3 className="mt-10 text-[1.9rem] font-normal leading-tight text-heading">Choose a design as your reference</h3>
        <p className="mt-3 max-w-[1280px] text-base leading-7 text-paragraph">Pick the design closest to what you have in mind. This helps us understand your preferred style. It’s a starting reference, not your final store—we’ll tailor the design and functionality to your brand and selected package.</p>
        <p className="mt-4 text-base font-semibold text-primary" aria-live="polite">{labelOf(cat, kind)} · {cat.designs.length} designs · All packages</p>
        <p className="mt-5 text-sm text-paragraph">We build your store with your own brand, products and photos.</p>
        <p className="mt-1 text-sm text-paragraph">Your package determines the included features, setup limits and customization.</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cat.designs.map((d, i) => <DesignCard key={`${cat.id}-${d.title}`} kind={kind} cat={cat} design={d} seed={seed} onPreview={() => setOpen(i)} />)}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary-background p-6">
          <p className="text-base text-heading"><strong className="font-semibold">Compare development packages</strong> <span className="text-paragraph">Found a design you like? Choose the features and support you need.</span></p>
          <a href="#pakistan-packages" onClick={e => { e.preventDefault(); scrollToId('pakistan-packages'); }} className="btn btn-primary">Compare packages <ArrowRight size={16} /></a>
        </div>
      </div>
      {design && <PreviewModal kind={kind} cat={cat} design={design} seed={seed} onClose={closeRef}
        onUse={() => { setSel({ design: `${design.title} (${cat.name})`, offer: kind === 'product' ? 'Products' : 'Services' }); setOpen(null); setTimeout(() => scrollToId('pakistan-enquiry'), 50); }} />}
    </section>
  );
}
