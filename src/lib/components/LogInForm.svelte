<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { LoginSchema } from '$lib/db/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<LoginSchema>>;

	const form = superForm(data, {
		validators: zodClient(LoginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex flex-col max-sm:mx-[10vw]">
	<h1 class="text-2xl font-bold max-lg:mb-9 sm:pb-5 sm:text-5xl lg:pb-10 lg:text-7xl">Einloggen</h1>
	<form method="POST" autocomplete="on" use:enhance class="max-w-[40rem]">
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>E-Mail Adresse</Form.Label>
				<Input autocomplete="email" {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Passwort</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Bestätigen</Form.Button>
	</form>
</div>
