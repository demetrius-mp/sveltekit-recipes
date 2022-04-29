export type User = {
	id: number;
	name: string;
	email: string;
	accessToken: string;
};

export type Post = {
	id: number;
	title: string;
	description: string;
	tags: string[];
	body: string;
	createdAt: Date;
};
