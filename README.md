# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Webuzo / PHP deployment

The current hosting account provides Webuzo and PHP 8.0, but no Node.js application or terminal. Build the site on a computer with Node.js, then upload the contents of `dist` to `/home/USERNAME/public_html`.

1. Add the Supabase variables from `.env.example` to a local `.env` file.
2. Run `npm install` and `npm run build` locally.
3. In Webuzo File Manager, open `/home/USERNAME/public_html` and upload the **contents** of `dist` directly there. Upload `index.html`, the `assets` folder, `.htaccess`, and the `api` folder containing `order-email.php` and `contact-email.php`.
4. Do not upload `.env`, `node_modules`, or the source files. `app.mjs` is not used on this PHP-only host.
5. Create `info@shelterservicesinternational.com` in Webuzo Email Accounts. The PHP endpoints use the hosting mail service through PHP `mail()`; no SMTP environment variables or EmailJS setup is required.

The checkout does not use a payment gateway. After an order is saved, PHP sends an HTML receipt to the customer and a copy to `info@shelterservicesinternational.com`. Contact and newsletter submissions are also sent to that address. Use Webuzo **Track Email Delivery** to inspect delivery failures.

The domain DNS must point to `ns1.crystalcloudhost.com` and `ns2.crystalcloudhost.com`. Do not put the hosting password or mailbox password in this repository.
