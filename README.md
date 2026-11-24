This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Contact form delivery

The contact form sends messages to `louhabali@gmail.com` through Resend. To enable delivery, create a Resend API key and add `RESEND_API_KEY` to your local `.env.local` and your hosting provider's environment variables. The included `.env.example` shows the variable name. With the default sender, Resend may limit delivery to the account's verified recipient; verify a domain in Resend and set `CONTACT_FROM_EMAIL` to use a production sender address. Replies go directly to the sender's email address.

The contact endpoint checks the request origin and content type, caps the request body, ignores honeypot submissions, limits each detected IP to five attempts per hour, and times out Resend requests. The built-in rate limiter is an in-memory fallback: on serverless or multi-instance hosting it is not shared between instances and resets on restart. Configure a shared rate limiter at your hosting provider or edge proxy for reliable production throttling. For stronger bot filtering, add Cloudflare Turnstile and verify its token on the server before sending.
