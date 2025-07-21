import { unstable_cache } from 'next/cache'

// import { fileSystemCache } from './fileSystemCache'

// replace this with fileSystemCache to see build-time caching working.
const cache = unstable_cache

export const loadUser = cache(
	async (id: string) => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
		const data = (await res.json()) as {
			id: number
			name: string
		}
		return data
	},
	['loadUser'],
	{ revalidate: 90 }
)

export const loadPosts = cache(
	async () => {
		console.log(`load posts`)
		const res = await fetch('https://jsonplaceholder.typicode.com/posts')
		const data = (await res.json()) as {
			id: number
			title: string
			body: string
			userId: number
		}[]
		return data
	},
	['loadPosts'],
	{ revalidate: 90 }
)

export const loadPost = cache(
	async (id: string) => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
		const data = (await res.json()) as {
			id: number
			title: string
			body: string
			userId: number
		}
		return data
	},
	['loadPost'],
	{ revalidate: 90 }
)

export const loadUsers = cache(
	async () => {
		console.log(`load users`)
		const res = await fetch('https://jsonplaceholder.typicode.com/users')
		const data = (await res.json()) as {
			id: number
			name: string
		}[]
		return data
	},
	['loadUsers'],
	{ revalidate: 90 }
)

export const loadBasePageData = cache(
	async () => {
		console.log('loadBasePageData')
		const [users, posts] = await Promise.all([loadUsers(), loadPosts()])

		return {
			users,
			posts,
		}
	},
	['loadPageData'],
	{ revalidate: 90 }
)
