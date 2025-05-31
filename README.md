# Star Network

## Tech stack

- React
- TypeScript
- Next.js
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- TailwindCSS
- [Shadcn/UI](https://ui.shadcn.com)
- Playwright
- Vitest

## About

There are two pages.
The main page displays a list with character cards, the list has the ability to page through and search using API.
The second page contains detailed information about the selected character. This page allows you to edit and save character information locally without sending it to the server.

## Development

Run the dev server:

```sh
pnpm dev
```

Open the url

```sh
http://localhost:5173/star-network/
```

## Deployment

First, build your app for production:

```sh
pnpm build
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
