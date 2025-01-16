import { setError, superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { PageServerLoad, Actions, RequestEvent } from '../$types';
import { SignupSchema } from '$lib/db/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { hashPassword } from '$lib/server/password';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import type { User } from '$lib/db/types';
import { checkIfUserExists, registerNewUser } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(SignupSchema))
	};
};

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const form = await superValidate(event, zod(SignupSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log(form);

		const platform = event.platform;
		if (!platform) {
			return fail(500, { message: 'Platform not available' });
		}

		const userExists = await checkIfUserExists(platform.env.db, form.data.email);
		if (userExists) {
			setError(form, 'email', 'User already exists');
			return fail(400, { form });
		}

		let createdUser = await registerNewUser(platform.env.db, form);
		console.log('createdUser', createdUser);

		const token = generateSessionToken();
		const session = await createSession(platform.env.kv, token, createdUser.Id);
		console.log('session', session);
		setSessionTokenCookie(event, token, session.expiresAt);

		redirect(302, '/');

		return {
			form
		};
	}
};
