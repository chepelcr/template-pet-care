import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { catalogHref, paragraphs, usePageMeta, useProductView } from '@/core';
import { useI18n } from '@/i18n';
import { AddToCart } from '@/components/AddToCart';
import { BoneTag } from '@/components/BoneTag';
import { PetCard } from '@/components/PetCard';
import { Placeholder } from '@/components/Placeholder';
import { Price } from '@/components/Price';
import { QuantityStepper } from '@/components/QuantityStepper';
import { StoreImage } from '@/components/StoreImage';
import { SectionError } from '@/components/StoreStates';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t, plural } = useI18n();
  const { item, catalog, category, related, max, quantity, setQuantity } = useProductView(id);
  const [jingle, setJingle] = useState(0);
  usePageMeta(item?.name, item?.description);

  if (catalog.isLoading) {
    return (
      <div aria-hidden="true" className="page grid gap-10 pt-10 md:grid-cols-12">
        <div className="skeleton aspect-square rounded-[2rem] md:col-span-6" />
        <div className="flex flex-col gap-4 md:col-span-6">
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-14 w-3/4" />
          <div className="skeleton h-9 w-36" />
          <div className="skeleton h-40 w-full" />
        </div>
      </div>
    );
  }

  if (catalog.isError) {
    return (
      <div className="page pt-16">
        <SectionError title={t('catalog.error.title')} onRetry={catalog.refetch} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page pt-16">
        <div className="card flex flex-col items-start gap-4 p-8 md:p-10">
          <h1 className="text-[clamp(2.2rem,5vw,3.25rem)] text-heading">{t('product.notFound.title')}</h1>
          <p className="max-w-xl text-lg text-ink-soft">{t('product.notFound.body')}</p>
          <Link href="/products" className="btn btn-strong">
            {t('product.back')}
          </Link>
        </div>
      </div>
    );
  }

  const text = paragraphs(item.description);
  const stock = item.availability;
  const stockText =
    stock.state === 'sold_out'
      ? t('product.soldOut')
      : stock.state === 'low'
        ? plural('product.low', stock.quantity)
        : stock.state === 'in_stock'
          ? t('product.spec.inStock')
          : null;
  const facts = [
    category && { label: t('product.spec.category'), value: category.name },
    item.kind === 'service' && { label: t('product.spec.type'), value: t('product.service') },
    item.duration && { label: t('product.spec.duration'), value: item.duration },
    item.difficulty && { label: t('product.spec.level'), value: item.difficulty },
    stockText && { label: t('product.spec.availability'), value: stockText, alert: stock.state !== 'in_stock' },
  ].filter(Boolean) as Array<{ label: string; value: string; alert?: boolean }>;

  return (
    <>
      <div className="page pt-6">
        <Link href={category ? catalogHref({ category: category.key }) : '/products'} className="inline-flex min-h-tap items-center gap-2 font-bold text-heading hover:underline">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {category ? category.name : t('product.back')}
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="relative md:col-span-6">
            <div className="aspect-square overflow-hidden rounded-[2rem] border-[6px] border-[color:var(--pc-white)] bg-surface-quiet shadow-lift">
              <StoreImage src={item.imageUrl} alt={item.name} priority sizes="(min-width: 768px) 36rem, 100vw" maxWidth={1200} fallback={<Placeholder label={t('product.imageMissing')} />} />
            </div>
            <BoneTag price={item.price} jingle={jingle} size="lg" className="pointer-events-none absolute -top-3 right-6" />
          </div>

          <div className="flex flex-col gap-5 md:col-span-6 md:pt-4">
            <h1 className="text-[clamp(2.3rem,5vw,3.75rem)] text-heading">{item.name}</h1>
            <Price item={item} size="lg" />
            {text.length > 0 && (
              <div className="flex max-w-[60ch] flex-col gap-3 text-lg text-ink-soft">
                {text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}

            {facts.length > 0 && (
              <dl className="card grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 p-5">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-sm text-ink-soft">{fact.label}</dt>
                    <dd className={`font-display text-lg font-bold ${fact.alert ? 'text-offer' : 'text-heading'}`}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {item.availability.state !== 'sold_out' && <QuantityStepper value={quantity} max={max} onChange={setQuantity} label={item.name} />}
              <AddToCart item={item} quantity={quantity} onAdded={() => setJingle((n) => n + 1)} />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="page pt-20">
          <h2 id="related" className="mb-6 text-[clamp(1.9rem,4vw,2.6rem)] text-heading">
            {t('product.related')}
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.id}>
                <PetCard item={r} category={catalog.categories.find((c) => c.id === r.categoryId)} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
