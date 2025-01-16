<script lang="ts">
	import ChangeUserData from '$lib/components/ChangeUserData.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { ChangeNewsletterSchema } from '$lib/db/schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';

	let { data } = $props();

	const changeNewsletter = superForm(data.changeNewsletter, {
		validators: zodClient(ChangeNewsletterSchema)
	});

	const { form: changeNewsletterData, enhance } = changeNewsletter;
	// Default values
	changeNewsletterData.set({
		receiveNewsletter: data.userdata.ReceiveNewsletter
	});
</script>

<!--Settings-->
<div class="flex flex-col max-sm:mx-[10vw]">
	<div class="pb-20">
		<h1 class="text-2xl font-bold max-lg:mb-9 sm:pb-5 sm:text-5xl lg:pb-10 lg:text-7xl">
			Einstellungen
		</h1>
		<p class=" text-DHGray">Hier können sie Änderungen an ihren Einstellungen vornehmen</p>
	</div>
	<!--Benutzerdaten ändern-->
	<div class="pb-20">
		<h2 class=" text-xl font-bold max-lg:mb-9 sm:pb-3 sm:text-3xl lg:pb-5 lg:text-5xl">
			Benutzerdaten änderen
		</h2>
		<p class="pb-10 text-DHGray">Hier können sie ihre Benutzerdaten ändern</p>
		<ChangeUserData formDataProp={data.changeUserData} defaultUserData={data.user} />
	</div>
	<!--Newslettereinstellung-->
	<div>
		<h2 class=" text-xl font-bold max-lg:mb-9 sm:pb-3 sm:text-3xl lg:pb-5 lg:text-5xl">
			Newsletter
		</h2>
		<p class="pb-10 text-DHGray">
			Hier können sie sich für unseren Newsletter anmelden oder abmelden
		</p>

		<div class="flex items-center gap-x-2">
			<form
				method="POST"
				action="?/Newsletter"
				autocomplete="off"
				use:enhance
				class="max-w-[40rem]"
			>
				<Form.Field form={changeNewsletter} name="receiveNewsletter">
					<Form.Control let:attrs>
						<Checkbox
							{...attrs}
							bind:checked={$changeNewsletterData.receiveNewsletter}
							aria-labelledby="Newsletter-label"
						></Checkbox>
						<Label id="Newsletter-label"
							>Newsletter mit Ereignissen, Angebote etc. rund um DH-Campus erhalten</Label
						>
						<input
							name={attrs.name}
							value={$changeNewsletterData.receiveNewsletter}
							type="hidden"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Bestätigen</Form.Button>
			</form>
		</div>
	</div>
</div>
