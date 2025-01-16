<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ChangeUserDataSchema } from '$lib/db/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let formDataProp: SuperValidated<Infer<ChangeUserDataSchema>>;
	export let defaultUserData: { FirstName: string; LastName: string; Email: string };

	const form = superForm(formDataProp, {
		validators: zodClient(ChangeUserDataSchema)
	});

	const { form: formData, enhance } = form;
	// Default values
	formData.set({
		firstName: defaultUserData.FirstName,
		lastName: defaultUserData.LastName,
		email: defaultUserData.Email
	});
</script>

<form method="POST" action="?/UserData" autocomplete="off" use:enhance class="max-w-[40rem]">
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
	<Form.Button>Bestätigen</Form.Button>
</form>
