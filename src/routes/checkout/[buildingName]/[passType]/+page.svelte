<script lang="ts">
	import { page } from '$app/state';
	import { buildings } from '$lib/utils.ts';
	import Button from '$lib/components/ui/button/button.svelte';

	const buildingNameUrl = page.params.buildingName;
	const buildingName = buildingNameUrl.replace('-', ' ');
	const passtype = page.params.passType;

	const building = buildings.find((building) => building.name === buildingName);
	const pass = building?.passes.find((pass) => pass.type === passtype);

	let amount = $state(1);
</script>

{#if building && pass}
	<h1 class="text-2xl font-bold max-lg:pb-4 sm:text-4xl lg:text-7xl">{buildingName}</h1>
	<h2 class="pb-8 pt-5 font-semibold lg:text-2xl">{pass.type}</h2>
	<p>{pass.description}</p>

	<p class="pb-5 pt-10 font-semibold lg:text-2xl">Menge</p>
	<div class="flex items-center gap-x-4">
		<Button
			variant="outline"
			class=""
			onclick={() => {
				if (amount > 1) {
					amount = amount - 1;
				}
			}}>-1</Button
		>
		<p>{amount}</p>
		<Button
			variant="outline"
			class=""
			onclick={() => {
				amount = amount + 1;
			}}>+1</Button
		>
	</div>

	<p class="mt-9 pb-2">Kosten: {amount * Number(pass.price)}€</p>
	<Button variant="default">Buchen</Button>
{:else}
	<p>No pass found for this building</p>
{/if}
