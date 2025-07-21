# Next.js Cache Demo

Deploy this to Vercel. In the current state of the application, even though unstable_cache is used, the method calls are not cached during build time.
You can verify this by looking at the build logs, which log the method calls hundreds of times.

If you build locally with `pnpm build && pnpm preview`, you will see that the method calls are cached during build time, so logs only appear once during the build.

In `data/index.ts`, if you replace the unstable_cache with fileSystemCache, the method calls are cached during build time on Vercel too and logs only appear once during the build.
