# VELCYRO — Deployment Notes

This is a static GitHub Pages storefront prototype.

Core files: `index.html`, `style.css`, `script.js`, `products.js`.

The numbered modules add search, wishlist, cart, checkout-demo, order history, SEO, responsive UI, policies and reusable components.

## Before launch
Connect a secure backend/database, real payment provider, inventory and fulfillment system, transactional email, authentication if needed, and legally reviewed policies.

Never place private API keys, payment secrets or server credentials in frontend files.

## GitHub Pages
1. Upload the files while preserving exact filenames/capitalization.
2. Enable GitHub Pages for the branch/folder containing `index.html`.
3. Test every navigation link.
4. Open browser DevTools and check Console + Network for 404 errors.
5. Test mobile and desktop layouts.
