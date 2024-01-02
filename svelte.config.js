import adapter from '@sveltejs/adapter-netlify';
// import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			edge: false,
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
