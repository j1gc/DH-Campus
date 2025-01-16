import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	// check if logged in if not redirect to login else redirect to profile
	if (event.locals.user == null) {
		return redirect(303, '/login');
	}
	return redirect(303, '/user/profile');
};
