import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const get: RequestHandler = async () => {
	const headers = {
		'Set-Cookie': cookie.serialize('jwt', '', {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'strict',
			path: '/'
		})
	};

	return {
		headers
	};
};
