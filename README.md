# Pet Care — storefront template

Friendly and playful, for pet shops, groomers and vets: prices engraved on
bone-shaped ID tags that jingle, round category photos, a dog and a cat
peeking over the hero, and a trail of paw prints to the cart. Design plan:
[`DESIGN.md`](DESIGN.md).

## How it works

React 18 + Vite + Tailwind. Everything the store shows is data — branding,
CMS copy (`home`, `about`, `products`, `contact`), products and services,
categories, contact — read through `src/core/`, vendored from the monorepo's
`templates/_core` (do not edit it here). Template code is the design:
`src/components`, `src/pages`, `src/theme`, `src/i18n`.

`/config.json`: `{ "mode": "demo", "templateId": … }` shows the template's demo
rows; a provisioned store gets `{ "mode": "live", "orgId": … }`.

## Pages

`/` · `/products` (`?type=`, `?category=`, `?sale=1`, `?q=`, `?sort=`) ·
`/products/:id` · `/about` · `/contact` · 404. Old URLs (`/deals`,
`/services`, `/category/:slug`…) redirect into the catalog.

## Effects

CSS only: tags swing on hover, focus and add; paw prints step to the cart.
Reduced motion (the system setting or `?motion=reduce`) stops them.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc + vite build → dist/
```

Against a local management-be: `TSURU_DEV_API=http://localhost:5000
VITE_PUBLIC_API_URL=http://localhost:5173 pnpm dev`.

## Deployment

`.github/workflows/deploy.yml`: `develop` → GitHub Pages
(`pet-care.examples.tsuru.jcampos.dev`, dev); `main` → production example
hosting (`pet-care.examples.tsuru.lat`); each deploy notifies the provisioner
to refresh stores using this template.
