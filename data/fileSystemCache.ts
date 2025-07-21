import crypto from 'crypto'
import { Cache } from 'file-system-cache'

const sharedCache = new Cache({ ttl: 30, basePath: 'tmp' })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Producer<T> = (...args: any[]) => Promise<T>

export function fileSystemCache<ReturnType, F extends Producer<ReturnType>>(
	originalFunction: F,
	key: string[],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	options: { revalidate: number }
): F {
	if (!key) {
		console.error('Cache key is empty, things will probably break.')
	}
	const memoized = async (...args: Parameters<F>): Promise<ReturnType> => {
		console.log(args)
		const compoundKey = hashDigest([...key, ...args])
		const cachedValue = await sharedCache.get(compoundKey)
		if (cachedValue) {
			return cachedValue
		} else {
			const freshValue = await originalFunction(...args)
			sharedCache.set(compoundKey, freshValue)
			return freshValue
		}
	}
	return memoized as F
}

function hashDigest(params: string[]): string {
	const shasum = crypto.createHash('sha1')
	shasum.update(params.join(':'))
	return shasum.digest('hex').slice(0, 10)
}
