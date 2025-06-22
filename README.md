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

If installation fails due to network restrictions, create an `.npmrc` file with `registry=https://registry.npmmirror.com`.
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

### License Types

Prompts can be sold under three licenses:

1. **personal_use** – buyer may use personally but not resell.
2. **commercial_use** – allows commercial projects but no resale.
3. **exclusive_transfer** – full rights transfer to the buyer.

### Deep Linking

The upload form accepts a `Tool URL Template` and `Affiliate Code`.
In the prompt detail page a *Run in Tool* button is shown when the template is set.
`{{PROMPT}}` in the template is replaced with the encoded prompt text and
`{{AFF}}` with the affiliate code.
