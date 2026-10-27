import { Link } from 'wouter';
import { categoriesWithItems, facetsFor, featuredItems, homeContent, paragraphs, useCatalog, useCmsPage, usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { Bubble } from '@/components/Bubble';
import { CmsIcon } from '@/components/CmsIcon';
import { PeekingPets } from '@/components/PeekingPets';
import { PetCard, PetCardSkeleton } from '@/components/PetCard';
import { Placeholder } from '@/components/Placeholder';
import { SectionError } from '@/components/StoreStates';
import { StoreImage } from '@/components/StoreImage';

export default function Home() {
  const { t } = useI18n();
  const cms = useCmsPage('home');
  const home = homeContent(cms.page);
  const catalog = useCatalog();
  usePageMeta(cms.page?.title, cms.page?.metaDescription);

  const featured = featuredItems(catalog.items, 8);
  const bubbles = categoriesWithItems(catalog.categories, catalog.items);
  const counts = facetsFor(catalog.items).categories;
  const categoryOf = (id: string | null) => catalog.categories.find((c) => c.id === id);
  const story = paragraphs(home.story.content);

  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--pc-apricot)] text-[color:var(--pc-ink)]">
        <div className="page grid items-center gap-x-8 gap-y-10 pb-28 pt-10 md:grid-cols-12 md:pb-32 md:pt-14">
          <div className={home.hero.image ? 'md:col-span-7' : 'md:col-span-10'}>
            {cms.isLoading ? (
              <div aria-hidden="true" className="flex flex-col gap-4">
                <div className="skeleton-deep h-8 w-44" />
                <div className="skeleton-deep h-16 w-full" />
                <div className="skeleton-deep h-5 w-3/4" />
              </div>
            ) : cms.isError ? (
              <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
            ) : (
              <>
                {home.hero.badge && <p className="mb-5 inline-flex rounded-full bg-[color:var(--pc-white)] px-4 py-1.5 font-bold text-[color:var(--pc-teal)]">{home.hero.badge}</p>}
                {home.hero.title && <h1 className="text-[clamp(2.6rem,6.5vw,5rem)]">{home.hero.title}</h1>}
                {home.hero.subtitle && <p className="mt-5 max-w-[34rem] text-lg font-medium">{home.hero.subtitle}</p>}
                <div className="mt-8 flex flex-wrap gap-3">
                  {home.hero.ctaPrimary && (
                    <Link href="/products" className="btn btn-accent">
                      {home.hero.ctaPrimary}
                    </Link>
                  )}
                  {home.hero.ctaSecondary && (
                    <Link href="/contact" className="btn btn-strong">
                      {home.hero.ctaSecondary}
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
          {home.hero.image && (
            <div className="md:col-span-5">
              <div className="mx-auto aspect-square w-[min(24rem,80vw)] overflow-hidden rounded-[46%_54%_52%_48%/48%_46%_54%_52%] border-[6px] border-[color:var(--pc-white)] bg-[color:var(--pc-teal-soft)] shadow-lift">
                <StoreImage src={home.hero.image} alt="" priority sizes="(min-width: 768px) 24rem, 80vw" maxWidth={900} fallback={<Placeholder />} />
              </div>
            </div>
          )}
        </div>
        <PeekingPets className="pointer-events-none absolute bottom-0 left-1/2 w-[min(22rem,80vw)] -translate-x-1/2 md:left-[30%]" />
      </section>

      {(bubbles.length > 0 || catalog.isLoading) && (
        <section aria-labelledby={home.categories.title ? 'home-bubbles' : undefined} className="page pt-14">
          {(home.categories.title || home.categories.subtitle) && (
            <div className="mb-7 text-center">
              {home.categories.title && (
                <h2 id="home-bubbles" className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">
                  {home.categories.title}
                </h2>
              )}
              {home.categories.subtitle && <p className="mt-2 text-lg text-ink-soft">{home.categories.subtitle}</p>}
            </div>
          )}
          {catalog.isLoading ? (
            <div aria-hidden="true" className="flex justify-center gap-5">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="skeleton aspect-square w-28 rounded-full sm:w-32" />
              ))}
            </div>
          ) : (
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-7 sm:gap-x-8">
              {bubbles.map((category, index) => (
                <li key={category.id}>
                  <Bubble category={category} count={counts.get(category.id) ?? 0} index={index} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section aria-labelledby={home.featured.title ? 'home-new' : undefined} className="page pt-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {home.featured.badge && <p className="mb-2 font-bold text-accent-text">{home.featured.badge}</p>}
            {home.featured.title && (
              <h2 id="home-new" className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">
                {home.featured.title}
              </h2>
            )}
            {home.featured.subtitle && <p className="mt-2 text-lg text-ink-soft">{home.featured.subtitle}</p>}
          </div>
          {catalog.items.length > 0 && (
            <Link href="/products" className="btn btn-quiet">
              {t('catalog.viewAll')}
            </Link>
          )}
        </div>
        {catalog.isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <PetCardSkeleton key={i} />
            ))}
          </div>
        ) : catalog.isError ? (
          <SectionError title={t('catalog.error.title')} onRetry={catalog.refetch} />
        ) : featured.length === 0 ? (
          <p className="card p-6 text-ink-soft">{t('catalog.empty.store')}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((item) => (
              <li key={item.id}>
                <PetCard item={item} category={categoryOf(item.categoryId)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {home.benefits.length > 0 && (
        <section className="page pt-16">
          <ul className="grid gap-4 md:grid-cols-3">
            {home.benefits.map((benefit) => (
              <li key={benefit.title} className="card flex gap-4 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[color:var(--pc-teal-soft)] text-[color:var(--pc-teal)]">
                  <CmsIcon icon={benefit.icon} className="h-6 w-6" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-xl text-heading">{benefit.title}</h3>
                  {benefit.description && <p className="mt-1 text-ink-soft">{benefit.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(home.story.title || story.length > 0) && (
        <section className="page pt-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
            {home.story.image && (
              <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_0.75rem] bg-surface-quiet shadow-soft md:col-span-6">
                <StoreImage src={home.story.image} alt="" sizes="(min-width: 768px) 45vw, 100vw" maxWidth={1280} fallback={<Placeholder />} />
              </div>
            )}
            <div className={home.story.image ? 'md:col-span-6' : 'md:col-span-9'}>
              {home.story.title && <h2 className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">{home.story.title}</h2>}
              <div className="mt-4 flex max-w-[60ch] flex-col gap-3 text-lg text-ink-soft">
                {story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link href="/about" className="btn btn-quiet mt-7">
                {t('nav.about')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {(home.cta.title || home.cta.description) && (
        <section className="page pt-20">
          <div className="on-deep flex flex-col gap-6 rounded-[2.5rem] bg-surface-deep p-8 text-ink-on-deep md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              {home.cta.title && <h2 className="text-[clamp(2rem,4vw,2.75rem)]">{home.cta.title}</h2>}
              {home.cta.description && <p className="mt-2 text-lg text-ink-on-deep-soft">{home.cta.description}</p>}
            </div>
            {home.cta.buttonText && (
              <Link href="/contact" className="btn btn-apricot shrink-0">
                {home.cta.buttonText}
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}
