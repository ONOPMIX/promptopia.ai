# promptopia.ai

A marketplace for high-quality prompts for generative image and video AI models. Built with **Next.js 14**, **Tailwind CSS**, **Firebase** and **Stripe**.

<!-- TODO: replace with real design -->
[Figma design placeholder](https://www.figma.com/file/placeholder)

## Features
- Email and Google OAuth login
- Upload prompts with model, tags, price and license
- Browse marketplace and view prompt details
- Creator dashboard and simple admin panel
- Dark / light theme toggle

## Development

Copy `.env.local.example` to `.env.local` and fill in your keys.

```bash
npm install
npm run dev
```

## Deploy
Deploy on [Vercel](https://vercel.com/) with the provided environment variables.
The Next.js source lives in the repository root, so set the Vercel **Root Directory** to `/` (default) when importing the project.

Legal documents are under `public/legal/` and prompt license templates in `LICENSES.md`.
