import type { Post } from '$lib/types';

const posts: Post[] = [
	{
		id: 1,
		title: 'Hello World',
		description: 'This is a sample post',
		tags: ['hello', 'world'],
		body: 'Hello World',
		createdAt: new Date()
	},
	{
		id: 2,
		title: 'Hello World 2',
		description: 'This is a sample post 2',
		tags: ['hello', 'world'],
		body: 'Hello World 2',
		createdAt: new Date()
	},
	{
		id: 3,
		title: 'Hello World 3',
		description: 'This is a sample post 3',
		tags: ['hello', 'world'],
		body: 'Hello World 3',
		createdAt: new Date()
	},
	{
		id: 4,
		title: 'Hello World 4',
		description: 'This is a sample post 4',
		tags: ['hello', 'world'],
		body: 'Hello World 4',
		createdAt: new Date()
	},
	{
		id: 5,
		title: 'Hello World 5',
		description: 'This is a sample post 5',
		tags: ['hello', 'world'],
		body: 'Hello World 5',
		createdAt: new Date()
	},
	{
		id: 6,
		title: 'Hello World 6',
		description: 'This is a sample post 6',
		tags: ['hello', 'world'],
		body: 'Hello World 6',
		createdAt: new Date()
	},
	{
		id: 7,
		title: 'Hello World 7',
		description: 'This is a sample post 7',
		tags: ['hello', 'world'],
		body: 'Hello World 7',
		createdAt: new Date()
	},
	{
		id: 8,
		title: 'Hello World 8',
		description: 'This is a sample post 8',
		tags: ['hello', 'world'],
		body: 'Hello World 8',
		createdAt: new Date()
	},
	{
		id: 9,
		title: 'Hello World 9',
		description: 'This is a sample post 9',
		tags: ['hello', 'world'],
		body: 'Hello World 9',
		createdAt: new Date()
	}
];

const POSTS_PER_PAGE = 2;

export async function getPosts(info: { page: number }) {
	const start = (info.page - 1) * POSTS_PER_PAGE;
	const end = start + POSTS_PER_PAGE;
	const pagedPosts = posts.slice(start, end);

	return {
		posts: pagedPosts,
		totalItems: posts.length,
		pageSize: POSTS_PER_PAGE
	};
}
