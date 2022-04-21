import { signIn } from '$lib/api';
import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const post: RequestHandler = async (event) => {
	const { email, password }: { email: string; password: string } = await event.request.json();

	try {
		const user = await signIn({ email, password });

		const headers = {
			'Set-Cookie': cookie.serialize('jwt', user.accessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict',
				path: '/'
			})
		};

		return {
			headers,
			body: JSON.stringify(user)
		};
	} catch (e) {
		return {
			status: 401,
			body: JSON.stringify({
				error: e
			})
		};
	}
};
