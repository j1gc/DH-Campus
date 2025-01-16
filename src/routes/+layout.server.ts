import type { PageServerLoad, RequestEvent } from './$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	let IsLogedIn = false;
	let FirstName = '';
	let LastName = '';
	let Email = '';
	let ReceiveNewsletter = false;

	console.log('event.locals.user', event.locals.user);
	if (event.locals.user != null) {
		IsLogedIn = true;
		FirstName = event.locals.user.FirstName;
		LastName = event.locals.user.LastName;
		Email = event.locals.user.Email;
		ReceiveNewsletter = event.locals.user.ReceiveNewsletter;
	}

	const userdata = {
		IsLogedIn: IsLogedIn,
		FirstName: FirstName,
		LastName: LastName,
		Email: Email,
		ReceiveNewsletter: ReceiveNewsletter
	};

	return { userdata: userdata };
};
