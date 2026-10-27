/** A paw print. */
export function Paw({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <ellipse cx="12" cy="16" rx="5" ry="4.2" />
      <ellipse cx="5.6" cy="10.6" rx="2" ry="2.6" />
      <ellipse cx="9.4" cy="6.6" rx="2" ry="2.8" />
      <ellipse cx="14.6" cy="6.6" rx="2" ry="2.8" />
      <ellipse cx="18.4" cy="10.6" rx="2" ry="2.6" />
    </svg>
  );
}
