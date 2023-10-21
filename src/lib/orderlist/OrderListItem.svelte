<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import AddToOrderListButton from '$lib/buttons/AddToOrderListButton.svelte';
	import DeleteButton from '$lib/buttons/IconDeleteButton.svelte';
	import EditButton from '$lib/buttons/IconEditButton.svelte';
	import Counter from '$lib/buttons/Counter.svelte';
	import RemoveButton from '$lib/buttons/RemoveButton.svelte';
</script>

<div class="shadow-md flex border border-tertiary rounded-lg gap-3 p-3">
	<div class="flex items-center">
		<img class="rounded-lg" src="https://via.placeholder.com/150" alt="Artikelbild" />
	</div>
	<div class="flex-row flex-auto w-64">
		<div class="flex-row flex-auto">
			<div class="text-text1">Name</div>
			<div class="text-sm text-text2">Beschreibung</div>
			<div class="text-xs text-text3">Artikelnummer</div>
		</div>
		<div class="flex gap-3 pt-1">
			<Counter />
			<RemoveButton />
		</div>
	</div>
</div>
