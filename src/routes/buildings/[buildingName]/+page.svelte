<script lang="ts">
	import { page } from '$app/state';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Building, Star } from 'lucide-svelte';
	import { buildings } from '$lib/utils.ts';
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';

	const buildingName = page.params.buildingName;

	const building = buildings.find((building) => building.name === buildingName);
</script>

{#if building}
	<div class="flex pb-10">
		<div class="xl:max-w-[60%]">
			<img
				class="h-[20%] w-[80%] rounded-lg object-cover lg:h-[30rem] lg:w-[60rem]"
				src={building.imgaddr}
				alt={building.name}
				srcset=""
			/>
			<h1 class="pt-11 text-2xl font-bold max-lg:pb-4 sm:text-4xl lg:text-7xl">{building.name}</h1>
			<div class="items-center gap-x-8 pb-20 pt-5 lg:flex">
				<div class="flex items-center gap-x-2">
					<Star fill="black" class="size-4" />
					<p>{building.rating}</p>
				</div>
				<Dialog.Root>
					<Dialog.Trigger class={buttonVariants({ variant: 'ghost' }) + ' p-0 underline'}
						><p>{building.numberOfReviews} Bewertungen</p></Dialog.Trigger
					>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{building.numberOfReviews} Bewertungen</Dialog.Title>
							<Dialog.Description>
								Siehe dir an was andere über diesen Coworking Space sagen.
							</Dialog.Description>
						</Dialog.Header>
						<p>TODO: add reviews</p>
					</Dialog.Content>
				</Dialog.Root>
				<p>Plätze für {building.capacity}</p>
				<p>{building.address}</p>
			</div>
			<p class="prose text-black lg:max-w-[110ch]">{building.additionalInfo}</p>

			<h2 class="pb-5 pt-10 font-semibold lg:text-2xl">Benefits</h2>
			<div class="grid gap-10 lg:grid-cols-3">
				{#each building.benefits as benefit}
					<p>{benefit}</p>
				{/each}
			</div>

			<h2 class="pb-5 pt-20 font-semibold lg:text-2xl">Räume</h2>
			<table class="w-full table-auto border-collapse">
				<thead>
					<tr class="text-left">
						<th class="py-2">Passtyp</th>
						<th class="px-4 py-2">Beschreibung</th>
						<th class="px-4 py-2">Preis</th>
						<th class="px-4 py-2"></th>
					</tr>
				</thead>
				<tbody>
					{#each building.passes as pass}
						<tr>
							<td class="py-2 max-lg:text-sm">{pass.type}</td>
							<td class="px-4 py-2 max-lg:text-sm">{pass.description}</td>
							<td class="px-4 py-2 max-lg:text-sm">{pass.price}</td>
							<td class="px-4 py-2 max-lg:text-sm">
								<Button
									variant="outline"
									class="bg-gray-50 text-base font-semibold max-lg:size-1 max-lg:max-w-[40vw] lg:text-lg"
									href="/checkout/{building.name}/{pass.type}"
								>
									Buchen
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{:else}
	<p>Building not found</p>
{/if}