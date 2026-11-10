import { memo, type RefObject } from 'react';
import { Shop, makeTheme, type Design, type PStore } from './kit';
import { PRODUCT_LOOK, ProductHome, isDarkProduct, productVariant } from './ProductHomes';
import { ServiceShop, serviceTheme, serviceVariant, type SStore } from './ServiceStore';

export type CatalogCat = { name: string; id: string; designs: Design[]; store: PStore & SStore };
export type Kind = 'product' | 'service';

/** Renders one design's working sample storefront for a category. */
export const Storefront = memo(function Storefront({ kind, cat, design, seed, scrollEl }: { kind: Kind; cat: CatalogCat; design: Design; seed: number; scrollEl?: RefObject<HTMLDivElement> }) {
  if (kind === 'product') {
    const v = productVariant(design.title);
    const L = PRODUCT_LOOK[v];
    const idx = Math.max(0, cat.designs.findIndex(d => d.title === design.title));
    return <Shop store={cat.store} theme={makeTheme(seed + idx, isDarkProduct(v), L.tone, L.serif)} offset={L.offset} home={<ProductHome variant={v} />} scrollEl={scrollEl} />;
  }
  const v = serviceVariant(design.title);
  const idx = Math.max(0, cat.designs.findIndex(d => d.title === design.title));
  return <ServiceShop s={cat.store} theme={serviceTheme(seed + idx, v, idx)} variant={v} idx={idx} scrollEl={scrollEl} />;
});
