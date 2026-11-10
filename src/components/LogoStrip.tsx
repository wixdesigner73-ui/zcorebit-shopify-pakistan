import { asset } from '../lib/config';

// Zcorebit client logos (from zcorebit.com/clients).
const logos: [string, string][] = [
  ['The Purify Shop', 'the-purify-shop'], ['Noreen Textile', 'noreen-textile'], ['ProbFix', 'probfix'],
  ['Client logo', 'client-heart'], ['Auto Zone', 'auto-zone'], ["Granni's Kitchen", 'grannis-kitchen'],
];

export default function LogoStrip() {
  return (
    <section aria-label="Trusted by 700+ clients" className="border-b border-border bg-white">
      <ul className="mx-auto grid max-w-[1296px] grid-cols-3 items-center justify-items-center gap-x-6 gap-y-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:grid-cols-6">
        {logos.map(([alt, f]) => (
          <li key={f} className="flex h-12 w-full min-w-0 items-center justify-center">
            <img src={asset(`clients/${f}.png`)} alt={alt} loading="lazy" decoding="async" className="max-h-10 w-auto max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 md:max-h-11" />
          </li>
        ))}
      </ul>
    </section>
  );
}
