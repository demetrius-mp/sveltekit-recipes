import { session } from '$app/stores';
import type { User } from '$lib/types';

type AuthData = {
	email: string;
	password: string;
};

type UserStore = {
	signUp({ email, password }: AuthData): Promise<void>;
	signIn({ email, password }: AuthData): Promise<void>;
	signOut(): Promise<void>;
};

function createUserStore(): UserStore {
	return {
		async signUp({ email, password }) {
			console.log(email, password);
		},
		async signIn({ email, password }) {
			const r = await fetch('/api/sign-in', {
				method: 'POST',
				body: JSON.stringify({ email, password })
			});

			if (r.status === 401) {
				throw new Error('Invalid credentials');
			}

			const user: User = await r.json();

			session.set({
				user
			});
		},
		async signOut() {
			await fetch('/api/sign-out');

			session.set({
				user: null
			});
		}
	};
}

const userStore = createUserStore();

export default userStore;
