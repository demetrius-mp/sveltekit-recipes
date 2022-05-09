import { writable, type Writable } from 'svelte/store';

interface SidebarStore {
	subscribe: Writable<boolean>['subscribe'];
	hide(): void;
	show(): void;
	toggle(): void;
}

function createSidebarStore(): SidebarStore {
	const { subscribe, set, update } = writable<boolean>(false);

	return {
		subscribe,
		hide() {
			set(false);
		},
		show() {
			set(true);
		},
		toggle() {
			update((state) => !state);
		}
	};
}

export const sidebarStore = createSidebarStore();
