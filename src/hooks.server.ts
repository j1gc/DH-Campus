import { deleteSessionTokenCookie } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';
import type { RequestEvent } from './routes/$types';
import { getUserBySession } from '$lib/server/db';

// hook function called by every server route
export async function handle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve: Function;
}): Promise<Handle> {
	console.log('hooks server called');
	const platform = event.platform;
	if (!platform) {
		console.error('platform not available');
		return resolve(event);
	}
	// check if logged in and if set user in locals
	const user = await getUserBySession(platform.env.db, platform.env.kv, event);
	if (user) {
		event.locals.user = user;
	} else {
		deleteSessionTokenCookie(event);
	}

	return resolve(event);
}
