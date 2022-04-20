import type { User } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

type AuthData = {
	email: string;
	password: string;
};

type UserStore = {
	subscribe: Writable<User>['subscribe'];
	signUp({ email, password }: AuthData): Promise<void>;
	signIn({ email, password }: AuthData): Promise<void>;
	signOut(): Promise<void>;
};

function createUserStore(): UserStore {
	const { set, subscribe, update } = writable<User>();

	return {
		subscribe,
		async signUp({ email, password }) {
			console.log(email, password);
		},
		async signIn({ email, password }) {
			console.log(email, password);
		},
		async signOut() {
			console.log('sign out');
		}
	};
}

const userStore = createUserStore();

export default userStore;
