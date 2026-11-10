import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { asset } from '../lib/config';
import { faqs, journey, packages, reviews, snapshots, steps } from '../data/content';
import { reveal, scrollToId, setSel } from '../lib/store';

const goForm = () => scrollToId('pakistan-enquiry');

export function PricingPackages() {
  return (
    <section id="pakistan-packages" className="scroll-mt-28 bg-muted/40 px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-[1296px]">
        <p className="eyebrow">Your package, your scope</p>
        <h2 className="h2 mt-3 max-w-3xl">Choose the scope that fits your business.</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-paragraph">Start with the essentials or build a more tailored experience. Each package includes the previous level’s features. Your choice here is an enquiry, not a paid order.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map(p => (
            <article key={p.name} ref={reveal} className="reveal flex flex-col rounded-2xl border border-border bg-white p-6 animation-standard hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0">
              <div className="flex items-start justify-between"><h3 className="text-2xl font-semibold text-heading">{p.name}</h3><span className="text-sm font-semibold text-primary">{p.n}</span></div>
              <p className="mt-2 text-[15px] text-paragraph">{p.blurb}</p>
              <p className="mt-5 text-3xl font-semibold text-heading">{p.price}</p>
              <p className="text-sm text-paragraph">One-time development fee</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-heading"><Clock size={16} className="text-primary" />{p.time}</p>
              <hr className="my-5 border-border" />
              {p.plus && <p className="mb-3 text-sm font-semibold text-heading">{p.plus}</p>}
              <ul className="space-y-2.5">{p.features.map(f => <li key={f} className="flex gap-2.5 text-[15px] text-paragraph"><Check size={18} className="mt-0.5 shrink-0 text-tertiary" />{f}</li>)}</ul>
              <button onClick={() => { setSel({ pkg: `${p.name} · ${p.price}` }); goForm(); }} className="btn btn-primary mt-7 w-full">Enquire about {p.name} <ArrowRight size={16} /></button>
            </article>))}
        </div>
        <p className="mt-8 text-base font-semibold text-heading">70% upfront · 30% after delivery. Payment starts after your project is agreed.</p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-paragraph">Shopify subscriptions, domain registration, paid themes, apps and third-party fees are separate. Delivery starts after we receive your brief and required assets. Custom service workflows are scoped with your project manager.</p>
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  const [en, setEn] = useState(false);
  const initials = r.name.split(" ").map(w => w[0]).join("");
  return (
    <figure className="break-inside-avoid rounded-2xl border border-border bg-white p-6">
      <figcaption className="flex items-center gap-3 border-b border-border pb-4">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a4c] to-[#f06927] text-base font-bold text-primary-foreground">{initials}</span>
        <span><strong className="block text-base font-semibold text-heading">{r.name}</strong><span className="text-xs text-paragraph">{r.service} client</span></span>
      </figcaption>
      <blockquote lang={en ? "en" : "ur-Latn"} className="mt-4 text-base leading-[1.65] text-paragraph">{en ? r.en : r.text}</blockquote>
      <button onClick={() => setEn(!en)} className="mt-3 text-xs font-semibold uppercase tracking-[.08em] text-primary underline underline-offset-4">{en ? "Roman Urdu mein parhein" : "Read in English"}</button>
    </figure>
  );
}

export function Testimonials() {
  const [all, setAll] = useState(false);
  const list = all ? reviews : reviews.slice(0, 3);
  return (
    <section id="shopify-reviews" className="section-padding-standard scroll-mt-6 bg-secondary-background" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow">Client experiences</p>
        <h2 id="reviews-title" className="h2 mt-3 !text-[2.75rem]">What our clients say.</h2>
        <p className="mt-4 text-base text-paragraph">Hamare clients ka tajurba — Zcorebit ke saath kaam karne ke baare mein.</p>
        <div className="mt-10 gap-5 text-left md:columns-2 [&>*]:mb-5">{list.map(r => <ReviewCard key={r.name} r={r} />)}</div>
        <p className="sr-only" aria-live="polite">Showing {list.length} of {reviews.length} reviews</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
          {reviews.length > 3 && <button onClick={() => setAll(!all)} aria-expanded={all} className="btn btn-outline">{all ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}<ChevronDown size={16} className={all ? "rotate-180" : ""} /></button>}
          <a href="https://www.linkedin.com/company/zcorebit" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-heading underline underline-offset-4">Follow Zcorebit on LinkedIn <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

export function VideoFeature() {
  return (
    <section className="section-padding-standard">
      <div className="mx-auto grid max-w-[1296px] items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">More than a good-looking store</p>
          <h2 className="h2 mt-3 max-w-[620px]">Help your customers take the next step.</h2>
          <p className="mt-5 max-w-[620px] text-base leading-7 text-paragraph">Clear product details, useful choices and a straightforward path to checkout. See the sales-focused approach behind your custom Shopify store.</p>
          <a href="#pakistan-enquiry" onClick={e => { e.preventDefault(); goForm(); }} className="btn btn-primary mt-7">Plan my Shopify store <ArrowRight size={17} /></a>
        </div>
        <video controls playsInline preload="none" poster={asset('assets/intro-poster.jpg')} width={1080} height={1350} className="mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl bg-black object-contain" aria-label="Zcorebit sales-focused Shopify store development"><source src={asset('assets/intro.mp4')} type="video/mp4" /></video>
      </div>
    </section>
  );
}

export function PortfolioGallery() {
  const [all, setAll] = useState(false); const [lb, setLb] = useState<number | null>(null);
  const list = all ? snapshots : snapshots.slice(0, 3);
  const close = () => setLb(null);
  useEffect(() => {
    if (lb === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') setLb(i => (i! + 1) % snapshots.length); if (e.key === 'ArrowLeft') setLb(i => (i! - 1 + snapshots.length) % snapshots.length); };
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [lb]);
  return (
    <section id="store-results" aria-labelledby="store-results-title" className="section-padding-standard scroll-mt-6 bg-secondary-background">
      <div className="mx-auto max-w-[1296px]">
        <div className="mb-8 max-w-3xl"><p className="eyebrow">Client feedback</p><h2 id="store-results-title" className="mt-3 text-3xl font-semibold leading-tight text-heading sm:text-5xl">Store snapshots. Customer stories.</h2><p className="mt-4 text-lg text-paragraph">Explore feedback and store snapshots from our portfolio.</p></div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(s => { const i = snapshots.indexOf(s); return (
            <li key={s.name}><button onClick={() => setLb(i)} className="group block w-full overflow-hidden rounded-2xl border border-border bg-white text-left animation-standard hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0" aria-label={`Open ${s.name}: ${s.topic}`}>
              <div className="aspect-[607/856] w-full bg-white"><img src={asset(`assets/${s.img}`)} width={607} height={856} loading="lazy" alt={`${s.name}: ${s.topic}`} className="h-full w-full object-contain" /></div>
            </button></li>); })}
        </ul>
        <p className="mt-6 text-sm text-paragraph">These individual examples are not a forecast or guarantee of your store’s results.</p>
        {snapshots.length > 3 && <button onClick={() => setAll(!all)} aria-expanded={all} className="btn btn-outline mt-5">{all ? 'Show fewer screenshots' : `Show all ${snapshots.length} screenshots`}<ChevronDown size={16} className={all ? 'rotate-180' : ''} /></button>}
      </div>
      {lb !== null && (
        <div role="dialog" aria-modal="true" aria-label={snapshots[lb].name} className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={close}>
          <button onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"><X /></button>
          <button onClick={e => { e.stopPropagation(); setLb((lb - 1 + snapshots.length) % snapshots.length); }} aria-label="Previous" className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white sm:left-6"><ChevronLeft /></button>
          <img onClick={e => e.stopPropagation()} src={asset(`assets/${snapshots[lb].img}`)} alt={`${snapshots[lb].name}: ${snapshots[lb].topic}`} className="max-h-full max-w-full rounded-xl bg-white object-contain" />
          <button onClick={e => { e.stopPropagation(); setLb((lb + 1) % snapshots.length); }} aria-label="Next" className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white sm:right-6"><ChevronRight /></button>
        </div>)}
    </section>
  );
}

export function Features() {
  return (
    <section className="section-padding-standard">
      <div className="mx-auto max-w-[1296px]">
        <p className="eyebrow">Built around the buying journey</p>
        <h2 className="h2 mt-3 max-w-3xl">Make it easier to browse, choose and buy.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map(([t, d]) => <div key={t} ref={reveal} className="reveal rounded-2xl border border-border bg-card p-6 pb-8"><h3 className="text-xl font-semibold leading-snug text-heading">{t}</h3><p className="mt-3 text-[15px] leading-6 text-paragraph">{d}</p></div>)}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section-padding-standard bg-secondary-background">
      <div className="mx-auto max-w-[1296px]">
        <h2 className="h2">Your store starts with a simple conversation.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(([n, t, d]) => <li key={n} ref={reveal} className="reveal rounded-2xl border border-border bg-white p-6 pb-8"><span className="inline-block px-3 text-lg font-semibold text-primary">{n}</span><h3 className="mt-6 px-0.5 text-xl font-semibold text-heading">{t}</h3><p className="mt-3 text-sm leading-6 text-paragraph">{d}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false); const body = useRef<HTMLDivElement>(null);
  return (
    <div className="rounded-xl border border-border bg-white">
      <h3><button onClick={() => setOpen(!open)} aria-expanded={open} className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-heading">{q}<ChevronDown size={18} className={`shrink-0 animation-standard ${open ? 'rotate-180' : ''}`} /></button></h3>
      <div className="grid animation-standard" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}><div ref={body} className="overflow-hidden"><p className="px-5 pb-5 text-[15px] leading-7 text-paragraph">{a}</p></div></div>
    </div>
  );
}
export function FAQ() {
  return (
    <section className="section-padding-standard" aria-labelledby="pakistan-faq-title">
      <div className="mx-auto max-w-4xl"><h2 id="pakistan-faq-title" className="h2">Before we build your store.</h2><div className="mt-8 space-y-3">{faqs.map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}</div></div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-pattern bg-[#050505] py-14">
      <div className="mx-auto max-w-[1296px] px-4 sm:px-6 xl:px-0">
        <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Let’s plan your sales-focused store.</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">Tell us what you have in mind. Your project manager will help with the next step.</p>
        <a href="#pakistan-enquiry" onClick={e => { e.preventDefault(); goForm(); }} className="btn btn-primary mt-7">Get my store plan <ArrowRight size={17} /></a>
        <footer className="mt-14 border-t border-white/15 pt-8 text-white/80">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm"><p>© {new Date().getFullYear()} Zcorebit. All rights reserved.</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2"><a className="hover:text-white" href="https://www.zcorebit.com/contact-us">Privacy policy</a><a className="hover:text-white" href="https://www.zcorebit.com/contact-us">Shopify project terms</a><a className="hover:text-white" href="https://www.zcorebit.com/contact-us">Refund policy</a></nav></div>
          <p className="mt-5 max-w-4xl text-xs leading-5 text-white/60">Zcorebit is an independent company that provides design and development services for e-commerce solutions. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Shopify Inc., or any of its subsidiaries or affiliates. The name "Shopify" as well as related names, marks, emblems, and images are registered trademarks of their respective owners.</p>
        </footer>
      </div>
    </section>
  );
}
