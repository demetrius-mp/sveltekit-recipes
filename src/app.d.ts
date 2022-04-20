/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { User } from '$lib/types';
declare global {
	declare namespace App {
		interface Locals {
			user?: User;
		}
		// interface Platform {}
		interface Session {
			user?: User;
		}
		// interface Stuff {}
	}
}
