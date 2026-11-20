# Yami Bakery

Live website: https://yevtushenko10.github.io/yami-bakery/

GitHub repository: https://github.com/yevtushenko10/yami-bakery

Premium single-page React + TypeScript storefront using Yami Bakery's original logos and product photographs. Spanish (default) and English.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

```sh
npm test
npm run test:e2e
npm run build
npm run preview
```

For browser checks, first run `npx playwright install chromium`.

## Deploy

Vercel or Cloudflare Pages: build command `npm run build`, output directory `dist`. No backend or environment variables are required. The Open Graph image URL points to the GitHub Pages deployment; update it in `index.html` if moving to another domain.

GitHub Pages deploys automatically on pushes to `main` using `.github/workflows/deploy.yml`. Its build sets `GITHUB_PAGES=true` to use the repository URL prefix. Local development and other hosts use `/`.

## Content and orders

- `src/data.ts`: business links, product variants and prices in integer EUR cents.
- `src/i18n.ts`: Spanish and English UI and order-message copy.
- `src/order.ts`: validated cart data, price formatting and WhatsApp message generation.
- `public/images/`: original supplied brand assets and optimized product photos; brownies and almond cake cropped from the original menu.
- `public/yami-menu.pdf`: printable A4 Spanish menu with selectable text, all prices and contact links.

The cart and language preference are stored locally in the customer's browser. Checkout opens a pre-filled WhatsApp message for the customer to review and send. It never confirms an order or collects payment. Availability, payment and fulfillment are arranged directly with the bakery.

## Regenerate the PDF

Install Python 3.10+ with `pillow`, `reportlab`, and `pymupdf`, then run `python scripts/create_menu.py` from the project root. The provided PDF is ready to use; Python is not needed to build or deploy the website.
