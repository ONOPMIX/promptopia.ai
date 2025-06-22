# promptopia.ai

A marketplace for buying and selling prompts for image and video generation models. Built with **Next.js**, **Tailwind CSS**, **Firebase**, **Stripe** and **next-intl**.

[Figma design placeholder](https://www.figma.com/file/placeholder)

## Development

1. Copy `.env.local.example` to `.env.local` and fill your keys.
2. Install deps and run dev server:

```bash
npm install
npm run dev
```

### Environment variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
GOOGLE_TRANSLATE_KEY=
```

Stripe webhook URL should point to `/api/stripe/checkout` when deploying Cloud Functions.

## Deploy

The Next.js source is in the repo root. Set Vercel **Root Directory** to `/`.

Legal documents are under `public/legal/` and license templates in `LICENSES.md`.
