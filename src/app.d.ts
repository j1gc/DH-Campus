// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from '$lib/db/types';
import type { Session } from '$lib/server/session';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
