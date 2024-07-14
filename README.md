# Star Network

## Tech stack

- React
- TypeScript
- Remix
- TanStack Query
- TailwindCSS
- Shadcn/UI
- Playwright
- Vitest

## About

It consists of two pages.
The main page displays a list with character cards, the list has the ability to page through and search using API.
The next page with detailed information about the selected character. On this page it is possible to edit and save information about the character locally without sending it to the server.

## Development

Run the dev server:

```shellscript
pnpm run dev
```

Open the url

```sh
http://localhost:5173/star-network/
```

## Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
