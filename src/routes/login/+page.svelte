<script>
	import LogInForm from '$lib/components/LogInForm.svelte';

	let { data } = $props();
</script>

<LogInForm data={data.form} />
