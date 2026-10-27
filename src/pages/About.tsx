import { aboutContent, paragraphs, useCmsPage, usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { CmsIcon } from '@/components/CmsIcon';
import { PeekingPets } from '@/components/PeekingPets';
import { Placeholder } from '@/components/Placeholder';
import { SectionError } from '@/components/StoreStates';
import { StoreImage } from '@/components/StoreImage';

export default function About() {
  const { t } = useI18n();
  const cms = useCmsPage('about');
  const about = aboutContent(cms.page);
  usePageMeta(cms.page?.title ?? t('nav.about'), cms.page?.metaDescription);
  const story = paragraphs(about.story.content);

  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--pc-apricot)] text-[color:var(--pc-ink)]">
        <div className="page grid items-center gap-x-8 gap-y-10 pb-28 pt-10 md:grid-cols-12 md:pt-14">
          <div className={about.hero.image ? 'md:col-span-7' : 'md:col-span-10'}>
            {cms.isLoading ? (
              <div aria-hidden="true" className="flex flex-col gap-3">
                <div className="skeleton-deep h-14 w-64" />
                <div className="skeleton-deep h-5 w-80 max-w-full" />
              </div>
            ) : cms.isError ? (
              <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
            ) : (
              <>
                <h1 className="text-[clamp(2.6rem,7vw,4.75rem)]">{about.hero.title ?? t('nav.about')}</h1>
                {about.hero.subtitle && <p className="mt-5 max-w-xl text-lg font-medium">{about.hero.subtitle}</p>}
              </>
            )}
          </div>
          {about.hero.image && (
            <div className="md:col-span-5">
              <div className="mx-auto aspect-square w-[min(22rem,76vw)] overflow-hidden rounded-[52%_48%_46%_54%/46%_54%_48%_52%] border-[6px] border-[color:var(--pc-white)] bg-[color:var(--pc-teal-soft)] shadow-lift">
                <StoreImage src={about.hero.image} alt="" priority sizes="(min-width: 768px) 22rem, 76vw" maxWidth={900} fallback={<Placeholder />} />
              </div>
            </div>
          )}
        </div>
        <PeekingPets className="pointer-events-none absolute bottom-0 left-1/2 w-[min(20rem,76vw)] -translate-x-1/2 md:left-[28%]" />
      </section>

      <div className="page">
        {(about.story.title || story.length > 0) && (
          <section className="grid gap-10 pt-16 md:grid-cols-12 md:items-center">
            <div className={about.story.image ? 'md:col-span-7' : 'md:col-span-9'}>
              {about.story.title && <h2 className="text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">{about.story.title}</h2>}
              <div className="mt-4 flex max-w-[62ch] flex-col gap-3 text-lg text-ink-soft">
                {story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            {about.story.image && (
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem_2.5rem_0.75rem_2.5rem] bg-surface-quiet shadow-soft md:col-span-5">
                <StoreImage src={about.story.image} alt="" sizes="(min-width: 768px) 35vw, 100vw" maxWidth={960} fallback={<Placeholder />} />
              </div>
            )}
          </section>
        )}

        {about.values.items.length > 0 && (
          <section className="pt-16">
            {about.values.title && <h2 className="mb-6 text-[clamp(2.1rem,4.5vw,3.25rem)] text-heading">{about.values.title}</h2>}
            <ul className="grid gap-4 md:grid-cols-3">
              {about.values.items.map((value) => (
                <li key={value.title} className="card flex flex-col gap-3 p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--pc-teal-soft)] text-[color:var(--pc-teal)]">
                    <CmsIcon icon={value.icon} className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="text-xl text-heading">{value.title}</h3>
                  {value.description && <p className="text-ink-soft">{value.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
