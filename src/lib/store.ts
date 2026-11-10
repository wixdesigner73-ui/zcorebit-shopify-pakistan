import { useSyncExternalStore } from 'react';

// Tiny shared state: selected package + design reference flow into the lead form.
type S = { pkg: string; design: string; offer: string };
let s: S = { pkg: 'Help me choose', design: '', offer: 'Products' };
const subs = new Set<() => void>();
export const setSel = (p: Partial<S>) => { s = { ...s, ...p }; subs.forEach(f => f()); };
export const useSel = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f); }; }, () => s);

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });

/** Ref callback that fades an element in once when it enters the viewport. */
export const reveal = (el: HTMLElement | null) => {
  if (!el) return;
  const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
  io.observe(el);
};
