import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Gift, Sparkles, Truck, Check } from 'lucide-react';
import { Btn, Grid, H, Newsletter, ProductCard, Reassure, Section, ShopPage, num, useShop } from './kit';

export type PVariant = 'lookbook' | 'bundle' | 'configurator' | 'fashion' | 'discovery' | 'concierge' | 'editorial' | 'spotlight' | 'boutique' | 'campaign' | 'dimensional' | 'parallax' | 'cinematic' | 'commerce';
export function productVariant(title: string): PVariant {
  const t = title.toLowerCase();
  const m: [string, PVariant][] = [['lookbook', 'lookbook'], ['bundle', 'bundle'], ['configurator', 'configurator'], ['signature', 'discovery'], ['concierge', 'concierge'], ['editorial', 'editorial'], ['spotlight', 'spotlight'], ['boutique', 'boutique'], ['campaign', 'campaign'], ['dimensional', 'dimensional'], ['parallax', 'parallax'], ['cinematic', 'cinematic'], ['commerce', 'commerce']];
  return m.find(([k]) => t.includes(k))?.[1] ?? 'fashion';
}
export const isDarkProduct = (v: PVariant) => v === 'cinematic' || v === 'concierge' || v === 'configurator';

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">{children}</p>;

type HeroKind = 'full' | 'split' | 'center' | 'tri';
function Hero({ full, dark, kind = 'full' }: { full?: boolean; dark?: boolean; kind?: HeroKind }) {
  const { store, im, go } = useShop();
  const cta = <div className="mt-6 flex flex-wrap gap-3"><Btn onClick={() => go('shop')}>Browse the collection <ArrowRight size={16} /></Btn><Btn ghost onClick={() => go('journal')}>Read the journal</Btn></div>;
  if (kind === 'split') return (
    <section className={`grid items-center gap-8 px-5 py-12 @md:grid-cols-2 @md:px-10 ${dark ? 'bg-[var(--soft)]' : ''}`}>
      <div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">{store.kicker}</p><h1 className="mt-3 text-5xl leading-[.98] tracking-tight @md:text-6xl">{store.title}</h1><p className="mt-4 max-w-md opacity-75">{store.sub}</p>{cta}</div>
      <img src={im(0, 1200)} alt="" className="aspect-[4/5] w-full rounded-md object-cover" />
    </section>);
  if (kind === 'center') return (
    <section className="px-5 py-14 text-center @md:px-10"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">{store.exploreLabel.replace('EXPLORE ', '')}</p><h1 className="mx-auto mt-3 max-w-3xl text-5xl leading-[.98] tracking-tight @md:text-7xl">{store.title}</h1><p className="mx-auto mt-4 max-w-xl opacity-75">{store.sub}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">{store.edits.map(e => <button key={e} onClick={() => go('shop')} className="rounded-full border border-[var(--line)] px-5 py-2 text-sm hover:bg-[var(--soft)]">{e}</button>)}</div>
      <img src={im(0, 1600)} alt="" className="mt-10 h-[260px] w-full rounded-md object-cover @md:h-[340px]" /></section>);
  if (kind === 'tri') return (
    <section className="relative grid h-[540px] grid-cols-3 gap-1 overflow-hidden">{[0, 1, 2].map(k => <img key={k} src={im(k, 900)} alt="" className="h-full w-full object-cover" />)}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 text-white @md:p-12"><div><h1 className="max-w-2xl text-5xl leading-[.95] tracking-tight @md:text-7xl">{store.title}</h1>{cta}</div></div></section>);
  return (
    <div className={`relative flex items-end overflow-hidden ${full ? 'min-h-[620px]' : 'min-h-[460px]'}`}>
      <img src={im(0, 1600)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${dark ? 'bg-black/55' : 'bg-gradient-to-r from-black/55 via-black/20 to-transparent'}`} />
      <div className="relative max-w-2xl px-6 pb-12 text-white @sm:px-14 @sm:pb-16"><p className="text-sm">{store.kicker}</p><h1 className="mt-2 text-5xl leading-[0.95] tracking-tight @sm:text-7xl">{store.title}</h1><p className="mt-4 max-w-md text-lg text-white/90">{store.sub}</p>{cta}</div>
    </div>);
}
const ids = (n: number, len: number) => Array.from({ length: Math.min(n, len) }, (_, i) => i);

function Lookbook() {
  const { store, im, price, add, toast } = useShop();
  const [hot, setHot] = useState(0);
  const look = [0, 1, 2].map(i => i % store.products.length);
  const total = look.reduce((a, i) => a + num(store.products[i].price), 0);
  const pos = [['22%', '30%'], ['55%', '52%'], ['70%', '24%']];
  return (<>
    <Hero kind="split" />
    <Section><H sub="Three pieces, styled together. Tap a number on the photo to see each one.">This week’s look</H>
      <div className="grid items-center gap-8 @md:grid-cols-2">
        <div className="relative"><img src={im(1, 1100)} alt="Styled look" className="aspect-[4/5] w-full rounded-md object-cover" />
          {pos.map(([x, y], k) => <button key={k} aria-label={`Show piece ${k + 1}`} aria-pressed={hot === k} onClick={() => setHot(k)} style={{ left: x, top: y }} className={`absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-lg transition ${hot === k ? 'scale-110 bg-[var(--ac)] text-white' : 'bg-white/90 text-black'}`}>{k + 1}</button>)}</div>
        <div><ul className="divide-y divide-[var(--line)]">{look.map((i, k) => <li key={k}><button onClick={() => setHot(k)} className={`flex w-full items-center gap-4 py-4 text-left ${hot === k ? 'text-[var(--ac)]' : ''}`}><span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-xs">{k + 1}</span><span className="flex-1"><span className="block text-xs opacity-60">{store.edits[k]}</span>{store.products[i].name}</span><span>{store.products[i].price}</span></button></li>)}</ul>
          <div className="mt-5 flex items-center justify-between"><span className="text-sm opacity-70">Complete-look price</span><strong className="text-2xl">{price(total)}</strong></div>
          <Btn className="mt-4 w-full" onClick={() => look.forEach(i => add(i))}>Add the complete look</Btn>
          <p className="mt-2 text-xs opacity-60">{store.products[look[hot]].name}, {store.products[look[hot]].price}</p></div></div></Section>
    <ShopPage /><Reassure /><Newsletter />{toast && null}
  </>);
}
function Bundle() {
  const { store, im, price, add } = useShop();
  const [pick, setPick] = useState<number[]>([]);
  const toggle = (i: number) => setPick(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const sub = pick.reduce((a, i) => a + num(store.products[i].price), 0);
  const rate = pick.length >= 5 ? 0.2 : pick.length >= 4 ? 0.15 : pick.length >= 3 ? 0.1 : 0;
  return (<>
    <Section className="!pb-4"><Kicker>{store.exploreLabel.replace('EXPLORE ', '')}</Kicker><h1 className="mt-2 max-w-xl text-5xl leading-none">Build your bundle. Save up to 20%.</h1><p className="mt-3 max-w-lg opacity-75">{store.sub}</p></Section>
    <Section className="!pt-6"><div className="grid gap-8 @lg:grid-cols-[1fr_320px]">
      <div className="grid grid-cols-2 gap-4 @sm:grid-cols-3">{store.products.map((p, i) => <button key={i} onClick={() => toggle(i)} aria-pressed={pick.includes(i)} className={`relative rounded-md border p-2 text-left transition ${pick.includes(i) ? 'border-[var(--ac)] ring-2 ring-[var(--ac)]' : 'border-[var(--line)]'}`}><img src={im(i + 1, 500)} alt="" className="aspect-[3/4] w-full rounded object-cover" /><p className="mt-2 text-sm">{p.name}</p><p className="text-sm opacity-70">{p.price}</p>{pick.includes(i) && <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ac)] text-white"><Check size={14} /></span>}</button>)}</div>
      <aside className="h-fit rounded-md bg-[var(--soft)] p-5 @lg:sticky @lg:top-4"><p className="font-semibold">Your bundle</p>
        <div className="mt-3 h-2 rounded-full bg-[var(--line)]"><div className="h-2 rounded-full bg-[var(--ac)] transition-all" style={{ width: `${Math.min(100, pick.length / 5 * 100)}%` }} /></div>
        <p className="mt-2 text-xs opacity-70">{pick.length < 3 ? `Pick ${3 - pick.length} more to unlock 10% off` : `${Math.round(rate * 100)}% savings unlocked${pick.length < 5 ? ' — add more to save more' : ''}`}</p>
        <ul className="mt-3 text-sm">{pick.map(i => <li key={i} className="flex justify-between py-1"><span>{store.products[i].name}</span><span>{store.products[i].price}</span></li>)}</ul>
        <div className="mt-3 border-t border-[var(--line)] pt-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{price(sub)}</span></div><div className="flex justify-between text-[var(--ac)]"><span>Bundle savings</span><span>−{price(sub * rate)}</span></div><div className="mt-1 flex justify-between text-lg font-semibold"><span>Total</span><span>{price(sub * (1 - rate))}</span></div></div>
        <Btn className="mt-4 w-full" onClick={() => { pick.forEach(i => add(i)); setPick([]); }}>{pick.length ? `Add ${pick.length} to bag` : 'Select pieces'}</Btn></aside></div></Section>
    <Reassure /><Newsletter />
  </>);
}
function Configurator() {
  const { store, im, price, add, toggleWish, wish } = useShop();
  const [rot, setRot] = useState({ x: 0, y: 0 }); const [fin, setFin] = useState(0); const [size, setSize] = useState('M'); const [msg, setMsg] = useState('');
  const fins = [['Natural', 0, 1], ['Midnight', 200, 0.8], ['Rose', 330, 1], ['Forest', 120, 0.85]] as const;
  const base = num(store.products[0].price); const total = base + fin * 8 + (msg ? 6 : 0) + (size === 'XL' ? 10 : 0);
  return (<>
    <Section><div className="grid items-center gap-10 @md:grid-cols-2">
      <div className="[perspective:900px]" onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setRot({ x: -((e.clientY - r.top) / r.height - 0.5) * 18, y: ((e.clientX - r.left) / r.width - 0.5) * 18 }); }} onMouseLeave={() => setRot({ x: 0, y: 0 })}>
        <img src={im(0, 1000)} alt={store.products[0].name} style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, filter: `hue-rotate(${fins[fin][1]}deg) brightness(${fins[fin][2]})` }} className="aspect-[4/5] w-full rounded-lg object-cover shadow-2xl transition-transform duration-150" /></div>
      <div><Kicker>Product configurator</Kicker><h1 className="mt-2 text-5xl leading-none">{store.products[0].name}</h1><p className="mt-3 opacity-75">{store.sub}</p>
        <p className="mt-6 text-sm font-semibold">Finish — {fins[fin][0]}</p><div className="mt-2 flex gap-2">{fins.map((f, k) => <button key={f[0]} aria-label={f[0]} aria-pressed={fin === k} onClick={() => setFin(k)} style={{ background: ['#d9c7a8', '#1f2a44', '#c4788f', '#2d4a35'][k] }} className={`h-9 w-9 rounded-full border-2 ${fin === k ? 'border-[var(--ac)] ring-2 ring-white/40' : 'border-transparent'}`} />)}</div>
        <p className="mt-5 text-sm font-semibold">Size</p><div className="mt-2 flex gap-2">{['S', 'M', 'L', 'XL'].map(s => <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`h-11 w-11 rounded-md border text-sm ${size === s ? 'border-[var(--ac)] bg-[var(--ac)] text-white' : 'border-[var(--line)]'}`}>{s}</button>)}</div>
        <label className="mt-5 block text-sm font-semibold">Personal message (+{price(6)})<input maxLength={24} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Up to 24 characters" className="mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-transparent px-4 font-normal" /></label>
        <p className="mt-6 text-3xl">{price(total)}</p>
        <div className="mt-4 flex gap-3"><Btn className="flex-1" onClick={() => add(0, size)}>Add to bag</Btn><button onClick={() => toggleWish(0)} aria-pressed={wish.has(0)} className="rounded-md border border-[var(--line)] px-5 text-sm">{wish.has(0) ? 'Saved' : 'Wishlist'}</button></div></div></div></Section>
    <ShopPage /><Newsletter />
  </>);
}
function Fashion() {
  const { store, im, go } = useShop();
  return (<>
    <Hero />
    <Section><H>Shop by edit</H><div className="grid gap-4 @sm:grid-cols-3">{store.edits.map((e, k) => <button key={e} onClick={() => go('shop')} className="group relative aspect-[4/5] overflow-hidden rounded-md text-left"><img loading="lazy" src={im(k + 1, 700)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-5 text-xl text-white">{e}</span></button>)}</div></Section>
    <Section soft><H sub="Pick an option and add straight to your bag.">Best sellers</H><Grid ids={ids(8, store.products.length)} /></Section>
    <Reassure /><Newsletter />
  </>);
}
function Discovery() {
  const { store, im, go } = useShop();
  return (<>
    <Hero kind="center" />
    <Section><H sub={store.sub}>Discover {store.exploreLabel.replace('EXPLORE ', '').toLowerCase()}</H><Grid ids={ids(4, store.products.length)} /></Section>
    <Section soft><div className="grid items-center gap-8 @md:grid-cols-2"><img loading="lazy" src={im(2, 1000)} alt="" className="aspect-[4/3] w-full rounded-md object-cover" /><div><Kicker>In focus</Kicker><h2 className="mt-2 text-4xl">{store.products[1 % store.products.length].name}</h2><p className="mt-3 opacity-75">{store.sub}</p><Btn className="mt-5" onClick={() => go('product', 1)}>Explore every detail</Btn></div></div></Section>
    <Section><H>Featured collection</H><Grid ids={ids(8, store.products.length).slice(2)} /></Section><Reassure /><Newsletter />
  </>);
}
function Concierge() {
  const { store, im, go, add, price } = useShop();
  const qs = [['Who are you shopping for?', ['Myself', 'A gift']], ['What is your budget?', ['Under $60', '$60–$120', 'No limit']], ['Which style?', store.edits]] as const;
  const [ans, setAns] = useState<string[]>([]); const [gift, setGift] = useState(false); const [sub, setSub] = useState(false);
  const done = ans.length === qs.length;
  const matched = useMemo(() => { if (!done) return []; const cap = ans[1] === 'Under $60' ? 60 : ans[1] === '$60–$120' ? 120 : 1e9; const k = store.edits.indexOf(ans[2]); const all = store.products.map((_, i) => i); const m = all.filter(i => num(store.products[i].price) <= cap && i % 3 === k); return (m.length ? m : all.filter(i => num(store.products[i].price) <= cap)).slice(0, 3).concat(all.slice(0, 1)).slice(0, 3); }, [done, ans, store]);
  return (<>
    <Hero kind="split" dark />
    <Section><H sub="Three quick questions and we’ll match pieces to you.">Your personal shopper</H>
      {!done ? <div className="max-w-lg"><p className="text-xs opacity-60">Question {ans.length + 1} of {qs.length}</p><h3 className="mt-1 text-2xl">{qs[ans.length][0]}</h3><div className="mt-4 flex flex-wrap gap-2">{qs[ans.length][1].map(o => <button key={o} onClick={() => setAns(a => [...a, o])} className="rounded-full border border-[var(--line)] px-5 py-3 text-sm hover:bg-[var(--ac)] hover:text-white">{o}</button>)}</div></div>
        : <div><p className="mb-4 flex items-center gap-2 text-[var(--ac)]"><Sparkles size={16} /> Matched for: {ans.join(' · ')} <button className="ml-3 text-sm underline" onClick={() => setAns([])}>Start again</button></p><div className="grid grid-cols-2 gap-4 @sm:grid-cols-3">{matched.map(i => <ProductCard key={i} i={i} />)}</div></div>}
    </Section>
    <Section soft><div className="grid gap-5 @sm:grid-cols-3">
      <div className="rounded-md border border-[var(--line)] p-5"><Sparkles className="text-[var(--ac)]" /><p className="mt-2 font-semibold">Member rewards</p><p className="text-sm opacity-70">Earn 1 point per $1. 200 points = $10 off.</p></div>
      <div className="rounded-md border border-[var(--line)] p-5"><Truck className="text-[var(--ac)]" /><p className="mt-2 font-semibold">Order tracking</p><button className="mt-1 text-sm text-[var(--ac)] underline" onClick={() => go('account')}>Track an order</button></div>
      <div className="rounded-md border border-[var(--line)] p-5"><Gift className="text-[var(--ac)]" /><p className="mt-2 font-semibold">Gift wrap &amp; subscribe</p>
        <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={gift} onChange={e => setGift(e.target.checked)} className="accent-[var(--ac)]" /> Add gift wrap (+{price(5)})</label>
        <label className="mt-1 flex items-center gap-2 text-sm"><input type="checkbox" checked={sub} onChange={e => setSub(e.target.checked)} className="accent-[var(--ac)]" /> Subscribe &amp; save 10%</label>
        <Btn className="mt-3 w-full" onClick={() => add(0)}>Add first pick{gift ? ' + wrap' : ''}{sub ? ' (subscribed)' : ''}</Btn></div></div></Section>
    <Newsletter />
  </>);
}
function Editorial() {
  const { store, im } = useShop();
  return (<>
    <Section className="text-center"><Kicker>{store.exploreLabel.replace('EXPLORE ', '')}</Kicker><h1 className="mx-auto mt-3 max-w-3xl text-5xl leading-none @sm:text-6xl">{store.title}</h1><p className="mx-auto mt-4 max-w-xl opacity-75">{store.sub}</p></Section>
    <Section className="!pt-0"><Grid ids={ids(8, store.products.length)} /></Section>
    <Section soft><div className="mx-auto grid max-w-4xl items-center gap-8 @md:grid-cols-2"><img loading="lazy" src={im(1, 800)} alt="" className="aspect-square w-full rounded-md object-cover" /><div><Kicker>Our story</Kicker><p className="mt-3 text-2xl leading-snug">{store.brand} is a compact brand introduction: who we are and what we make.</p><p className="mt-3 opacity-75">{store.sub}</p></div></div></Section><Newsletter />
  </>);
}
function Spotlight() {
  const { store, im, go } = useShop();
  return (<>
    <Hero kind="tri" />
    <Section><H>Collection edits</H><div className="grid gap-4 @md:grid-cols-3">{store.edits.map((e, k) => <button key={e} onClick={() => go('shop')} className="group relative aspect-[3/4] overflow-hidden rounded-md text-left"><img loading="lazy" src={im(k + 1, 800)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">{e}</span></button>)}</div></Section>
    <Section soft><H sub="Tap Add to bag for a quick add.">Quick-add products</H><Grid ids={ids(8, store.products.length)} /></Section>
    <Section><div className="mx-auto max-w-2xl text-center"><Kicker>Brand story</Kicker><p className="mt-3 text-3xl leading-snug">{store.sub}</p></div></Section><Newsletter />
  </>);
}
function Boutique() {
  const { store, im, go, add } = useShop();
  const [spot, setSpot] = useState(0);
  return (<>
    <Section className="!pb-0"><Kicker>{store.exploreLabel.replace('EXPLORE ', '')}</Kicker><h1 className="mt-2 text-5xl leading-none">{store.title}</h1></Section>
    <ShopPage />
    <Section soft><div className="grid items-center gap-8 @md:grid-cols-2"><img src={im(spot + 1, 900)} alt="" className="aspect-[4/5] w-full rounded-md object-cover" /><div><Kicker>Product spotlight</Kicker><h2 className="mt-2 text-4xl">{store.products[spot].name}</h2><p className="mt-2 text-xl">{store.products[spot].price}</p><div className="mt-5 flex gap-3"><Btn onClick={() => add(spot)}>Add to bag</Btn><Btn ghost onClick={() => go('product', spot)}>Details</Btn></div>
      <p className="mb-2 mt-8 text-sm font-semibold">Related pieces</p><div className="flex gap-3">{store.products.map((_, i) => i).filter(i => i !== spot).slice(0, 4).map(i => <button key={i} onClick={() => setSpot(i)} aria-label={store.products[i].name}><img src={im(i + 1, 200)} alt="" className="h-20 w-16 rounded object-cover" /></button>)}</div></div></div></Section><Newsletter />
  </>);
}
function Campaign() {
  const { store, im, go, add } = useShop();
  return (<>
    <Section><div className="grid items-center gap-8 @md:grid-cols-2"><div><Kicker>Featured campaign</Kicker><h1 className="mt-2 text-5xl leading-none @sm:text-6xl">{store.products[0].name}</h1><p className="mt-4 max-w-md opacity-75">{store.sub}</p><div className="mt-6 flex gap-3"><Btn onClick={() => add(0)}>Add to bag · {store.products[0].price}</Btn><Btn ghost onClick={() => go('product', 0)}>Details</Btn></div></div><img src={im(0, 1100)} alt="" className="aspect-[4/5] w-full rounded-md object-cover" /></div></Section>
    <Section soft><div className="grid gap-5 @sm:grid-cols-3">{[['Considered materials', 'Made to last, made to love.'], ['Simple delivery', 'Clear shipping and returns.'], ['Made for you', store.sub]].map(([a, b]) => <div key={a} className="rounded-md bg-[var(--bg)] p-6"><Check className="text-[var(--ac)]" /><p className="mt-2 text-lg font-semibold">{a}</p><p className="text-sm opacity-70">{b}</p></div>)}</div></Section>
    <Section><div className="relative overflow-hidden rounded-md"><img loading="lazy" src={im(2, 1400)} alt="" className="h-[360px] w-full object-cover" /><div className="absolute inset-0 flex items-center bg-black/45 p-8 text-white"><div><p className="text-3xl @sm:text-4xl">Not just what you buy, but what you choose.</p><Btn className="mt-4" onClick={() => go('shop')}>Shop the story</Btn></div></div></div></Section>
    <Section soft><H>Focused shop</H><Grid ids={ids(4, store.products.length)} /></Section><Newsletter />
  </>);
}
function Dimensional() {
  const { store, im, go } = useShop();
  const [m, setM] = useState({ x: 0, y: 0 });
  return (<>
    <Section><div className="grid items-center gap-8 @md:grid-cols-2"><div><Kicker>{store.exploreLabel.replace('EXPLORE ', '')}</Kicker><h1 className="mt-2 text-5xl leading-none @sm:text-6xl">{store.title}</h1><p className="mt-4 opacity-75">{store.sub}</p><Btn className="mt-6" onClick={() => go('shop')}>Shop the collection</Btn></div>
      <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1000px]" onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }} onMouseLeave={() => setM({ x: 0, y: 0 })}>
        {[2, 1, 0].map((l, k) => <img key={l} src={im(l, 800)} alt="" style={{ transform: `translate3d(${m.x * (k + 1) * 30}px,${m.y * (k + 1) * 30}px,${k * 40}px) rotateY(${m.x * 12}deg) rotateX(${-m.y * 12}deg)` }} className="absolute rounded-md object-cover shadow-2xl transition-transform duration-150" {...{ width: 260 + k * 40, height: 320 }} />)}
      </div></div></Section>
    <Section soft><H sub="A closer look at what matters to you.">Look closer</H><Grid ids={ids(3, store.products.length)} cols="@sm:grid-cols-3" /></Section>
    <Section><H>The collection</H><Grid ids={ids(8, store.products.length)} /></Section><Newsletter />
  </>);
}
function useScrollProgress(el: React.RefObject<HTMLDivElement> | null) {
  const [y, setY] = useState(0);
  useEffect(() => { const t: HTMLElement | Window = el?.current ?? window; const on = () => setY(el?.current ? el.current.scrollTop : window.scrollY); t.addEventListener('scroll', on, { passive: true }); return () => t.removeEventListener('scroll', on); }, [el]);
  return y;
}
function Parallax() {
  const { store, im, scrollEl, go } = useShop(); const y = useScrollProgress(scrollEl);
  return (<>
    <div className="relative h-[620px] overflow-hidden"><img src={im(0, 1600)} alt="" style={{ transform: `translateY(${y * 0.35}px) scale(1.1)` }} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/30" />
      <h1 style={{ transform: `translateY(${-y * 0.2}px)` }} className="absolute bottom-10 left-6 max-w-3xl text-6xl leading-[0.9] text-white @sm:left-14 @sm:text-8xl">{store.title}</h1></div>
    <Section><div className="grid gap-4 @sm:grid-cols-3">{[1, 2, 3].map((n, k) => <img key={n} loading="lazy" src={im(n, 700)} alt="" style={{ transform: `translateY(${(k % 2 ? -1 : 1) * Math.min(60, y * 0.05)}px)` }} className={`w-full rounded-md object-cover ${k === 1 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`} />)}</div>
      <p className="mx-auto mt-10 max-w-xl text-center text-xl">{store.sub}</p><div className="mt-6 text-center"><Btn onClick={() => go('shop')}>Curated discovery</Btn></div></Section>
    <Section soft><Grid ids={ids(8, store.products.length)} /></Section><Newsletter />
  </>);
}
function Cinematic() {
  const { store, im, go, add } = useShop();
  const [open, setOpen] = useState(false);
  return (<>
    <Hero full dark />
    {store.products.slice(0, 3).map((p, i) => <div key={i} className="relative flex min-h-[460px] items-center overflow-hidden"><img loading="lazy" src={im(i + 1, 1500)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" /><div className={`relative px-6 @sm:px-14 ${i % 2 ? 'ml-auto text-right' : ''}`}><Kicker>Scene {i + 1}</Kicker><h2 className="mt-2 text-5xl">{p.name}</h2><p className="mt-2 text-xl">{p.price}</p><Btn className="mt-4" onClick={() => add(i)}>Add to bag</Btn></div></div>)}
    <Section><div className="mx-auto max-w-3xl text-center"><p className="text-3xl leading-snug @sm:text-4xl">{store.sub}</p></div></Section>
    <Section soft>{open ? <Grid ids={ids(8, store.products.length)} /> : <div className="text-center"><Btn onClick={() => setOpen(true)}>Reveal the collection</Btn></div>}<p className="mt-6 text-center"><button className="text-sm underline" onClick={() => go('shop')}>Open the full shop</button></p></Section>
  </>);
}
function Commerce() {
  const { store, im, go } = useShop(); const [cat, setCat] = useState('All');
  const cats = ['All', ...store.edits];
  const list = store.products.map((_, i) => i).filter(i => cat === 'All' || store.edits[i % 3] === cat);
  return (<>
    <Section className="!py-8"><div className="grid gap-6 @lg:grid-cols-[220px_1fr]">
      <ul className="hidden border-r border-[var(--line)] pr-4 @lg:block">{cats.map(c => <li key={c}><button onClick={() => setCat(c)} aria-pressed={cat === c} className={`w-full py-2.5 text-left text-sm ${cat === c ? 'font-semibold text-[var(--ac)]' : ''}`}>{c}</button></li>)}</ul>
      <div className="relative min-h-[320px] overflow-hidden rounded-md"><img src={im(0, 1400)} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" /><div className="relative max-w-md p-8 text-white @sm:p-12"><p className="text-xs uppercase tracking-widest">New season</p><h1 className="mt-2 text-5xl leading-none">{store.title}</h1><Btn className="mt-5" onClick={() => go('shop')}>Shop now</Btn></div></div></div></Section>
    <Section className="!pt-0"><div className="mb-4 flex gap-2 overflow-x-auto @lg:hidden">{cats.map(c => <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-2 text-sm ${cat === c ? 'border-[var(--ac)] bg-[var(--ac)] text-white' : 'border-[var(--line)]'}`}>{c}</button>)}</div><H sub="Browse by category — every piece adds straight to the bag.">Product discovery</H><Grid ids={list} /></Section>
    <Reassure /><Newsletter />
  </>);
}

const MAP: Record<PVariant, () => JSX.Element> = { lookbook: Lookbook, bundle: Bundle, configurator: Configurator, fashion: Fashion, discovery: Discovery, concierge: Concierge, editorial: Editorial, spotlight: Spotlight, boutique: Boutique, campaign: Campaign, dimensional: Dimensional, parallax: Parallax, cinematic: Cinematic, commerce: Commerce };
export function ProductHome({ variant }: { variant: PVariant }) { const V = MAP[variant]; return <V />; }
// kept for tree-shaking friendliness of unused imports in some variants
void useRef;

/** Per-design look: image offset, tone and heading font so no two previews share an opening screen. */
export const PRODUCT_LOOK: Record<PVariant, { offset: number; tone: number; serif: boolean }> = {
  lookbook: { offset: 0, tone: 0, serif: false }, bundle: { offset: 1, tone: 5, serif: true }, configurator: { offset: 2, tone: 0, serif: false },
  fashion: { offset: 0, tone: 1, serif: false }, discovery: { offset: 1, tone: 2, serif: false }, concierge: { offset: 2, tone: 2, serif: true },
  editorial: { offset: 3, tone: 1, serif: true }, spotlight: { offset: 1, tone: 3, serif: false }, boutique: { offset: 2, tone: 4, serif: true },
  campaign: { offset: 3, tone: 5, serif: false }, dimensional: { offset: 1, tone: 4, serif: false }, parallax: { offset: 2, tone: 0, serif: true },
  cinematic: { offset: 3, tone: 1, serif: true }, commerce: { offset: 0, tone: 4, serif: false },
};
