export async function loadUser(id: string) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
	const data = (await res.json()) as {
		id: number
		name: string
	}
	return data
}

export async function loadPosts() {
	console.log(`load posts`)
	const res = await fetch('https://jsonplaceholder.typicode.com/posts')
	const data = (await res.json()) as {
		id: number
		title: string
		body: string
		userId: number
	}[]
	return data
}

export async function loadPost(id: string) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
	const data = (await res.json()) as {
		id: number
		title: string
		body: string
		userId: number
	}
	return data
}

export async function loadUsers() {
	console.log(`load users`)
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	const data = (await res.json()) as {
		id: number
		name: string
	}[]
	return data
}
