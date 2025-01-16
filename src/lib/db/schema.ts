import { z } from 'zod';

const minPasswordLength = 8;

export const SignupSchema = z
	.object({
		firstName: z.string().min(1).max(64),
		lastName: z.string().min(1).max(64),
		email: z.string().email(),
		receiveNewsletter: z.boolean().optional().default(false),
		agreeToTerms: z.boolean(),
		password: z
			.string()
			.min(
				minPasswordLength,
				`Das Passwort muss mindestens ${minPasswordLength} Zeichen beinhalten`
			)
			.max(64),
		confirmPassword: z
			.string()
			.min(
				minPasswordLength,
				`Das Passwort muss mindestens ${minPasswordLength} Zeichen beinhalten`
			)
			.max(64)
	})
	.superRefine(({ confirmPassword, password, agreeToTerms }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Das Passwort stimmt nicht überein',
				path: ['confirmPassword']
			});
		}

		if (!agreeToTerms) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Sie müssen den Nutzungsbedingungen zustimmen',
				path: ['agreeToTerms']
			});
		}
	});

export type SignupSchema = typeof SignupSchema;

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5).max(100)
});

export type LoginSchema = typeof LoginSchema;

export const ChangeUserDataSchema = z.object({
	firstName: z.string().min(1).max(64),
	lastName: z.string().min(1).max(64),
	email: z.string().email()
});
export type ChangeUserDataSchema = typeof ChangeUserDataSchema;

export const ChangeNewsletterSchema = z.object({
	receiveNewsletter: z.boolean().optional().default(false)
});

export type ChangeNewsletterSchema = typeof ChangeNewsletterSchema;
