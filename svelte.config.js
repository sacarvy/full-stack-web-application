import vercel from "@sveltejs/adapter-vercel"
// import netlify from ' @sveltejs/adapter-netlify'
// import cloudflare from '@sveltejs/adapter-cloudflare'
// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import UnoCss from 'unocss/vite'
import unoConfig from './uno.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
      plugins: [UnoCss(unoConfig)]
    }
	}
};

export default config;
