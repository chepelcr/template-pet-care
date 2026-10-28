import { Link } from 'wouter';
import { catalogHref, parseHex, type CatalogCategory } from '@/core';
import { useI18n } from '@/i18n';
import { StoreImage } from './StoreImage';

// Ring colours, only for categories the store left without a valid colour.
const ROTATION = ['#F4A04B', '#0E5A5C', '#8A5A3B', '#C9CED3'];

/** A category as a round photo in a ring of its own colour, with its name and count. */
export function Bubble({ category, count, index }: { category: CatalogCategory; count: number; index: number }) {
  const { plural } = useI18n();
  const ring = (parseHex(category.backgroundColor) ? category.backgroundColor : null) ?? ROTATION[index % ROTATION.length];
  return (
    <Link href={catalogHref({ category: category.key })} className="group flex w-28 flex-col items-center gap-2 text-center sm:w-32">
      <span className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-full p-1.5 transition-transform group-hover:-translate-y-1 sm:h-32 sm:w-32" style={{ background: ring }}>
        <span className="relative block h-full w-full overflow-hidden rounded-full border-4 border-[color:var(--pc-white)] bg-surface-quiet">
          <StoreImage
            src={category.imageUrl}
            alt=""
            sizes="8rem"
            maxWidth={400}
            fallback={<span className="grid h-full w-full place-items-center font-display text-4xl font-extrabold text-heading">{category.name.slice(0, 1)}</span>}
          />
        </span>
      </span>
      <span className="font-display text-lg font-bold leading-tight text-heading group-hover:underline">{category.name}</span>
      <span className="-mt-1.5 text-sm text-ink-soft">{plural('category.count', count)}</span>
    </Link>
  );
}
