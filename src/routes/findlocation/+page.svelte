<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button/index.ts';
	import { Slider } from '$lib/components/ui/slider/index.ts';
	import { Input } from '$lib/components/ui/input/index.js';
	import { buildings } from '$lib/utils.ts';

	let currentCapacity = $state([0]);
	let currentSearch = $state('');

	function updateCapacityIndicator(currentCapacity: number[]) {
		if (currentCapacity[0] === 21) {
			return '20+';
		}

		return currentCapacity[0].toString();
	}

	function updateBuildingsMatchingFilter() {
		// filter by capacity first
		let buildingsMatchingFilter = buildings.filter(
			(building) => building.capacity >= currentCapacity[0]
		);

		// filter by search term by name or address
		return buildingsMatchingFilter.filter(
			(building) =>
				building.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
				building.address.toLowerCase().includes(currentSearch.toLowerCase())
		);
	}

	function toValidUrl(name: string) {
		return name.replace(' ', '-');
	}
</script>

<div class="flex gap-4">
	<Input
		bind:value={currentSearch}
		type="search"
		placeholder="Name oder Adresse eines Coworking Spaces"
		class="max-w-xs"
	/>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<span
				class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-base font-semibold
				ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
				focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-lg:max-w-[40vw] lg:text-lg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
			>
				Kapazität
			</span>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-[12rem] font-normal">
			<DropdownMenu.Group>
				<p>Anzahl der Plätze: {updateCapacityIndicator(currentCapacity)}</p>
				<DropdownMenu.Item
					><Slider
						bind:value={currentCapacity[0]}
						max={21}
						step={1}
						type="single"
					/></DropdownMenu.Item
				>
				<div class="flex justify-between text-DHGray">
					<span>1</span>
					<span>20+</span>
				</div>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<p class="pb-2 pt-10 text-lg font-semibold">
	{updateBuildingsMatchingFilter().length} Ergebnisse
</p>
<div class="flex">
	<div class="flex flex-col gap-y-6">
		{#each updateBuildingsMatchingFilter() as building}
			<a
				href="/buildings/{toValidUrl(building.name)}"
				class="flex gap-x-8 rounded-lg border border-gray-100 pr-4"
			>
				<img
					src={building.imgaddr}
					alt={building.name +
						' at:' +
						building.address +
						' with capacity:' +
						building.capacity +
						' with benefits:' +
						building.benefits +
						' for price:' +
						building.price +
						'per hour'}
					class="rounded-l-lg object-cover max-lg:max-w-24 lg:h-40 lg:w-64"
				/>

				<div class="flex-col justify-center lg:flex">
					<h2 class="font-semibold lg:text-2xl">{building.name}</h2>
					<p class="text-sm text-DHGray lg:pb-5">{building.address}</p>
					<p class="text-sm text-DHGray">Freie Plätze: {building.capacity}</p>
					<ul
						class="line-clamp-1 flex gap-x-2 text-sm max-lg:hidden max-lg:max-w-[20ch]"
						aria-label="Building benefits"
					>
						{#each building.benefits as benefit, i}
							<li>
								<div class="flex gap-x-1">
									<p class="font-semibold">{benefit}</p>
									{#if i != building.benefits.length - 1}
										<span aria-hidden="true">*</span>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
					<p class="text-sm text-DHGray">Ab {building.price}/Platz/Stunde</p>
				</div>
			</a>
		{/each}
	</div>
</div>
