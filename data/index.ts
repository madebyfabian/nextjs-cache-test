import { unstable_cache } from 'next/cache'

// import { fileSystemCache } from './fileSystemCache'

// replace this with fileSystemCache to see build-time caching working.
const cache = unstable_cache

const cachedFetch = async (...args: Parameters<typeof fetch>) => {
	return await fetch(
		`https://nextjs-cache-demo-27.localcan.dev/?url=${args[0]}`,
		{
			...args[1],
			next: { revalidate: 90 },
			cache: 'force-cache',
		}
	)
}

export const loadUser = cache(
	async (id: string) => {
		const res = await cachedFetch(
			`https://jsonplaceholder.typicode.com/users/${id}`
		)
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
		const res = await cachedFetch('https://jsonplaceholder.typicode.com/posts')
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
		const res = await cachedFetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		)
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
		const res = await cachedFetch('https://jsonplaceholder.typicode.com/users')
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
		const [users, posts] = await Promise.all([loadUsers(), loadPosts()])

		return {
			users,
			posts,
		}
	},
	['loadPageData'],
	{ revalidate: 90 }
)
