import * as Dialog from '@radix-ui/react-dialog';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart, useCartTotals, useIsDemo, useStore } from '@/core';
import { useI18n } from '@/i18n';
import { BASKET_EVENT } from './AddToCart';
import { Paw } from './Paw';

export const NAV = [
  { href: '/', key: 'nav.home' },
  { href: '/products', key: 'nav.catalog' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export function useIsActive() {
  const [location] = useLocation();
  return (href: string) => (href === '/' ? location === '/' : location === href || location.startsWith(`${href}/`));
}

function StoreMark() {
  const { organization, theme } = useStore();
  const logo = theme?.logoUrl ?? organization?.logoUrl ?? null;
  if (!organization) return <span aria-hidden="true" className="skeleton block h-8 w-40" />;
  return (
    <span className="flex items-center gap-2.5">
      {logo ? (
        <img src={logo} alt="" className="h-10 w-10 rounded-full object-cover" />
      ) : (
        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--pc-apricot)]">
          <Paw className="h-6 w-6" />
        </span>
      )}
      <span className="font-display text-xl font-extrabold leading-none sm:text-2xl">{organization.name}</span>
    </span>
  );
}

export function Header() {
  const { t, plural } = useI18n();
  const isDemo = useIsDemo();
  const { count } = useCartTotals();
  const openCart = useCart((s) => s.open);
  const isActive = useIsActive();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adds, setAdds] = useState(0);

  useEffect(() => {
    const onAdded = () => setAdds((n) => n + 1);
    window.addEventListener(BASKET_EVENT, onAdded);
    return () => window.removeEventListener(BASKET_EVENT, onAdded);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className="relative z-30 bg-surface-raised shadow-[0_1px_0_var(--rule)]">
      {isDemo && <p className="bg-[color:var(--pc-apricot-soft)] px-4 py-1.5 text-center text-sm font-semibold text-[color:var(--pc-ink)]">{t('demo.notice')}</p>}
      <div className="page flex h-16 items-center gap-3 sm:h-[4.5rem]">
        <Link href="/" className="rounded-full py-1 pr-2 text-heading">
          <StoreMark />
        </Link>

        <nav aria-label={t('nav.primary')} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className="flex min-h-tap items-center rounded-full px-4 font-bold text-ink-soft transition-colors hover:bg-surface hover:text-heading aria-[current=page]:bg-[color:var(--pc-teal-soft)] aria-[current=page]:text-[color:var(--pc-teal)]"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative ml-auto md:ml-4">
          {adds > 0 && (
            <span key={adds} aria-hidden="true" className="pointer-events-none absolute -left-16 top-1/2 flex -translate-y-1/2 gap-1 text-[color:var(--pc-kibble)]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="paw-step" style={{ animationDelay: `${i * 140}ms`, transform: `rotate(${i % 2 ? 12 : -12}deg) translateY(${i % 2 ? -5 : 4}px)` }}>
                  <Paw className="h-4 w-4 rotate-90" />
                </span>
              ))}
            </span>
          )}
          <button type="button" onClick={openCart} className="btn btn-accent gap-2.5 pl-4 pr-2">
            <ShoppingBag aria-hidden="true" className="h-5 w-5" />
            <span className="hidden sm:inline">{t('nav.cart')}</span>
            <span aria-hidden="true" className="grid h-7 min-w-[1.75rem] place-items-center rounded-full bg-[color:var(--pc-apricot)] px-1.5 text-sm font-extrabold tabular-nums text-[color:var(--pc-ink)]">
              {count}
            </span>
            <span className="sr-only">{plural('nav.cart.count', count)}</span>
          </button>
        </div>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="icon-btn text-heading hover:bg-surface md:hidden" aria-label={t('nav.menu')}>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="overlay fixed inset-0 z-40 bg-[color:var(--scrim)]" />
            <Dialog.Content className="sheet fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] bg-surface-raised px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-2xl text-heading">{t('nav.menu')}</Dialog.Title>
                <Dialog.Description className="sr-only">{t('nav.primary')}</Dialog.Description>
                <Dialog.Close className="icon-btn -mr-2 text-heading hover:bg-surface" aria-label={t('nav.close')}>
                  <X aria-hidden="true" className="h-6 w-6" />
                </Dialog.Close>
              </div>
              <nav aria-label={t('nav.primary')} className="mt-3">
                <ul className="flex flex-col gap-1.5">
                  {NAV.map(({ href, key }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className="flex min-h-[3.25rem] items-center gap-3 rounded-2xl px-4 font-display text-xl font-bold text-heading aria-[current=page]:bg-[color:var(--pc-teal-soft)] aria-[current=page]:text-[color:var(--pc-teal)]"
                      >
                        {isActive(href) && <Paw className="h-5 w-5" />}
                        {t(key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
