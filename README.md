# Full Stack Jack

SvelteKit demo with Supabase, Typescript, Prisma & PlanetScale. This is a ported version of the original demo [`Full Stack Jack`](https://github.com/jurassicjs/nuxt3-fullstack-tutorial) built with Nuxt 3.

## Project Setup

- Clone the project

```sh
git clone https://github.com/sytanta/full-stack-jack-sveltekit
```

- Install dependencies

```sh
npm i
```

## Database

- Register and create a PlanetScale database url for [`Prisma`](https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale)

- Update or create a `.env` file with the following content:

```
DATABASE_URL="..."
STRIPE_SECRET_KEY="..."
PUBLIC_STRIPE_PRO_MEMBERSHIP_KEY="..." # This is the product id of the Stripe subscription plan
PUBLIC_APP_DOMAIN="..." # The app's url
```

- Create a database from the Prisma schema

```sh
npx prisma db push
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
