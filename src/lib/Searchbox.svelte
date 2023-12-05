<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let search: string;
</script>

<div class="flex gap-3">
	<input
		class="shadow-md flex justify-between border border-tertiary w-full rounded-full p-2"
		placeholder="nach was Suchst du?"
		bind:value={search}
		on:keypress={({ key }) => {
			if (key == 'Enter') dispatch('search', search);
		}}
	/>
	<button
		class=" text-primary shadow-md border rounded-full border-primary bg-background text-white p-2"
		on:click={() => dispatch('search', search)}>Suchen</button
	>
</div>
