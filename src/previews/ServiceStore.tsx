import { createPortal } from "react-dom";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { img, makeTheme, themeVars, type Theme } from './kit';

export type SStore = { brand: string; nav: string[]; groups: string[]; cat: string; title: string; sub: string; services: { group: string; name: string; desc: string }[]; steps: { title: string; desc: string }[]; answers: string[]; footerTitle: string; footerNote: string; images: string[] };
export type SVariant = 'signature' | 'discovery' | 'editorial' | 'spotlight' | 'boutique' | 'campaign' | 'dimensional' | 'parallax' | 'cinematic' | 'studio';
export function serviceVariant(title: string): SVariant {
  const t = title.toLowerCase();
  const m: [string, SVariant][] = [['signature editorial', 'signature'], ['signature discovery', 'discovery'], ['editorial', 'editorial'], ['spotlight', 'spotlight'], ['boutique', 'boutique'], ['campaign', 'campaign'], ['dimensional', 'dimensional'], ['parallax', 'parallax'], ['cinematic', 'cinematic'], ['studio', 'studio']];
  return m.find(([k]) => t.includes(k))?.[1] ?? 'signature';
}
export const isDarkService = (v: SVariant) => v === 'cinematic';
export const serviceTheme = (seed: number, v: SVariant): Theme => makeTheme(seed, isDarkService(v));

const FAQ_Q = ['Can I ask about a service before deciding?', 'How is pricing decided?', 'What happens after I send a request?', 'Does a request reserve a time?'];
type Ctx = { s: SStore; im: (i: number, w?: number) => string; enquire: (svc?: string) => void; scrollEl: React.RefObject<HTMLDivElement> | null };
const C = createContext<Ctx>(null as unknown as Ctx);
const useS = () => useContext(C);
const Btn = ({ children, onClick, ghost, className = '' }: { children: ReactNode; onClick?: () => void; ghost?: boolean; className?: string }) => (
  <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${ghost ? 'border border-current' : 'bg-[var(--ac)] text-[var(--acfg)] hover:opacity-90'} ${className}`}>{children}</button>
);
const Sec = ({ id, children, soft, className = '' }: { id?: string; children: ReactNode; soft?: boolean; className?: string }) => <section id={id} className={`px-5 py-12 @sm:px-10 @sm:py-16 ${soft ? 'bg-[var(--soft)]' : ''} ${className}`}>{children}</section>;
const Kick = ({ children }: { children: ReactNode }) => <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">{children}</p>;
const Hd = ({ children, sub }: { children: ReactNode; sub?: string }) => <div className="mb-8 max-w-2xl"><h2 className="text-3xl leading-tight @sm:text-4xl">{children}</h2>{sub && <p className="mt-3 opacity-75">{sub}</p>}</div>;

export function ServiceShop({ s, theme, variant, scrollEl }: { s: SStore; theme: Theme; variant: SVariant; scrollEl?: React.RefObject<HTMLDivElement> }) {
  const [form, setForm] = useState<{ svc: string } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const ctx: Ctx = { s, im: (i, w = 900) => img(s.images[i % s.images.length], w), enquire: svc => setForm({ svc: svc ?? '' }), scrollEl: scrollEl ?? null };
  const jump = (k: number) => { const ids = ['svc-services', 'svc-process', 'svc-faq']; root.current?.querySelector('#' + ids[k])?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const Home = { signature: Signature, discovery: Discovery, editorial: Editorial, spotlight: Spotlight, boutique: Boutique, campaign: Campaign, dimensional: Dimensional, parallax: Parallax, cinematic: Cinematic, studio: Studio }[variant];
  return (
    <C.Provider value={ctx}>
      <div ref={root} style={{ ...themeVars(theme), background: 'var(--bg)', color: 'var(--fg)' }} className="@container relative min-h-full text-left font-sans">
        <div className="bg-[var(--ac)] py-2 text-center text-[11px] font-bold uppercase tracking-[.18em] text-[var(--acfg)]">Illustrative service example</div>
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-[var(--line)] bg-[var(--bg)] px-5 py-4 @sm:px-10">
          <p className="text-2xl tracking-tight">{s.brand}</p>
          <nav className="ml-auto hidden gap-6 text-sm @sm:flex" aria-label="Service store">{s.nav.map((n, k) => <button key={n} onClick={() => jump(k)} className="opacity-80 hover:opacity-100">{n}</button>)}</nav>
          <Btn className="ml-auto @sm:ml-0" onClick={() => ctx.enquire()}>Enquire</Btn>
        </header>
        <Home />
        <Sec soft><div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl">{s.footerTitle}</h2><p className="mt-2 text-sm opacity-70">{s.footerNote}</p><Btn className="mt-5" onClick={() => ctx.enquire()}>Start a conversation</Btn></div></Sec>
        {form && createPortal(<div style={{ ...themeVars(theme), color: "var(--fg)" }}><Enquiry svc={form.svc} onClose={() => setForm(null)} /></div>, document.body)}
      </div>
    </C.Provider>
  );
}

function Enquiry({ svc, onClose }: { svc: string; onClose: () => void }) {
  const { s } = useS(); const [sent, setSent] = useState(false); const [sv, setSv] = useState(svc || s.services[0].name);
  return (
    <div role="dialog" aria-modal="true" aria-label="Enquiry" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="max-h-full w-full max-w-md overflow-auto rounded-lg bg-[var(--bg)] p-6 text-[var(--fg)] shadow-2xl">
        {sent ? <div className="text-center"><Check className="mx-auto text-[var(--ac)]" /><h3 className="mt-2 text-2xl">Request noted.</h3><p className="mt-2 text-sm opacity-75">This is a sample enquiry. A real site sends this to {s.brand} and confirms scope, pricing and availability separately.</p><Btn className="mt-5" onClick={onClose}>Close</Btn></div> : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid gap-3"><h3 className="text-2xl">Tell us what you need</h3>
            <select aria-label="Service" value={sv} onChange={e => setSv(e.target.value)} className="h-12 rounded-md border border-[var(--line)] bg-[var(--bg)] px-3">{s.services.map(x => <option key={x.name}>{x.name}</option>)}</select>
            <input required placeholder="Your name" aria-label="Your name" className="h-12 rounded-md border border-[var(--line)] bg-transparent px-4" />
            <input required type="email" placeholder="Email address" aria-label="Email" className="h-12 rounded-md border border-[var(--line)] bg-transparent px-4" />
            <textarea required rows={3} placeholder="Share your priorities and preferred timing" aria-label="Details" className="rounded-md border border-[var(--line)] bg-transparent p-3" />
            <div className="flex gap-2"><Btn className="flex-1">Send request</Btn><Btn ghost onClick={onClose}>Cancel</Btn></div></form>)}
      </div>
    </div>
  );
}

function ServiceCard({ i, big }: { i: number; big?: boolean }) {
  const { s, im, enquire } = useS(); const v = s.services[i];
  return (
    <article className="group overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg)]">
      <img loading="lazy" src={im(i + 1, 800)} alt="" className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${big ? 'aspect-[4/3]' : 'aspect-[16/10]'}`} />
      <div className="p-5"><Kick>{v.group}</Kick><h3 className="mt-1 text-xl">{v.name}</h3><p className="mt-2 text-sm opacity-75">{v.desc}</p><button onClick={() => enquire(v.name)} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--ac)]">Enquire <ArrowRight size={14} /></button></div>
    </article>
  );
}
const Services = ({ title = 'A starting point for what you need.' }: { title?: string }) => { const { s } = useS(); return <Sec id="svc-services"><Hd sub="Explore each service to see the scope and start a conversation.">{title}</Hd><div className="grid gap-5 @md:grid-cols-3">{s.services.map((_, i) => <ServiceCard key={i} i={i} />)}</div></Sec>; };
const Process = () => { const { s } = useS(); return <Sec id="svc-process" soft><Hd>From first conversation to a plan.</Hd><ol className="grid gap-5 @md:grid-cols-3">{s.steps.map((t, i) => <li key={i} className="rounded-md bg-[var(--bg)] p-6"><span className="text-sm font-semibold text-[var(--ac)]">0{i + 1}</span><h3 className="mt-3 text-xl">{t.title}</h3><p className="mt-2 text-sm opacity-75">{t.desc}</p></li>)}</ol></Sec>; };
function Faq() {
  const { s } = useS(); const [open, setOpen] = useState<number | null>(0);
  return <Sec id="svc-faq"><Hd>Useful answers</Hd><div className="mx-auto max-w-3xl divide-y divide-[var(--line)] border-y border-[var(--line)]">{s.answers.map((a, i) => <div key={i}><button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between py-4 text-left font-medium">{FAQ_Q[i] ?? `Question ${i + 1}`}<ChevronDown size={18} className={`transition ${open === i ? 'rotate-180' : ''}`} /></button>{open === i && <p className="pb-4 text-sm opacity-75">{a}</p>}</div>)}</div></Sec>;
}
function Hero({ dark, split }: { dark?: boolean; split?: boolean }) {
  const { s, im, enquire } = useS();
  if (split) return <Sec><div className="grid items-center gap-8 @md:grid-cols-2"><div><Kick>{s.cat}</Kick><h1 className="mt-3 text-5xl leading-none @sm:text-6xl">{s.title}</h1><p className="mt-4 opacity-75">{s.sub}</p><Btn className="mt-6" onClick={() => enquire()}>Tell us what you need</Btn></div><img src={im(0, 1100)} alt="" className="aspect-[4/3] w-full rounded-md object-cover" /></div></Sec>;
  return (
    <div className="relative flex min-h-[520px] items-end overflow-hidden"><img src={im(0, 1600)} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className={`absolute inset-0 ${dark ? 'bg-black/60' : 'bg-gradient-to-r from-black/60 via-black/25 to-transparent'}`} />
      <div className="relative max-w-2xl px-6 pb-14 text-white @sm:px-14"><p className="text-sm">{s.cat}</p><h1 className="mt-2 text-5xl leading-[.95] @sm:text-7xl">{s.title}</h1><p className="mt-4 max-w-md text-lg text-white/90">{s.sub}</p><Btn className="mt-6" onClick={() => enquire()}>Explore your options</Btn></div></div>
  );
}
const Benefits = () => <Sec soft><div className="grid gap-5 @sm:grid-cols-4">{[['Clear details', 'Understand the scope of each service'], ['Personal support', 'Helpful answers, when you need them'], ['Your next step', 'Tell us what you need'], ['Easy enquiries', 'Start a conversation']].map(([a, b]) => <div key={a}><Check size={18} className="mb-2 text-[var(--ac)]" /><p className="font-semibold">{a}</p><p className="text-sm opacity-70">{b}</p></div>)}</div></Sec>;

const Signature = () => <><Hero /><Benefits /><Services /><Process /><Faq /></>;
function Discovery() {
  const { s } = useS(); const [g, setG] = useState(s.groups[0]);
  const list = s.services.map((v, i) => ({ v, i })).filter(x => x.v.group === g || !s.groups.includes(g));
  return <><Hero /><Sec id="svc-services"><Hd sub="Choose your starting point.">Find the right support</Hd><div className="mb-6 flex flex-wrap gap-2">{s.groups.map(x => <button key={x} onClick={() => setG(x)} aria-pressed={g === x} className={`rounded-full border px-5 py-2 text-sm ${g === x ? 'border-[var(--ac)] bg-[var(--ac)] text-[var(--acfg)]' : 'border-[var(--line)]'}`}>{x}</button>)}</div><div className="grid gap-5 @md:grid-cols-3">{(list.length ? list : s.services.map((v, i) => ({ v, i }))).map(x => <ServiceCard key={x.i} i={x.i} />)}</div></Sec><Process /><Faq /></>;
}
const Editorial = () => { const { s } = useS(); return <><Sec className="text-center"><Kick>{s.cat}</Kick><h1 className="mx-auto mt-3 max-w-3xl text-5xl leading-none @sm:text-6xl">{s.title}</h1><p className="mx-auto mt-4 max-w-xl opacity-75">{s.sub}</p></Sec><Services /><Faq /></>; };
function Spotlight() {
  const { s, im, enquire } = useS(); const [k, setK] = useState(0); const v = s.services[k];
  return <><Hero /><Sec id="svc-services"><Hd>In focus</Hd><div className="grid items-center gap-8 @md:grid-cols-2"><img src={im(k + 1, 1000)} alt="" className="aspect-[4/3] w-full rounded-md object-cover" /><div><Kick>{v.group}</Kick><h3 className="mt-2 text-4xl">{v.name}</h3><p className="mt-3 opacity-75">{v.desc}</p><Btn className="mt-5" onClick={() => enquire(v.name)}>Enquire about this</Btn></div></div><div className="mt-8 grid gap-3 @sm:grid-cols-3">{s.services.map((x, i) => <button key={i} onClick={() => setK(i)} aria-pressed={k === i} className={`rounded-md border p-4 text-left ${k === i ? 'border-[var(--ac)] ring-1 ring-[var(--ac)]' : 'border-[var(--line)]'}`}><span className="text-xs opacity-60">{x.group}</span><br />{x.name}</button>)}</div></Sec><Process /></>;
}
function Boutique() {
  const { s } = useS(); const [g, setG] = useState('All');
  const list = s.services.map((v, i) => ({ v, i })).filter(x => g === 'All' || x.v.group === g);
  return <><Sec className="!pb-4"><Kick>{s.cat}</Kick><h1 className="mt-2 text-5xl leading-none">{s.title}</h1></Sec><Sec id="svc-services" className="!pt-4"><div className="mb-6 flex flex-wrap gap-2">{['All', ...s.groups].map(x => <button key={x} onClick={() => setG(x)} aria-pressed={g === x} className={`rounded-full border px-5 py-2 text-sm ${g === x ? 'border-[var(--ac)] bg-[var(--ac)] text-[var(--acfg)]' : 'border-[var(--line)]'}`}>{x}</button>)}</div><div className="grid gap-5 @md:grid-cols-3">{list.map(x => <ServiceCard key={x.i} i={x.i} big />)}</div></Sec><Process /><Faq /></>;
}
const Campaign = () => { const { s, im, enquire } = useS(); return <><Hero split /><Benefits /><Sec id="svc-services"><div className="relative overflow-hidden rounded-md"><img loading="lazy" src={im(2, 1400)} alt="" className="h-[340px] w-full object-cover" /><div className="absolute inset-0 flex items-center bg-black/45 p-8 text-white"><div><p className="max-w-lg text-3xl">{s.services[0].name}</p><p className="mt-2 max-w-md text-white/85">{s.services[0].desc}</p><Btn className="mt-4" onClick={() => enquire(s.services[0].name)}>Enquire</Btn></div></div></div></Sec><Process /></>; };
function Dimensional() {
  const { s, im } = useS(); const [m, setM] = useState({ x: 0, y: 0 });
  return <><Sec><div className="grid items-center gap-8 @md:grid-cols-2"><div><Kick>{s.cat}</Kick><h1 className="mt-2 text-5xl leading-none @sm:text-6xl">{s.title}</h1><p className="mt-4 opacity-75">{s.sub}</p></div>
    <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1000px]" onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }} onMouseLeave={() => setM({ x: 0, y: 0 })}>{[2, 1, 0].map((l, k) => <img key={l} src={im(l, 800)} alt="" width={260 + k * 40} height={320} style={{ transform: `translate3d(${m.x * (k + 1) * 30}px,${m.y * (k + 1) * 30}px,${k * 40}px) rotateY(${m.x * 12}deg) rotateX(${-m.y * 12}deg)` }} className="absolute rounded-md object-cover shadow-2xl transition-transform duration-150" />)}</div></div></Sec><Services /><Faq /></>;
}
function Parallax() {
  const { s, im, scrollEl } = useS(); const [y, setY] = useState(0);
  useEffect(() => { const t: HTMLElement | Window = scrollEl?.current ?? window; const on = () => setY(scrollEl?.current ? scrollEl.current.scrollTop : window.scrollY); t.addEventListener('scroll', on, { passive: true }); return () => t.removeEventListener('scroll', on); }, [scrollEl]);
  return <><div className="relative h-[560px] overflow-hidden"><img src={im(0, 1600)} alt="" style={{ transform: `translateY(${y * 0.35}px) scale(1.1)` }} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/35" /><h1 style={{ transform: `translateY(${-y * 0.2}px)` }} className="absolute bottom-10 left-6 max-w-3xl text-6xl leading-[.9] text-white @sm:left-14 @sm:text-8xl">{s.title}</h1></div>
    <Sec><div className="grid gap-4 @sm:grid-cols-3">{[1, 2, 3].map((n, k) => <img key={n} loading="lazy" src={im(n, 700)} alt="" style={{ transform: `translateY(${(k % 2 ? -1 : 1) * Math.min(60, y * 0.05)}px)` }} className="aspect-[4/5] w-full rounded-md object-cover" />)}</div></Sec><Services /><Faq /></>;
}
const Cinematic = () => { const { s, im, enquire } = useS(); return <><Hero dark />{s.services.map((v, i) => <div key={i} className="relative flex min-h-[380px] items-center overflow-hidden"><img loading="lazy" src={im(i + 1, 1500)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" /><div className={`relative px-6 @sm:px-14 ${i % 2 ? 'ml-auto text-right' : ''}`}><Kick>{v.group}</Kick><h2 className="mt-2 text-4xl @sm:text-5xl">{v.name}</h2><p className="mt-2 max-w-md opacity-85">{v.desc}</p><Btn className="mt-4" onClick={() => enquire(v.name)}>Enquire</Btn></div></div>)}<Process /><Faq /></>; };
function Studio() {
  const { s, enquire } = useS(); const [g, setG] = useState(s.groups[0]);
  const list = s.services.filter(v => v.group === g);
  return <><Sec className="!pb-6"><Kick>{s.cat}</Kick><h1 className="mt-2 text-5xl leading-none">{s.title}</h1><p className="mt-3 max-w-xl opacity-75">{s.sub}</p></Sec><Sec id="svc-services" className="!pt-2"><div className="grid gap-6 @md:grid-cols-[220px_1fr]"><ul className="border-[var(--line)] @md:border-r @md:pr-4">{s.groups.map(x => <li key={x}><button onClick={() => setG(x)} aria-pressed={g === x} className={`w-full py-3 text-left ${g === x ? 'font-semibold text-[var(--ac)]' : ''}`}>{x}</button></li>)}</ul>
    <div className="grid gap-4">{(list.length ? list : s.services).map(v => <div key={v.name} className="flex flex-col gap-3 rounded-md border border-[var(--line)] p-5 @sm:flex-row @sm:items-center"><div className="flex-1"><h3 className="text-xl">{v.name}</h3><p className="mt-1 text-sm opacity-75">{v.desc}</p></div><Btn onClick={() => enquire(v.name)}>Enquire</Btn></div>)}</div></div></Sec><Process /><Faq /></>;
}
