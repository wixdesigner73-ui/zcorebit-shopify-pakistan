import { createContext, useContext, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Heart, Search, ShoppingBag, User, Check, X, Minus, Plus } from 'lucide-react';
import { asset } from '../lib/config';

export type PProduct = { name: string; price: string };
export type PStore = { exploreLabel: string; brand: string; kicker: string; title: string; sub: string; edits: string[]; products: PProduct[]; images: string[] };
export type Design = { brandLabel: string; kind: string; title: string; desc: string };

export const img = (u: string, w = 900) => (u.startsWith('http') ? `${u}&w=${w}` : asset(u));
export const num = (s: string) => parseFloat(s.replace(/[$,]/g, '')) || 0;
export const CUR = { USD: { r: 1, s: '$' }, EUR: { r: 0.92, s: '€' }, GBP: { r: 0.79, s: '£' } } as const;
export type Cur = keyof typeof CUR;

export type Theme = { bg: string; fg: string; soft: string; line: string; ac: string; acFg: string; dark: boolean };
const ACC = ['#a8452f', '#1f4d3a', '#1d3557', '#7a4e2d', '#b3365f', '#2f6f6a', '#5b3a8a', '#c2410c', '#0f5c8c', '#6b705c', '#8a3b3b', '#2d5d7b'];
export function makeTheme(seed: number, dark: boolean): Theme {
  const ac = ACC[seed % ACC.length];
  return dark ? { bg: '#0d0d0f', fg: '#f4efe8', soft: '#18181b', line: 'rgba(255,255,255,.14)', ac, acFg: '#fff', dark }
    : { bg: '#fbf8f3', fg: '#1c1917', soft: '#f1ebe2', line: 'rgba(28,25,23,.14)', ac, acFg: '#fff', dark };
}
export const themeVars = (t: Theme): CSSProperties => ({ ['--bg' as string]: t.bg, ['--fg' as string]: t.fg, ['--soft' as string]: t.soft, ['--line' as string]: t.line, ['--ac' as string]: t.ac, ['--acfg' as string]: t.acFg });

export type Item = { p: PProduct; i: number; size?: string; qty: number };
type Page = 'home' | 'shop' | 'product' | 'bag' | 'journal' | 'account';
type Ctx = {
  store: PStore; cur: Cur; setCur: (c: Cur) => void; price: (n: number) => string;
  bag: Item[]; add: (i: number, size?: string, qty?: number) => void; remove: (k: number) => void; setQty: (k: number, q: number) => void;
  wish: Set<number>; toggleWish: (i: number) => void; page: Page; go: (p: Page, prod?: number) => void; prod: number;
  im: (i: number, w?: number) => string; toast: string; scrollEl: React.RefObject<HTMLDivElement> | null;
};
const C = createContext<Ctx>(null as unknown as Ctx);
export const useShop = () => useContext(C);

/** Wraps a sample storefront: header, bag drawer, working pages. `home` supplies the variant-specific homepage. */
export function Shop({ store, theme, home, scrollEl, footer = true }: { store: PStore; theme: Theme; home: ReactNode; scrollEl?: React.RefObject<HTMLDivElement>; footer?: boolean }) {
  const [cur, setCur] = useState<Cur>('USD');
  const [bag, setBag] = useState<Item[]>([]);
  const [wish, setWish] = useState<Set<number>>(new Set());
  const [page, setPage] = useState<Page>('home');
  const [prod, setProd] = useState(0);
  const [toast, setToast] = useState('');
  const [q, setQ] = useState('');
  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 1800); };
  const ctx: Ctx = useMemo(() => ({
    store, cur, setCur, price: n => `${CUR[cur].s}${(n * CUR[cur].r).toFixed(2)}`,
    bag, add: (i, size, qty = 1) => { setBag(b => { const k = b.findIndex(x => x.i === i && x.size === size); if (k >= 0) return b.map((x, j) => j === k ? { ...x, qty: x.qty + qty } : x); return [...b, { p: store.products[i], i, size, qty }]; }); flash(`${store.products[i].name} added to bag`); },
    remove: k => setBag(b => b.filter((_, j) => j !== k)), setQty: (k, qty) => setBag(b => qty < 1 ? b.filter((_, j) => j !== k) : b.map((x, j) => j === k ? { ...x, qty } : x)),
    wish, toggleWish: i => setWish(w => { const n = new Set(w); n.has(i) ? n.delete(i) : n.add(i); return n; }),
    page, go: (p, pr) => { setPage(p); if (pr !== undefined) setProd(pr); scrollEl?.current?.scrollTo({ top: 0 }); }, prod,
    im: (i, w = 900) => img(store.images[i % store.images.length], w), toast, scrollEl: scrollEl ?? null,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [store, cur, bag, wish, page, prod, toast]);
  const count = bag.reduce((a, b) => a + b.qty, 0);
  const tabs: [Page, string][] = [['home', 'Home'], ['shop', 'Shop'], ['product', 'Product'], ['bag', 'Bag'], ['journal', 'Journal'], ['account', 'Account']];
  const results = q.trim() ? store.products.map((p, i) => ({ p, i })).filter(x => x.p.name.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <C.Provider value={ctx}>
      <div style={{ ...themeVars(theme), background: 'var(--bg)', color: 'var(--fg)' }} className="relative min-h-full text-left font-sans">
        <div className="bg-[var(--ac)] py-2 text-center text-[11px] font-bold uppercase tracking-[.18em] text-[var(--acfg)]">{store.exploreLabel}</div>
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3 sm:gap-6 sm:px-8">
          <button className="text-2xl tracking-tight sm:text-[28px]" onClick={() => ctx.go('home')}>{store.brand}</button>
          <div className="relative hidden flex-1 sm:block">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="What are you looking for?" aria-label="Search store" className="h-11 w-full rounded-md border border-[var(--line)] bg-[var(--soft)] px-4 pr-10 text-sm text-[var(--fg)] outline-none placeholder:opacity-60" />
            <Search size={16} className="absolute right-3 top-3.5 opacity-70" />
            {q && <div className="absolute left-0 right-0 top-12 z-30 rounded-md border border-[var(--line)] bg-[var(--bg)] p-2 shadow-xl">{results.length ? results.map(r => <button key={r.i} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-[var(--soft)]" onClick={() => { setQ(''); ctx.go('product', r.i); }}>{r.p.name} · {ctx.price(num(r.p.price))}</button>) : <p className="px-3 py-2 text-sm opacity-70">No matches</p>}</div>}
          </div>
          <div className="ml-auto flex items-center gap-4 sm:ml-0">
            <button aria-label="Account" onClick={() => ctx.go('account')}><User size={19} /></button>
            <button aria-label={`Saved products (${wish.size})`} onClick={() => ctx.go('shop')} className="relative"><Heart size={19} fill={wish.size ? 'currentColor' : 'none'} /></button>
            <button aria-label={`Bag (${count})`} onClick={() => ctx.go('bag')} className="flex items-center gap-1.5"><ShoppingBag size={19} /><span className="text-xs">{count}</span></button>
          </div>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto border-b border-[var(--line)] px-2 sm:px-6" aria-label="Store">
          {tabs.map(([k, l]) => <button key={k} onClick={() => ctx.go(k)} className={`shrink-0 border-b-2 px-3 py-3.5 text-sm ${page === k ? 'border-[var(--ac)] font-medium text-[var(--ac)]' : 'border-transparent opacity-80 hover:opacity-100'}`}>{l}</button>)}
          <div className="ml-auto shrink-0 pr-2"><select aria-label="Currency" value={cur} onChange={e => setCur(e.target.value as Cur)} className="rounded-md border border-[var(--line)] bg-[var(--bg)] px-2 py-2 text-sm">{(Object.keys(CUR) as Cur[]).map(c => <option key={c}>{c}</option>)}</select></div>
        </nav>
        <main>
          {page === 'home' && home}
          {page === 'shop' && <ShopPage />}
          {page === 'product' && <ProductPage />}
          {page === 'bag' && <BagPage />}
          {page === 'journal' && <JournalPage />}
          {page === 'account' && <AccountPage />}
        </main>
        {footer && <StoreFooter />}
        {toast && <div role="status" className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
      </div>
    </C.Provider>
  );
}

export const Btn = ({ children, onClick, ghost, className = '' }: { children: ReactNode; onClick?: () => void; ghost?: boolean; className?: string }) => (
  <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${ghost ? 'border border-current' : 'bg-[var(--ac)] text-[var(--acfg)] hover:opacity-90'} ${className}`}>{children}</button>
);

export function ProductCard({ i, quick = true, ratio = '3/4' }: { i: number; quick?: boolean; ratio?: string }) {
  const { store, im, price, add, go, wish, toggleWish } = useShop();
  const p = store.products[i];
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-md bg-[var(--soft)]" style={{ aspectRatio: ratio }}>
        <button onClick={() => go('product', i)} className="block h-full w-full" aria-label={`View ${p.name}`}><img loading="lazy" src={im(i + 1, 600)} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></button>
        <button aria-label="Save" onClick={() => toggleWish(i)} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black"><Heart size={15} fill={wish.has(i) ? '#e11d48' : 'none'} stroke={wish.has(i) ? '#e11d48' : 'currentColor'} /></button>
      </div>
      <p className="mt-3 text-sm">{p.name}</p>
      <p className="text-sm opacity-70">{price(num(p.price))}</p>
      {quick && <button onClick={() => add(i)} className="mt-2 w-full rounded-md border border-[var(--line)] py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[var(--soft)]">Add to bag</button>}
    </div>
  );
}
export const Grid = ({ ids, cols = 'sm:grid-cols-3 lg:grid-cols-4' }: { ids: number[]; cols?: string }) => (
  <div className={`grid grid-cols-2 gap-4 sm:gap-6 ${cols}`}>{ids.map(i => <ProductCard key={i} i={i} />)}</div>
);
export const Section = ({ children, className = '', soft }: { children: ReactNode; className?: string; soft?: boolean }) => (
  <section className={`px-5 py-12 sm:px-10 sm:py-16 ${soft ? 'bg-[var(--soft)]' : ''} ${className}`}>{children}</section>
);
export const H = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div className="mb-8 max-w-2xl"><h2 className="text-3xl leading-tight sm:text-4xl">{children}</h2>{sub && <p className="mt-3 opacity-75">{sub}</p>}</div>
);

export function Reassure() {
  return <Section soft><div className="grid gap-6 sm:grid-cols-3">{[['Free delivery', 'On orders over $150'], ['30-day returns', 'Free and easy, no questions'], ['Secure checkout', 'Cards, Shop Pay and more']].map(([a, b]) => <div key={a}><Check size={18} className="mb-2 text-[var(--ac)]" /><p className="font-semibold">{a}</p><p className="text-sm opacity-70">{b}</p></div>)}</div></Section>;
}
export function Newsletter() {
  const [d, setD] = useState(false); const [e, setE] = useState('');
  return (
    <Section><div className="mx-auto max-w-xl text-center"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">A note from us</p><h2 className="mt-2 text-3xl">New ideas, delivered.</h2><p className="mt-2 opacity-75">Discover new arrivals, seasonal collections and stories.</p>
      {d ? <p className="mt-6 font-medium text-[var(--ac)]">Thanks — you’re on the sample list.</p> : <form className="mt-6 flex gap-2" onSubmit={ev => { ev.preventDefault(); if (/\S+@\S+\.\S+/.test(e)) setD(true); }}><input value={e} onChange={x => setE(x.target.value)} type="email" placeholder="Email address" aria-label="Email address" className="h-12 flex-1 rounded-md border border-[var(--line)] bg-transparent px-4" /><Btn>Sign up</Btn></form>}
    </div></Section>
  );
}
function StoreFooter() {
  const { store, go } = useShop();
  return (
    <footer className="border-t border-[var(--line)] px-5 py-10 sm:px-10"><div className="grid gap-8 sm:grid-cols-4">
      <div className="sm:col-span-2"><p className="text-2xl">{store.brand}</p><p className="mt-2 max-w-xs text-sm opacity-70">{store.sub}</p></div>
      <div><p className="mb-2 text-sm font-semibold">Shop</p>{store.edits.map(e => <button key={e} onClick={() => go('shop')} className="block py-1 text-sm opacity-75 hover:opacity-100">{e}</button>)}</div>
      <div><p className="mb-2 text-sm font-semibold">Discover</p><button onClick={() => go('journal')} className="block py-1 text-sm opacity-75">Your shopping guide</button><button onClick={() => go('account')} className="block py-1 text-sm opacity-75">My account</button><button onClick={() => go('bag')} className="block py-1 text-sm opacity-75">Bag</button></div>
    </div><p className="mt-8 text-[11px] font-bold uppercase tracking-[.18em] opacity-50">Interactive design sample</p></footer>
  );
}

export function ShopPage({ initialEdit = 'All pieces' }: { initialEdit?: string }) {
  const { store } = useShop();
  const [edit, setEdit] = useState(initialEdit); const [sort, setSort] = useState('Featured');
  const ids = useMemo(() => {
    let a = store.products.map((_, i) => i);
    if (edit !== 'All pieces') { const k = store.edits.indexOf(edit); a = a.filter(i => i % 3 === k); }
    if (sort === 'Price: low to high') a.sort((x, y) => num(store.products[x].price) - num(store.products[y].price));
    if (sort === 'Price: high to low') a.sort((x, y) => num(store.products[y].price) - num(store.products[x].price));
    return a;
  }, [store, edit, sort]);
  return (
    <Section><H sub="Filter by edit or sort by price. Every piece can be added straight from the grid.">The collection</H>
      <div className="mb-6 flex flex-wrap items-center gap-2">{['All pieces', ...store.edits].map(e => <button key={e} onClick={() => setEdit(e)} aria-pressed={edit === e} className={`rounded-full border px-4 py-2 text-sm ${edit === e ? 'border-[var(--ac)] bg-[var(--ac)] text-[var(--acfg)]' : 'border-[var(--line)]'}`}>{e}</button>)}
        <select aria-label="Sort" value={sort} onChange={e => setSort(e.target.value)} className="ml-auto rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm">{['Featured', 'Price: low to high', 'Price: high to low'].map(s => <option key={s}>{s}</option>)}</select></div>
      {ids.length ? <Grid ids={ids} /> : <p className="opacity-70">No pieces in this edit.</p>}
    </Section>
  );
}
function ProductPage() {
  const { store, prod, im, price, add, wish, toggleWish } = useShop();
  const p = store.products[prod]; const [size, setSize] = useState('M'); const [qty, setQty] = useState(1);
  return (
    <Section><div className="grid gap-8 md:grid-cols-2">
      <img src={im(prod + 1, 1000)} alt={p.name} className="aspect-[4/5] w-full rounded-md object-cover" />
      <div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">{store.edits[prod % 3]}</p><h2 className="mt-2 text-4xl">{p.name}</h2><p className="mt-2 text-2xl">{price(num(p.price))}</p><p className="mt-4 max-w-md opacity-75">{store.sub}</p>
        <p className="mt-6 text-sm font-semibold">Option</p><div className="mt-2 flex gap-2">{['S', 'M', 'L', 'XL'].map(s => <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`h-11 w-11 rounded-md border text-sm ${size === s ? 'border-[var(--ac)] bg-[var(--ac)] text-[var(--acfg)]' : 'border-[var(--line)]'}`}>{s}</button>)}</div>
        <div className="mt-6 flex items-center gap-3"><div className="flex items-center rounded-md border border-[var(--line)]"><button aria-label="Less" className="p-3" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button><span className="w-6 text-center">{qty}</span><button aria-label="More" className="p-3" onClick={() => setQty(qty + 1)}><Plus size={14} /></button></div><Btn onClick={() => add(prod, size, qty)} className="flex-1">Add to bag</Btn><button aria-label="Save" onClick={() => toggleWish(prod)} className="flex h-12 w-12 items-center justify-center rounded-md border border-[var(--line)]"><Heart size={18} fill={wish.has(prod) ? '#e11d48' : 'none'} /></button></div>
      </div></div>
      <div className="mt-14"><H>You may also like</H><Grid ids={store.products.map((_, i) => i).filter(i => i !== prod).slice(0, 4)} /></div>
    </Section>
  );
}
function BagPage() {
  const { bag, store, im, price, remove, setQty, go } = useShop();
  const total = bag.reduce((a, b) => a + num(b.p.price) * b.qty, 0);
  const [done, setDone] = useState(false);
  if (done) return <Section><div className="mx-auto max-w-md text-center"><Check className="mx-auto text-[var(--ac)]" /><h2 className="mt-3 text-3xl">This is a sample checkout.</h2><p className="mt-2 opacity-75">Your real store would connect to Shopify checkout here. No order was placed.</p></div></Section>;
  return (
    <Section><H>Your bag</H>
      {!bag.length ? <div><p className="opacity-75">Your bag is empty.</p><Btn onClick={() => go('shop')} className="mt-4">Browse the collection</Btn></div> : (
        <div className="grid gap-8 md:grid-cols-[1fr_320px]"><ul className="divide-y divide-[var(--line)]">{bag.map((b, k) => <li key={k} className="flex gap-4 py-4"><img src={im(b.i + 1, 200)} alt="" className="h-24 w-20 rounded object-cover" /><div className="flex-1"><p>{b.p.name}</p><p className="text-sm opacity-70">{b.size ? `Option ${b.size} · ` : ''}{price(num(b.p.price))}</p><div className="mt-2 flex items-center gap-2"><button aria-label="Less" onClick={() => setQty(k, b.qty - 1)} className="rounded border border-[var(--line)] p-1.5"><Minus size={12} /></button><span className="w-5 text-center text-sm">{b.qty}</span><button aria-label="More" onClick={() => setQty(k, b.qty + 1)} className="rounded border border-[var(--line)] p-1.5"><Plus size={12} /></button></div></div><button aria-label="Remove" onClick={() => remove(k)}><X size={16} /></button></li>)}</ul>
          <div className="h-fit rounded-md bg-[var(--soft)] p-5"><div className="flex justify-between"><span>Subtotal</span><strong>{price(total)}</strong></div><p className="mt-1 text-xs opacity-70">{store.brand} sample bag · shipping calculated at checkout</p><Btn onClick={() => setDone(true)} className="mt-4 w-full">Checkout</Btn></div></div>)}
    </Section>
  );
}
function JournalPage() {
  const { store, im } = useShop();
  const posts = ['The details behind the everyday.', 'Your shopping guide', 'Discover your favourites'];
  return <Section><H sub={store.sub}>Journal</H><div className="grid gap-6 sm:grid-cols-3">{posts.map((t, i) => <article key={t}><img loading="lazy" src={im(i + 2, 700)} alt="" className="aspect-[4/3] w-full rounded-md object-cover" /><p className="mt-3 text-[11px] font-bold uppercase tracking-[.2em] text-[var(--ac)]">{store.edits[i]}</p><h3 className="mt-1 text-xl">{t}</h3></article>)}</div></Section>;
}
function AccountPage() {
  const [mode, setMode] = useState<'in' | 'order'>('in'); const [ok, setOk] = useState(false); const [n, setN] = useState('');
  return (
    <Section><div className="mx-auto max-w-md"><H>My account</H>
      <div className="mb-5 flex gap-2">{([['in', 'Sign in'], ['order', 'Track an order']] as const).map(([k, l]) => <button key={k} onClick={() => { setMode(k); setOk(false); }} aria-pressed={mode === k} className={`rounded-full border px-4 py-2 text-sm ${mode === k ? 'border-[var(--ac)] bg-[var(--ac)] text-[var(--acfg)]' : 'border-[var(--line)]'}`}>{l}</button>)}</div>
      {ok ? <p className="rounded-md bg-[var(--soft)] p-4">{mode === 'in' ? 'Signed in to the sample account.' : `Order ${n || '#1001'}: packed and on its way (sample).`}</p> : (
        <form className="grid gap-3" onSubmit={e => { e.preventDefault(); setOk(true); }}>
          {mode === 'in' ? <><input required type="email" placeholder="Email address" aria-label="Email" className="h-12 rounded-md border border-[var(--line)] bg-transparent px-4" /><input required type="password" placeholder="Password" aria-label="Password" className="h-12 rounded-md border border-[var(--line)] bg-transparent px-4" /></> : <input value={n} onChange={e => setN(e.target.value)} required placeholder="Order number, e.g. #1001" aria-label="Order number" className="h-12 rounded-md border border-[var(--line)] bg-transparent px-4" />}
          <Btn>{mode === 'in' ? 'Sign in' : 'Track order'}</Btn></form>)}
    </div></Section>
  );
}
