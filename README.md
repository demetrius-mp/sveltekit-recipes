# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
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

# About the project

This project contains some recipes for SvelteKit apps. Currently includes:

- JWT authentication with server side cookies (using SvelteKit endpoints)
- A toast notification component
- A pagination example (supports searching)
- Form validation with yup and svelte-forms-lib

## To Do

- [ ] Find a more efficient way to handle [pagination](https://github.com/demetrius-mp/sveltekit-recipes/blob/d38b95e1223c08165f42a6a4a409f1d005828911/src/lib/components/Paginator/Paginator.svelte#L32).
