import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	if (event.locals.user == null) {
		return redirect(303, '/login');
	}
};
