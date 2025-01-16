import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../../$types';

// logout user if logged in and redirect to login page if page is accessed
export const POST = async (event: RequestEvent): Promise<Response> => {
	const platform = event.platform;
	if (!platform) {
		console.error('platform not available');
		return new Response('Logout failed', { status: 500 });
	}

	const sessionToken = event.cookies.get('session');
	if (!sessionToken) {
		return new Response('Logout failed', { status: 400 });
	}

	await invalidateSession(platform.env.kv, sessionToken);
	deleteSessionTokenCookie(event);

	event.locals.user = null;

	throw redirect(303, '/login');
};
