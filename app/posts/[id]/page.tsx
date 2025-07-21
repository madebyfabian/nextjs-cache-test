import NextLink from 'next/link'
import UserList from '@/components/UserList'
import { loadBasePageData, loadPost, loadUser } from '@/data'

export const generateStaticParams = async () => {
	const { posts } = await loadBasePageData()

	return posts.map(post => ({ id: post.id.toString() }))
}

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>
}) => {
	const { posts, users } = await loadBasePageData()

	const [post] = await Promise.all([loadPost((await params).id)])
	const user = await loadUser(String(post.userId))

	return {
		title: `Post: ${post.title} by ${user.name} (of ${users.length} users) (of ${posts.length} posts)`,
		description: post.body,
	}
}

export default async function Home({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { posts, users } = await loadBasePageData()

	const [post] = await Promise.all([loadPost((await params).id)])
	const user = await loadUser(String(post.userId))

	return (
		<div className="container mx-auto">
			<NextLink href="/">&larr; Back to home</NextLink>
			<h1 className="text-2xl font-bold">{post.title}</h1>
			<p>{post.body}</p>
			<p>
				Author: <strong>{user.name}</strong>
			</p>
			<p>{posts.length} posts overall</p>
			<UserList users={users} />
		</div>
	)
}
