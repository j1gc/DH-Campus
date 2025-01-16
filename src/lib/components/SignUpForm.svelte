<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { SignupSchema } from '$lib/db/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Checkbox } from './ui/checkbox';
	import { Label } from './ui/label';
	import type { SuperForm, SuperFormData } from 'sveltekit-superforms/client';

	const { data } = $props<{
		data: SuperValidated<Infer<SignupSchema>>;
	}>();

	const form: SuperForm<Infer<SignupSchema>> = superForm(data, {
		validators: zodClient(SignupSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" autocomplete="off" use:enhance class="max-w-[40rem]">
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>Vorname</Form.Label>
			<Input autocomplete="given-name" {...attrs} bind:value={$formData.firstName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Nachname</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>E-Mail Adresse</Form.Label>
			<Input autocomplete="off" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Passwort</Form.Label>
			<Input type="password" autocomplete="off" {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="confirmPassword">
		<Form.Control let:attrs>
			<Form.Label>Passwort bestätigen</Form.Label>
			<Input autocomplete="off" type="password" {...attrs} bind:value={$formData.confirmPassword} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="agreeToTerms">
		<Form.Control let:attrs>
			<Checkbox
				{...attrs}
				bind:checked={$formData.agreeToTerms}
				
			></Checkbox>
			<Label >Ich stimme den Nutzungsbedingungen zu</Label>
			<input name={attrs.name} value={$formData.agreeToTerms} type="hidden" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="receiveNewsletter">
		<Form.Control let:attrs>
			<span>
				<Checkbox {...attrs} bind:checked={$formData.receiveNewsletter}></Checkbox>
				<Label>Newsletter mit Ereignissen, Angebote etc. rund um DH-Campus erhalten</Label>
				<input name={attrs.name} value={$formData.receiveNewsletter} type="hidden" />
			</span>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Bestätigen</Form.Button>
</form>

<!--aria-labelledby="Newsletter-label" id="Newsletter-label", aria-labelledby="Terms-and-Conditions-label" id="Terms-and-Conditions-label"-->
