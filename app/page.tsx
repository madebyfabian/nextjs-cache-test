import NextLink from 'next/link'
import UserList from '@/components/UserList'
import loadPageData from '@/data'

export const generateMetadata = async () => {
	const { posts, users } = await loadPageData()

	return {
		title: `${posts.length} posts found by ${users.length} users`,
		description: 'This is my blog',
	}
}

export default async function Home() {
	const { posts, users } = await loadPageData()

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold">Hello World!</h1>
			<ul className="list-disc">
				{posts.map(post => (
					<li key={post.id}>
						<NextLink href={`/posts/${post.id}`}>{post.title}</NextLink>
					</li>
				))}
			</ul>

			<UserList users={users} />
		</div>
	)
}
