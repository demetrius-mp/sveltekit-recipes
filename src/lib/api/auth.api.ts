import type { User } from '$lib/types';
import { baseUrl } from './settings';

type SignInData = {
	email: string;
	password: string;
};

type SignUpData = {
	name: string;
	email: string;
	password: string;
};

export async function getUser(token: string): Promise<User> {
	const response = await fetch(`${baseUrl}/auth/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (response.status === 401) {
		throw new Error('Invalid token');
	}

	const userData = (await response.json()) as Omit<User, 'accessToken'>;

	return {
		...userData,
		accessToken: token
	};
}

export async function signIn({ email, password }: SignInData): Promise<User> {
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

export async function signUp({ name, email, password }: SignUpData): Promise<void> {
	const response = await fetch(`${baseUrl}/auth/sign-up`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			email,
			password
		})
	});

	if (response.status === 409) {
		const error = (await response.json()) as { detail: string };
		throw new Error(error.detail);
	}
}
