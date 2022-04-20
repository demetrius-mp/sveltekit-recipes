import { getUser } from '$lib/api';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

type Cookies = {
	jwt: string;
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '') as Cookies;

	if (cookies?.jwt) {
		const user = await getUser(cookies.jwt);
		event.locals.user = user;
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async (event) => {
	return { user: event.locals.user } || {};
};
