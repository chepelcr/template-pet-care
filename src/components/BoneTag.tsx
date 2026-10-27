import { useId } from 'react';
import { formatPrice } from '@/core';

/**
 * The price engraved on a bone-shaped ID tag hanging from its ring.
 * Decorative (callers also give the price as text); `jingle` changes when
 * the item is added, so the tag swings again.
 */
export function BoneTag({ price, jingle = 0, size = 'md', className = '' }: { price: number; jingle?: number; size?: 'md' | 'lg'; className?: string }) {
  const metal = `metal-${useId().replace(/:/g, '')}`;
  const text = formatPrice(price);
  const big = size === 'lg';
  return (
    <span aria-hidden="true" className={`inline-block ${className}`}>
      <span key={jingle} data-jingle={jingle ? '' : undefined} className={`tag-swing relative block ${big ? 'w-[9.5rem]' : 'w-[6.75rem]'}`}>
        <svg viewBox="0 0 120 60" className="block h-auto w-full drop-shadow-[0_3px_3px_rgb(31_42_43/0.28)]">
          <defs>
            <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F3F5F7" />
              <stop offset="0.55" stopColor="#C9CED3" />
              <stop offset="1" stopColor="#AEB6BD" />
            </linearGradient>
          </defs>
          <path
            d="M24 14a10 10 0 1 0-6 18 10 10 0 1 0 6 18c6 0 10-4 12-8h48c2 4 6 8 12 8a10 10 0 1 0 6-18 10 10 0 1 0-6-18c-6 0-10 4-12 8H36c-2-4-6-8-12-8Z"
            fill={`url(#${metal})`}
            strokeWidth="1.5"
            style={{ stroke: 'var(--tag-edge)' }}
          />
          <circle cx="60" cy="25.5" r="2.4" fill="#8D959C" />
          <circle cx="60" cy="16" r="7" fill="none" strokeWidth="2.6" style={{ stroke: 'var(--tag-edge)' }} />
        </svg>
        <span className={`engraved absolute inset-x-0 top-[53.5%] -translate-y-1/2 text-center font-display font-extrabold tabular-nums leading-none ${big ? 'text-xl' : text.length > 8 ? 'text-[0.8rem]' : 'text-[0.95rem]'}`}>
          {text}
        </span>
      </span>
    </span>
  );
}
