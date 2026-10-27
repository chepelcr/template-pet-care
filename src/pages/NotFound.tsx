import { Link } from 'wouter';
import { usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { PeekingPets } from '@/components/PeekingPets';

export default function NotFound() {
  const { t } = useI18n();
  usePageMeta(t('notFound.title'));
  return (
    <div className="page pt-14">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[color:var(--pc-apricot)] px-8 pb-36 pt-12 text-[color:var(--pc-ink)] md:px-14">
        <h1 className="max-w-xl text-[clamp(2.5rem,6.5vw,4.25rem)]">{t('notFound.title')}</h1>
        <p className="mt-4 max-w-md text-lg font-medium">{t('notFound.body')}</p>
        <Link href="/" className="btn btn-strong mt-7">
          {t('notFound.cta')}
        </Link>
        <PeekingPets className="pointer-events-none absolute bottom-0 right-6 w-[min(18rem,70vw)]" />
      </div>
    </div>
  );
}
