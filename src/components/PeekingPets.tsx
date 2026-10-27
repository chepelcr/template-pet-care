/** A dog and a cat peeking over the hero's bottom edge, in line art. */
export function PeekingPets({ className = '' }: { className?: string }) {
  const line = { stroke: 'var(--pc-ink)', strokeWidth: 3.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <svg aria-hidden="true" viewBox="0 0 320 110" className={className}>
      {/* Dog: floppy ears, eyes, nose, two paws over the edge */}
      <path d="M40 110V70c0-24 18-40 42-40s42 16 42 40v40" style={{ ...line, fill: 'var(--pc-white)' }} />
      <path d="M48 46c-14 0-22 14-18 34 8-2 14-10 18-20" style={{ ...line, fill: 'var(--pc-kibble)' }} />
      <path d="M116 46c14 0 22 14 18 34-8-2-14-10-18-20" style={{ ...line, fill: 'var(--pc-kibble)' }} />
      <circle cx="68" cy="68" r="4" style={{ fill: 'var(--pc-ink)' }} />
      <circle cx="96" cy="68" r="4" style={{ fill: 'var(--pc-ink)' }} />
      <path d="M76 84c3 4 9 4 12 0l-6-5z" style={{ fill: 'var(--pc-ink)' }} />
      <path d="M50 110c0-8 6-12 14-12s14 4 14 12M86 110c0-8 6-12 14-12s14 4 14 12" style={{ ...line, fill: 'var(--pc-white)' }} />
      {/* Cat: pointed ears, eyes, whiskers */}
      <path d="M196 110V78c0-20 16-34 36-34s36 14 36 34v32" style={{ ...line, fill: 'var(--pc-silver-light)' }} />
      <path d="M202 62l-4-30 26 16M262 62l4-30-26 16" style={{ ...line, fill: 'var(--pc-silver-light)' }} />
      <path d="M218 78c2-3 6-3 8 0M238 78c2-3 6-3 8 0" style={line} />
      <path d="M229 88l3 3 3-3" style={line} />
      <path d="M208 90h-16M208 96h-14M256 90h16M256 96h14" style={{ ...line, strokeWidth: 2.5 }} />
    </svg>
  );
}
