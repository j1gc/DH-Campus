<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Menu } from 'lucide-svelte';
	import '../app.css';
	import { cn } from '$lib/utils';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { onMount } from 'svelte';
	let { data, children } = $props();
	console.log(data.userdata);

	let navOpen = $state(false);

	onMount(async () => {
		setTimeout(function () {
			alert('Das ist nur eine Demo Website. Es gibt keine DH-Campus GmbH ');
		}, 250);
	});
</script>

<!--HTML wird zu jeder in diesen sowie jeden unterverzeichnis hinzugefügt. Inhalt der Oages wird innerhalb "{@render children()}" gerendert-->

<!--Wird zum Head für jede Seite  hinzugefügt-->
<svelte:head>
	<title>DH-Campus.com</title>
</svelte:head>

<main class="mx-10 lg:mx-[2vw] 2xl:mx-[4vw] 3xl:mx-[6vw]">
	<div id="top"></div>

	<!-- Navigation -->
	<nav
		class="mt-10 flex justify-between border-b-[1.5px] border-DHGray pb-8 max-lg:mb-10 lg:mb-14 2xl:my-[2vw]"
	>
		<div class={cn(`items-center justify-center gap-x-2 lg:gap-x-12 ${navOpen ? '' : 'flex'}`)}>
			<!--Burger menü für mobile geräte-->
			<Menu
				class="lg:hidden"
				onclick={() => {
					navOpen = !navOpen;
				}}
			/>
			<header>
				<a class="flex lg:gap-5" href="/">
					<img src="/favicon.svg" alt="DH-Campus Logo" class="w-5" />
					<p
						class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md p-0 text-lg font-semibold text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
					>
						DH-Campus.com
					</p>
				</a>
			</header>

			<div class="text-lg font-semibold text-DHGray max-lg:hidden">/</div>
			<!-- Navigation Links  -->
			<!-- Burger menu logic for mobile -->
			<div class={cn(`lg:flex lg:gap-x-6 ${navOpen ? '' : 'max-lg:hidden'}`)}>
				<Button href="/solutions" variant="link" class="p-0 text-lg font-semibold lg:text-DHGray"
					>Lösungen</Button
				>
				<Button href="/findlocation" variant="link" class="p-0 text-lg font-semibold"
					>Standort suchen</Button
				>
				<Button href="/company" variant="link" class="p-0 text-lg font-semibold lg:text-DHGray"
					>Unternehmen</Button
				>
			</div>
		</div>
		{#if !data.userdata.IsLogedIn}
			<div class="flex items-center justify-center gap-x-6">
				<Button
					href="/register"
					variant="outline"
					class="bg-gray-50 font-semibold max-lg:max-w-[32vw] lg:text-lg [@media(max-width:350px)]:hidden [@media(max-width:400px)]:text-xs"
					>Werde ein Mitglied</Button
				>

				<Button href="/login" variant="link" class="text-lg font-semibold max-lg:hidden"
					>Mitglieder Login</Button
				>
			</div>
		{:else}
			{@render account({
				FirstName: data.userdata.FirstName,
				LastName: data.userdata.LastName,
				Email: data.userdata.Email
			})}
		{/if}
	</nav>

	<!-- Content -->
	<!-- This is where the content of the page will be rendered -->
	<!-- tailwind class sets the footer to apear only at the bottom of the screen -->
	<article class="min-h-screen grow">
		{@render children()}
	</article>

	<!-- Footer -->
	<footer class="mt-9 border-t-[1.5px] border-DHGray">
		<div class="py-8 max-lg:grid max-lg:justify-start lg:flex lg:gap-x-24">
			<p class="pb-2 text-DHGray lg:hidden">Unternehmen</p>
			<Button href="/contact" variant="link" class="p-0 text-base max-lg:justify-start"
				>Impressum</Button
			>
			<Button href="/privacy" variant="link" class="p-0 text-base max-lg:justify-start"
				>Datenschutz</Button
			>
			<!-- No time left for them
			<Button href="/contact" variant="link" class="p-0 text-base max-lg:justify-start"
				>Rechtliches</Button
			>
			<Button href="/contact" variant="link" class="p-0 text-base max-lg:justify-start"
				>Trademarks</Button
			>
				-->
			<Button href="/terms" variant="link" class="p-0 text-base max-lg:justify-start"
				>Nutzungsbedingungen</Button
			>
		</div>
		<p class="text-sm lg:text-base">Copyright © 2024 DH-Campus GmbH</p>
	</footer>
</main>

<!--Snippet für das Benutzerkonto Dropdown Menü um von dort zu den einstellungen etc. zu gelangen-->
{#snippet account(userdata: { FirstName: string; LastName: string; Email: string })}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button
				variant="outline"
				class="bg-gray-50 text-base font-semibold max-lg:max-w-[40vw] lg:text-lg"
				>{userdata.FirstName + ' ' + userdata.LastName}</Button
			>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>
				<p class="font-normal">{userdata.Email}</p>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item
					><a href="/user/profile" class="h-full w-full">Profil</a></DropdownMenu.Item
				>
				<DropdownMenu.Item
					><a href="/user/settings" class="h-full w-full">Einstellungen</a></DropdownMenu.Item
				>
				<DropdownMenu.Item
					><form action="/user/logout" method="post" class="h-full w-full">
						<button type="submit">Abmelden</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}
