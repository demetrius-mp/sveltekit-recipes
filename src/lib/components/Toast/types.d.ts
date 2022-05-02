import type { MaybePromise } from '@sveltejs/kit/types/private';

export type Color =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark';

export type Action = {
	label: string;
	color: Color | `outline-${Color}`;
	execute: () => MaybePromise<void>;
	closeToastOnClick?: boolean;
};

export type ToastPromise = {
	label: string;
	resolve: () => Promise<void>;
};

export type Toast = {
	id: string;
	color: Color;
	title: string;
	body: string;
	additionalInfo?: string;
	removeAfter: number | 'never';
	actions?: Action[];
	promise?: ToastPromise;
};

export type ToastCreateInput = Omit<Toast, 'id'>;
