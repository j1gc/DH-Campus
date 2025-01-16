<script lang="ts">
	import SignUpForm from '$lib/components/SignUpForm.svelte';

	let { data } = $props();
</script>

<div class="flex flex-col max-sm:mx-[10vw]">
	<h1 class="text-2xl font-bold max-lg:mb-9 sm:pb-5 sm:text-5xl lg:pb-10 lg:text-7xl">
		Werde ein Mitglied
	</h1>
	<SignUpForm data={data.form} />
</div>
