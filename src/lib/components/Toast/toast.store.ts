import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Toast, ToastCreateInput } from './types';

type ToastStore = {
	subscribe: Writable<Toast[]>['subscribe'];

	addToast: (toast: ToastCreateInput) => string;
	removeToast: (id: string) => void;
	removeToastAfter: ({ id, milliseconds }: { id: string; milliseconds: number }) => void;
};

function createToastStore(): ToastStore {
	const { subscribe, update } = writable<Toast[]>([]);

	const removeToast: ToastStore['removeToast'] = (id) => {
		update((all) => all.filter((toast) => toast.id !== id));
	};

	const removeToastAfter: ToastStore['removeToastAfter'] = ({ id, milliseconds }) => {
		setTimeout(() => {
			removeToast(id);
		}, milliseconds);
	};

	return {
		subscribe,
		removeToast,
		removeToastAfter,
		addToast(toastInfo) {
			const id = new Date().valueOf() + toastInfo.body;
			update((all) => [
				{
					id,
					...toastInfo
				},
				...all
			]);
			return id;
		}
	};
}

const toastStore = createToastStore();

export default toastStore;
