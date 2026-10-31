import * as Dialog from '@radix-ui/react-dialog';
import { Menu, ShoppingBag, X, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart, useCartTotals, useIsDemo, useStore, useStoreName, useAccountLinks } from '@/core';
import { useI18n } from '@/i18n';
import { BASKET_EVENT } from './AddToCart';
import { ThemeToggle } from './ThemeToggle';
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
  const name = useStoreName();
  const logo = theme?.logoUrl ?? organization?.logoUrl ?? null;
  if (!name) return <span aria-hidden="true" className="skeleton block h-8 w-24 max-w-full" />;
  return (
    <span className="flex w-full min-w-0 items-center gap-2">
      {logo ? (
        <img src={logo} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-10 sm:w-10" />
      ) : (
        <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--pc-apricot)] sm:h-10 sm:w-10">
          <Paw className="h-6 w-6" />
        </span>
      )}
      <span className="font-display font-extrabold sm:text-2xl min-w-0 flex-1 break-words [overflow-wrap:anywhere] text-base leading-tight">{name}</span>
    </span>
  );
}

export function Header() {
  const { t, plural } = useI18n();
  const name = useStoreName();
  const isDemo = useIsDemo();
  const { count } = useCartTotals();
  const openCart = useCart((s) => s.open);
  const isActive = useIsActive();
  // Barter and the account live in the store's own menus, not in a bar of their own.
  const { barter, account } = useAccountLinks(t);
  const navLinks = [...NAV, barter];
  const menuLinks = [...navLinks, account];
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [adds, setAdds] = useState(0);

  useEffect(() => {
    const onAdded = () => setAdds((n) => n + 1);
    window.addEventListener(BASKET_EVENT, onAdded);
    return () => window.removeEventListener(BASKET_EVENT, onAdded);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header ref={headerRef} className="relative z-30 bg-surface-raised shadow-[0_1px_0_var(--rule)]">
      {isDemo && <p className="bg-[color:var(--pc-apricot-soft)] px-4 py-1.5 text-center text-sm font-semibold text-[color:var(--pc-ink)]">{t('demo.notice')}</p>}
      <div className="page flex min-h-14 items-center gap-2 sm:min-h-16 py-1">
        <Link href="/" title={name || undefined} aria-label={name || undefined} className="flex min-h-tap items-center min-w-0 flex-1 rounded-full text-heading lg:flex-initial lg:max-w-[16rem]">
          <StoreMark />
        </Link>

        <nav aria-label={t('nav.primary')} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className="flex min-h-tap items-center rounded-full px-3 font-bold text-ink-soft transition-colors hover:bg-surface hover:text-heading aria-[current=page]:bg-[color:var(--pc-teal-soft)] aria-[current=page]:text-[color:var(--pc-teal)]"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={account.href} aria-label={account.label} title={account.label} aria-current={isActive(account.href) ? 'page' : undefined} className="icon-btn shrink-0 text-heading hover:bg-surface hidden lg:inline-grid">
          <UserRound aria-hidden="true" className="h-5 w-5" />
        </Link>

        <ThemeToggle />

        <div className="relative shrink-0">
          {adds > 0 && (
            <span key={adds} aria-hidden="true" className="pointer-events-none absolute -left-16 top-1/2 flex -translate-y-1/2 gap-1 text-[color:var(--pc-kibble)]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="paw-step" style={{ animationDelay: `${i * 140}ms`, transform: `rotate(${i % 2 ? 12 : -12}deg) translateY(${i % 2 ? -5 : 4}px)` }}>
                  <Paw className="h-4 w-4 rotate-90" />
                </span>
              ))}
            </span>
          )}
          <button type="button" onClick={openCart} className="btn btn-accent gap-1.5 px-2 lg:gap-2.5 lg:pl-4">
            <ShoppingBag aria-hidden="true" className="h-5 w-5" />
            <span className="hidden lg:inline">{t('nav.cart')}</span>
            <span aria-hidden="true" className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-[color:var(--pc-apricot)] px-1.5 text-sm font-extrabold tabular-nums text-[color:var(--pc-ink)]">
              {count}
            </span>
            <span className="sr-only">{plural('nav.cart.count', count)}</span>
          </button>
        </div>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="icon-btn shrink-0 text-heading hover:bg-surface lg:hidden" aria-label={t('nav.menu')}>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </Dialog.Trigger>
          <Dialog.Portal container={headerRef.current}>
            <Dialog.Overlay className="overlay fixed inset-0 z-40 bg-[color:var(--scrim)]" />
            <Dialog.Content className="nav-menu fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto overscroll-contain rounded-b-2xl bg-surface-raised px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] text-ink shadow-lift">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-xl text-heading">{t('nav.menu')}</Dialog.Title>
                <Dialog.Description className="sr-only">{t('nav.primary')}</Dialog.Description>
                <Dialog.Close className="icon-btn -mr-2 text-heading hover:bg-surface" aria-label={t('nav.close')}>
                  <X aria-hidden="true" className="h-6 w-6" />
                </Dialog.Close>
              </div>
              <nav aria-label={t('nav.primary')} className="mt-1">
                <ul className="flex flex-col gap-1">
                  {menuLinks.map(({ href, key }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className="flex min-h-tap items-center gap-3 rounded-2xl px-3 font-display text-xl font-bold text-heading aria-[current=page]:bg-[color:var(--pc-teal-soft)] aria-[current=page]:text-[color:var(--pc-teal)]"
                      >
                        {t(key)}
                        {isActive(href) && <Paw className="ml-auto h-5 w-5 shrink-0" />}
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
