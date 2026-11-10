import { asset } from '../lib/config';

const logos: [string, string, number, number][] = [
  ['Fred Meyer', 'trustbar-client-img-01.webp', 147, 40], ['Hofmann', 'trustbar-client-img-02.webp', 134, 40],
  ['Coca-Cola', 'trustbar-client-img-03.webp', 113, 37], ['Time', 'trustbar-client-img-04.webp', 104, 45],
  ['Wawa', 'trustbar-client-img-05.webp', 113, 49], ['Heavenly', 'trustbar-client-img-06.webp', 133, 46],
];

export default function LogoStrip() {
  return (
    <section aria-label="Brands we have worked with" className="border-b border-border bg-white">
      <ul className="mx-auto grid max-w-[1296px] grid-cols-3 items-center justify-items-center gap-x-4 gap-y-6 px-4 py-8 sm:px-6 lg:grid-cols-6">
        {logos.map(([alt, f, w, h]) => (
          <li key={alt} className="flex h-12 min-w-0 w-full items-center justify-center">
            <img src={asset(`assets/${f}`)} width={w} height={h} alt={alt} loading="lazy" className="h-auto max-h-12 w-auto max-w-[min(100%,140px)] object-contain" />
          </li>
        ))}
      </ul>
    </section>
  );
}
