/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ToastCreateInput } from '$lib/components/Toast/types';
import { User } from '$lib/types';
declare global {
	declare namespace App {
		interface Locals {
			user: User | null;
			flashMessages: ToastCreateInput[];
		}
		// interface Platform {}
		interface Session {
			user: User | null;
			flashMessages: ToastCreateInput[];
		}
		// interface Stuff {}
	}
}
