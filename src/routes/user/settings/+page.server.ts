import { fail, redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { superValidate, setError } from 'sveltekit-superforms';
import { ChangeNewsletterSchema, ChangeUserDataSchema } from '$lib/db/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { checkIfUserExists, updateUserData, updateUserNewsletterSettings } from '$lib/server/db';

export const load: PageServerLoad = async (event: RequestEvent) => {
	if (event.locals.user == null) {
		return redirect(303, '/login');
	}

	return {
		user: event.locals.user,
		changeUserData: await superValidate(zod(ChangeUserDataSchema)),
		changeNewsletter: await superValidate(zod(ChangeNewsletterSchema))
	};
};

export const actions: Actions = {
	// triggerd by user settings form submit with action UserData
	UserData: async (event: RequestEvent) => {
		const form = await superValidate(event, zod(ChangeUserDataSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log(form);

		const platform = event.platform;
		if (!platform) {
			return fail(500, { message: 'Platform not available' });
		}

		const currentUser = event.locals.user;
		if (!currentUser) {
			console.error(
				'ALERT: Unauthorized user is in authorized route and wants to update user data '
			);
			return fail(500, { message: 'could not update user data' });
		}
		// TODO: send verification email
		if (form.data.email !== currentUser.Email) {
			const emailAlreadyUsed = await checkIfUserExists(platform.env.db, form.data.email);
			if (emailAlreadyUsed) {
				return setError(form, 'email', 'Email is already in use');
			}
		}

		const newUserData = await updateUserData(platform.env.db, form, currentUser.Id);

		event.locals.user = newUserData;

		return {
			form
		};
	},

	Newsletter: async (event: RequestEvent) => {
		const form = await superValidate(event, zod(ChangeNewsletterSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log(form);

		const platform = event.platform;
		if (!platform) {
			return fail(500, { message: 'Platform not available' });
		}

		const currentUser = event.locals.user;
		if (!currentUser) {
			console.error(
				'ALERT: Unauthorized user is in authorized route and wants to update newsletter settings '
			);
			return fail(500, { message: 'could not update user data' });
		}

		const newUserData = await updateUserNewsletterSettings(platform.env.db, form, currentUser.Id);

		event.locals.user = newUserData;

		return {
			form
		};
	}
};
