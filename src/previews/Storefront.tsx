import { memo, type RefObject } from 'react';
import { Shop, makeTheme, type Design, type PStore } from './kit';
import { ProductHome, isDarkProduct, productVariant } from './ProductHomes';
import { ServiceShop, serviceTheme, serviceVariant, type SStore } from './ServiceStore';

export type CatalogCat = { name: string; id: string; designs: Design[]; store: PStore & SStore };
export type Kind = 'product' | 'service';

/** Renders one design's working sample storefront for a category. */
export const Storefront = memo(function Storefront({ kind, cat, design, seed, scrollEl }: { kind: Kind; cat: CatalogCat; design: Design; seed: number; scrollEl?: RefObject<HTMLDivElement> }) {
  if (kind === 'product') {
    const v = productVariant(design.title);
    return <Shop store={cat.store} theme={makeTheme(seed, isDarkProduct(v))} home={<ProductHome variant={v} />} scrollEl={scrollEl} />;
  }
  const v = serviceVariant(design.title);
  return <ServiceShop s={cat.store} theme={serviceTheme(seed, v)} variant={v} scrollEl={scrollEl} />;
});
