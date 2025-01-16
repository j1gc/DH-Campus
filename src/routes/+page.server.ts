import type { PageServerLoad } from './$types';

// see https://medium.com/the-mighty-programmer/working-with-svelte-kit-and-cloudflare-kv-in-local-728d8b042e95
export const load: PageServerLoad = async ({ platform }) => {
	await platform?.env.kv.put('lastVisit', new Date().toISOString());
	console.log('lastVisit saved');
};
