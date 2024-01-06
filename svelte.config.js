import adapter from '@sveltejs/adapter-netlify';
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			split: true
		}),
		alias: {
			$db: './src/db' // alias for db folder
		},
		csrf: {
			checkOrigin: false
		}
	}
};

export default config;
