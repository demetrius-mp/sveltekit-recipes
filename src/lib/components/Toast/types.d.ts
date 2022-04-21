export type Color =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark';

export type Toast = {
	id: string;
	color: Color;
	title: string;
	body: string;
	additionalInfo?: string;
	removeAfter: number;
};

export type ToastCreateInput = Omit<Toast, 'id'>;
