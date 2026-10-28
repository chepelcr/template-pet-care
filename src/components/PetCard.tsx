import { useState } from 'react';
import { Link } from 'wouter';
import { formatPrice, isPurchasable, type CatalogCategory, type CatalogItem } from '@/core';
import { useI18n } from '@/i18n';
import { AddToCart } from './AddToCart';
import { Availability } from './Availability';
import { BoneTag } from './BoneTag';
import { Placeholder } from './Placeholder';
import { StoreImage } from './StoreImage';

/** A product or care service: a soft card, its photo, and the price on an ID tag that jingles. */
export function PetCard({ item, category, sizes = '(min-width: 1024px) 17rem, (min-width: 640px) 30vw, 46vw', headingLevel = 'h3' }: { item: CatalogItem; category?: CatalogCategory; sizes?: string; headingLevel?: 'h2' | 'h3' }) {
  const { t } = useI18n();
  const [jingle, setJingle] = useState(0);
  const Heading = headingLevel;
  return (
    <article className="card group relative flex h-full flex-col p-2.5 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[color:var(--focus)]">
      <div className={`relative aspect-square overflow-hidden rounded-[1.375rem] bg-surface-quiet ${isPurchasable(item) ? '' : 'grayscale'}`}>
        <StoreImage src={item.imageUrl} alt="" sizes={sizes} maxWidth={720} fallback={<Placeholder />} />
        {item.kind === 'service' && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[color:var(--pc-apricot)] px-2.5 py-1 text-xs font-extrabold text-[color:var(--pc-ink)]">{t('product.service')}</span>
        )}
      </div>
      <BoneTag price={item.price} jingle={jingle} className="pointer-events-none absolute right-3 top-0" />
      <div className="flex flex-1 flex-col gap-1 px-2 pb-1.5 pt-3">
        {category && <p className="text-sm font-bold text-[color:var(--category-text)]">{category.name}</p>}
        <Heading className="text-lg leading-snug text-heading">
          <Link href={`/products/${item.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline">
            {item.name}
          </Link>
        </Heading>
        {item.duration && <p className="text-sm text-ink-soft">{t('product.duration', { duration: item.duration })}</p>}
        <p className="mt-auto pt-1 text-sm">
          <span className="sr-only">{formatPrice(item.price)}</span>
          {item.compareAtPrice !== null && (
            <>
              <span className="sr-only">{t('product.before', { price: formatPrice(item.compareAtPrice) })}</span>
              <s aria-hidden="true" className="font-semibold text-offer">
                {formatPrice(item.compareAtPrice)}
              </s>
            </>
          )}
          {item.percentOff !== null && <span className="ml-2 rounded-full bg-offer px-2 py-0.5 text-xs font-bold text-[color:var(--offer-ink)]">{t('product.percentOff', { percent: item.percentOff })}</span>}
        </p>
        <div className="flex flex-wrap gap-x-3">
          <Availability item={item} showDuration={false} />
        </div>
        <div className="relative z-10 pt-2">
          <AddToCart item={item} variant="compact" tone="quiet" className="w-full" onAdded={() => setJingle((n) => n + 1)} />
        </div>
      </div>
    </article>
  );
}

export function PetCardSkeleton() {
  return (
    <div aria-hidden="true" className="card flex flex-col p-2.5">
      <div className="skeleton aspect-square rounded-[1.375rem]" />
      <div className="flex flex-col gap-2 px-2 pt-3">
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-6 w-1/2" />
      </div>
    </div>
  );
}
