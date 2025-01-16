import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(
	kv: KVNamespace,
	token: string,
	userId: number
): Promise<Session> {
	const encodedToken = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
	const sessionId = encodeHexLowerCase(new Uint8Array(encodedToken));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
	};
	await kv.put(
		`session:${sessionId}`,
		JSON.stringify({
			id: sessionId,
			userId: userId,
			expiresAt: Math.floor(session.expiresAt.getTime() / 1000)
		}),
		{ expiration: Math.floor(session.expiresAt.getTime() / 1000) }
	);
	return session;
}

export async function validateSessionToken(
	kv: KVNamespace,
	token: string
): Promise<Session | null> {
	const encodedToken = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
	const sessionId = encodeHexLowerCase(new Uint8Array(encodedToken));
	const item = await kv.get(`session:${sessionId}`);
	if (item === null) {
		console.log('item is null');
		return null;
	}
	console.log('item', item);
	const result = JSON.parse(item);
	const session: Session = {
		id: result.id,
		userId: result.userId,
		expiresAt: new Date(result.expiresAt * 1000)
	};

	// renew session if it's within days of expiration
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 3) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
		await kv.put(
			`session:${sessionId}`,
			JSON.stringify({
				id: session.id,
				userId: session.userId,
				expiresAt: Math.floor(session.expiresAt.getTime() / 1000)
			}),
			{ expiration: Math.floor(session.expiresAt.getTime() / 1000) }
		);
	}
	console.log('session', session);
	return session;
}

export async function invalidateSession(kv: KVNamespace, sessionId: string): Promise<void> {
	await kv.delete(`session:${sessionId}`);
}

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

// sveltekit automatically sets the session cookie secure flag when deployed to production
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}
