import { ProductFallbackIcon } from './CmsIcon';

/** Identity placeholder: soft teal with a trail of paw prints and the store's fallback icon. */
export function Placeholder({ label, tone = 'light' }: { label?: string; tone?: 'light' | 'deep' }) {
  const deep = tone === 'deep';
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${deep ? 'bg-surface-deep-raised text-ink-on-deep-soft' : 'bg-[color:var(--pc-teal-soft)] text-[color:var(--pc-teal)]'}`}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-20" fill="currentColor">
        {[
          [18, 80, -20],
          [34, 64, 10],
          [62, 34, -20],
          [80, 18, 10],
        ].map(([x, y, r]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <ellipse cx="0" cy="3" rx="4" ry="3.4" />
            <ellipse cx="-4.6" cy="-1.6" rx="1.4" ry="1.9" />
            <ellipse cx="-1.6" cy="-4.4" rx="1.4" ry="2" />
            <ellipse cx="1.6" cy="-4.4" rx="1.4" ry="2" />
            <ellipse cx="4.6" cy="-1.6" rx="1.4" ry="1.9" />
          </g>
        ))}
      </svg>
      <ProductFallbackIcon className="relative h-10 w-10" strokeWidth={1.6} />
    </div>
  );
}
