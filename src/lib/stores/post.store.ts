import type { Post } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

type LoadReturnType = {
	posts: Post[];
	pageSize: number;
	totalItems: number;
};

type PostStore = {
	subscribe: Writable<Post[]>['subscribe'];
	set: Writable<Post[]>['set'];
	update: Writable<Post[]>['update'];

	load(info: { pageNumber: number }): Promise<LoadReturnType>;
	loadById(id: number): Promise<Post | undefined>;
};

function createPostStore(): PostStore {
	const { set, subscribe, update } = writable<Post[]>([]);

	return {
		subscribe,
		set,
		update,
		async load({ pageNumber }) {
			const { posts, totalItems, pageSize } = await loadPagedPosts(pageNumber);
			set(posts);
			return { posts, totalItems, pageSize };
		},
		async loadById(id) {
			const post = await loadPostById(id);
			return post;
		}
	};
}

const postStore = createPostStore();

export default postStore;

// delete this

// create a stall function
async function stall(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// simulate fetch api
async function loadPagedPosts(pageNumber: number) {
	await stall(1000);
	const POSTS_PER_PAGE = 2;

	const start = (pageNumber - 1) * POSTS_PER_PAGE;
	const end = start + POSTS_PER_PAGE;
	const pagedPosts = posts.slice(start, end);

	return {
		posts: pagedPosts,
		totalItems: posts.length,
		pageSize: POSTS_PER_PAGE
	};
}

async function loadPostById(id: number) {
	await stall(1000);
	return posts.find((post) => post.id === id);
}

// fake db
const posts: Post[] = [
	{
		id: 1,
		title: 'Hello World',
		description: 'This is a sample post',
		tags: ['hello', 'world'],
		body: '# Hello World',
		createdAt: new Date()
	},
	{
		id: 2,
		title: 'Hello World 2',
		description: 'This is a sample post 2',
		tags: ['hello', 'world'],
		body: '# Hello World 2',
		createdAt: new Date()
	},
	{
		id: 3,
		title: 'Hello World 3',
		description: 'This is a sample post 3',
		tags: ['hello', 'world'],
		body: '# Hello World 3',
		createdAt: new Date()
	},
	{
		id: 4,
		title: 'Hello World 4',
		description: 'This is a sample post 4',
		tags: ['hello', 'world'],
		body: '# Hello World 4',
		createdAt: new Date()
	},
	{
		id: 5,
		title: 'Hello World 5',
		description: 'This is a sample post 5',
		tags: ['hello', 'world'],
		body: '# Hello World 5',
		createdAt: new Date()
	},
	{
		id: 6,
		title: 'Hello World 6',
		description: 'This is a sample post 6',
		tags: ['hello', 'world'],
		body: '# Hello World 6',
		createdAt: new Date()
	},
	{
		id: 7,
		title: 'Hello World 7',
		description: 'This is a sample post 7',
		tags: ['hello', 'world'],
		body: '# Hello World 7',
		createdAt: new Date()
	},
	{
		id: 8,
		title: 'Hello World 8',
		description: 'This is a sample post 8',
		tags: ['hello', 'world'],
		body: '# Hello World 8',
		createdAt: new Date()
	},
	{
		id: 9,
		title: 'Hello World 9',
		description: 'This is a sample post 9',
		tags: ['hello', 'world'],
		body: '# Hello World 9',
		createdAt: new Date()
	}
];
