import {
	ChangeNewsletterSchema,
	ChangeUserDataSchema,
	LoginSchema,
	SignupSchema
} from '$lib/db/schema';
import { type Infer, type SuperValidated } from 'sveltekit-superforms';
import { hashPassword, verifyPassword } from './password';
import type { User } from '$lib/db/types';
import {
	deleteSessionTokenCookie,
	invalidateSession,
	setSessionTokenCookie,
	validateSessionToken
} from './session';
import type { RequestEvent } from '@sveltejs/kit';

async function registerNewUser(db: D1Database, form: SuperValidated<Infer<SignupSchema>>) {
	const pswdHash = await hashPassword(form.data.password);
	// insert user into database
	await db
		.prepare('INSERT INTO Users (FirstName, LastName, Email, Password) VALUES(?, ?, ?, ?)')
		.bind(form.data.firstName, form.data.lastName, form.data.email.toLowerCase(), pswdHash)
		.run()
		.then((result) => {
			if (!result.success) {
				throw new Error('insert of new user into database not successful reason:', result.error);
			}
		});

	// select created user from database
	const resultUser = await db
		.prepare('SELECT * FROM Users WHERE Email = ? LIMIT 1')
		.bind(form.data.email.toLowerCase())
		.first();
	if (!resultUser) {
		throw new Error(
			'could not find user in database after creating reason: returned value is null'
		);
	}

	const user = resultUser as User;
	return user;
}

async function checkIfUserExists(db: D1Database, email: string) {
	const result = await db
		.prepare('SELECT * FROM Users WHERE Email = ? LIMIT 1')
		.bind(email.toLowerCase())
		.all();
	if (!result.success) {
		console.error('result from database not successful when checking if user exists', result.error);
		throw new Error('result from database not successful when checking if user exists');
	}

	return result.results.length > 0;
}

async function loginUser(db: D1Database, form: SuperValidated<Infer<LoginSchema>>) {
	const result = await db
		.prepare('SELECT * FROM USERS WHERE EMAIL = ? ')
		.bind(form.data.email.toLowerCase())
		.all();
	console.log(result);
	if (result.results.length !== 1) {
		throw new Error('User not found');
	}

	const users = result.results as User[];
	console.log(users);

	if (!(await verifyPassword(users[0].Password, form.data.password))) {
		throw new Error('Password incorrect');
	}

	return result;
}

async function getUserBySession(db: D1Database, kv: KVNamespace, event: RequestEvent) {
	const token = event.cookies.get('session') ?? null;
	if (!token) {
		return null;
	}

	const userSession = await validateSessionToken(kv, token);
	if (!userSession) {
		deleteSessionTokenCookie(event);
		return null;
	}

	setSessionTokenCookie(event, token, userSession.expiresAt);

	const resultUser = await db
		.prepare('SELECT * FROM Users WHERE Id = ?')
		.bind(userSession.userId)
		.first();
	if (!resultUser) {
		//throw new Error('User with Id not found in database');
		return null;
	}

	const user = resultUser as User;
	return user;
}

async function updateUserData(
	db: D1Database,
	form: SuperValidated<Infer<ChangeUserDataSchema>>,
	userId: number
) {
	const result = await db
		.prepare('UPDATE Users SET FirstName = ?, LastName = ?, Email = ? WHERE Id = ?')
		.bind(form.data.firstName, form.data.lastName, form.data.email.toLowerCase(), userId)
		.run();
	if (!result.success) {
		throw new Error('update of user data not successful');
	}

	const resultUser = await db.prepare('SELECT * FROM Users WHERE Id = ?').bind(userId).first();
	if (!resultUser) {
		throw new Error('User with Id not found in database');
	}

	const user = resultUser as User;
	return user;
}

async function updateUserNewsletterSettings(
	db: D1Database,
	form: SuperValidated<Infer<ChangeNewsletterSchema>>,
	userId: number
) {
	const result = await db
		.prepare('UPDATE Users SET ReceiveNewsletter = ? WHERE Id = ?')
		.bind(form.data.receiveNewsletter, userId)
		.run();
	if (!result.success) {
		throw new Error('update of user newsletter receive settings not successful');
	}

	const resultUser = await db.prepare('SELECT * FROM Users WHERE Id = ?').bind(userId).first();
	if (!resultUser) {
		throw new Error('User with Id not found in database');
	}

	const user = resultUser as User;
	return user;
}

export {
	registerNewUser,
	checkIfUserExists,
	loginUser,
	getUserBySession,
	updateUserData,
	updateUserNewsletterSettings
};
