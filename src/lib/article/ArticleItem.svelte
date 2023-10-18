<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import AddToOrderListButton from '$lib/buttons/AddToOrderListButton.svelte';
	import DeleteButton from '$lib/buttons/IconDeleteButton.svelte';
	import EditButton from '$lib/buttons/IconEditButton.svelte';
</script>

<div class="shadow-md flex my-5 border border-tertiary rounded-lg">
	<div class="p-3 flex-auto w-32">
		<img class="rounded-lg" src="https://via.placeholder.com/150" alt="Artikelbild" />
	</div>
	<div class="flex-row flex-auto pt-2 w-64">
		<div class="flex-row flex-auto">
			<div class="text-text1">Name</div>
			<div class="text-sm text-text2">Beschreibung</div>
			<div class="text-xs text-text3">Artikelnummer</div>
		</div>
		<div class="flex gap-3 pt-1">
			<EditButton />
			<DeleteButton on:click={() => dispatch('delete', 1)} />
			<AddToOrderListButton on:click={() => dispatch('addToOrderList')} />
		</div>
	</div>
</div>
