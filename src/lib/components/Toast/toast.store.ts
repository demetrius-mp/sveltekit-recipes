import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Toast, ToastCreateInput } from './types';

type ToastStore = {
	subscribe: Writable<Toast[]>['subscribe'];

	addToast: (toast: ToastCreateInput) => string;
	removeToast: (id: string) => void;
};

function createToastStore(): ToastStore {
	const { subscribe, update } = writable<Toast[]>([]);

	const removeToast: ToastStore['removeToast'] = (id) => {
		update((all) => all.filter((toast) => toast.id !== id));
	};

	return {
		subscribe,
		removeToast,
		addToast({ body, title, additionalInfo, color, removeAfter }) {
			const id = new Date().valueOf() + body;
			update((all) => [
				{
					id,
					color,
					body,
					title,
					additionalInfo,
					removeAfter
				},
				...all
			]);

			if (removeAfter !== 'never') {
				setTimeout(() => {
					removeToast(id);
				}, removeAfter);
			}
			return id;
		}
	};
}

const toastStore = createToastStore();

export default toastStore;
