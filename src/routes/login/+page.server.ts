import { setError, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from '../$types';
import { LoginSchema } from '$lib/db/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { loginUser } from '$lib/server/db';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import type { User } from '$lib/db/types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(LoginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(LoginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const platform: App.Platform | undefined = event.platform;
		if (!platform) {
			return fail(500, { message: 'Database or KV not available' });
		}

		try {
			const result = await loginUser(platform.env.db, form);
			const user = result.results[0] as User;
			if (result.results.length !== 1) {
				console.log(result);
				setError(form, 'email', 'User not found with provided email or password incorrect');
				setError(form, 'password', 'User not found with provided email or password incorrect');
				return fail(400, { form });
			}

			const token = generateSessionToken();
			const session = await createSession(platform.env.kv, token, user.Id);

			setSessionTokenCookie(event, token, session.expiresAt);
			console.log('redirecting to /');
		} catch (error) {
			console.error('error in login');
			console.error(error);

			setError(form, 'email', 'User not found with provided email or password incorrect');
			setError(form, 'password', 'User not found with provided email or password incorrect');
			return fail(400, { form });
		}

		// cant redirect in try catch block
		if (event.cookies.get('session') !== null) {
			redirect(302, '/');
		}

		return {
			form
		};
	}
};
