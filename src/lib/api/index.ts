import type { User } from '$lib/types';

const baseUrl = 'http://localhost:8000';

type AuthData = {
	email: string;
	password: string;
};

export async function getUser(token: string): Promise<User> {
	const response = await fetch(`${baseUrl}/auth/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const userData = (await response.json()) as Omit<User, 'accessToken'>;

	return {
		...userData,
		accessToken: token
	};
}

export async function signIn({ email, password }: AuthData): Promise<User> {
	const body = new URLSearchParams(`username=${email}&password=${password}`);

	const accessTokenResponse = await fetch(`${baseUrl}/auth/sign-in`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	});

	if (accessTokenResponse.status === 401) {
		throw new Error('Invalid credentials');
	}

	const { access_token }: { access_token: string } = await accessTokenResponse.json();

	const user = await getUser(access_token);

	return user;
}
