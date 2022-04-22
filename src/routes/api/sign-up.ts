import { signUp } from '$lib/api';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async (event) => {
	const { name, email, password }: { name: string; email: string; password: string } =
		await event.request.json();

	try {
		await signUp({ name, email, password });
	} catch (err) {
		if (err instanceof Error) {
			return {
				status: 409,
				body: JSON.stringify({
					error: err.message
				})
			};
		}
	}

	return {
		status: 201,
		body: JSON.stringify({
			message: 'User created'
		})
	};
};
