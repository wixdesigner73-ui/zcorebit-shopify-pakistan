import { Instagram, Linkedin, ArrowRight, Palette, ShoppingBag, Smartphone, MousePointerClick } from 'lucide-react';
import { heroPoints } from '../data/content';
import { scrollToId } from '../lib/store';
import LeadForm from './LeadForm';

const icons = [Palette, ShoppingBag, Smartphone, MousePointerClick];

export default function Hero() {
  return (
    <section className="bg-pattern bg-[#050505] pb-12 pt-28 md:pb-16 md:pt-32">
      <div className="mx-auto grid max-w-[1296px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,660px)_minmax(0,597px)] lg:justify-between xl:px-0">
        <div className="text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-tertiary">Custom Shopify development</p>
          <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1] tracking-tight sm:text-5xl">
            Get a Custom <span className="whitespace-nowrap text-tertiary">High-Converting</span> Shopify <span className="whitespace-nowrap">E-Commerce</span> Store
          </h1>
          <p className="mt-6 max-w-[660px] text-lg leading-7 text-white/90">Custom Shopify development with sales-focused product pages and an easy shopping experience. Your brand, your products, built around your customers.</p>
          <a href="#pakistan-designs" onClick={e => { e.preventDefault(); scrollToId('pakistan-designs'); }} className="btn btn-primary mt-7">Explore design references <ArrowRight size={17} /></a>
          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white">
            <span>Packages from <strong>PKR 29,900</strong></span>
            <a href="#pakistan-packages" onClick={e => { e.preventDefault(); scrollToId('pakistan-packages'); }} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">Compare packages <ArrowRight size={16} /></a>
          </p>
          <div className="mt-8 border-t border-white/15 pt-6">
            <h2 className="text-lg font-semibold">Built around your customers.</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {heroPoints.map(([t, d], i) => { const I = icons[i]; return (
                <li key={t} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-tertiary"><I size={18} /></span>
                  <span><strong className="block text-base font-semibold">{t}</strong><span className="text-sm text-white/70">{d}</span></span>
                </li>); })}
            </ul>
          </div>
          <div className="mt-8 flex items-center gap-6 border-t border-white/15 pt-6">
            <a href="https://www.instagram.com/zcorebit/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"><Instagram size={22} />Instagram</a>
            <a href="https://www.linkedin.com/company/zcorebit" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"><Linkedin size={22} />LinkedIn</a>
          </div>
        </div>
        <div id="pakistan-enquiry" className="relative scroll-mt-28 self-start"><LeadForm /></div>
      </div>
    </section>
  );
}
