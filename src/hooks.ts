import { getUser } from '$lib/api';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

type Cookies = {
	jwt: string;
};

const handleInvalidToken: Handle = async ({ event, resolve }) => {
	event.locals.flashMessages.push({
		title: 'Error',
		body: 'Invalid authenticatino token.',
		color: 'danger',
		removeAfter: 3000
	});

	const response = await resolve(event);

	response.headers.set(
		'Set-Cookie',
		cookie.serialize('jwt', '', {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'strict',
			path: '/'
		})
	);

	return response;
};

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '') as Cookies;
	event.locals.flashMessages = [];

	if (event.url.pathname === '/api/sign-out') {
		event.locals.user = null;
		return await resolve(event);
	}

	if (cookies?.jwt) {
		try {
			const user = await getUser(cookies.jwt);
			event.locals.user = user;
		} catch (err) {
			return handleInvalidToken({ event, resolve });
		}
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async (event) => {
	return {
		user: event.locals.user || null,
		flashMessages: event.locals.flashMessages || []
	};
};
