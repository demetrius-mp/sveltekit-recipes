import { getUser } from '$lib/api';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

type Cookies = {
	jwt: string;
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '') as Cookies;

	if (event.url.pathname === '/api/sign-out') {
		event.locals.user = null;
		return await resolve(event);
	}

	if (cookies?.jwt) {
		const user = await getUser(cookies.jwt);
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async (event) => {
	return { user: event.locals.user || null };
};
