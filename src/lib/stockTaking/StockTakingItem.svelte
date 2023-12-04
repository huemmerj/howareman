<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import AddToOrderListButton from '$lib/buttons/AddToOrderListButton.svelte';
	import DeleteButton from '$lib/buttons/IconDeleteButton.svelte';
	import EditButton from '$lib/buttons/IconEditButton.svelte';
	import type StockTaking from '../../models/stockTaking';
	import PlusButton from '$lib/buttons/PlusButton.svelte';
	export let stockTaking: StockTaking;
</script>

<div class="shadow-md flex border border-tertiary rounded-lg p-3">
	<div class="flex-row flex-auto">
		<div class="flex-row flex-auto">
			<div class="text-text1">{stockTaking.name}</div>
		</div>
		<div class="flex gap-3 pt-1">
			<EditButton />
			<DeleteButton on:click={() => dispatch('delete', 1)} />
		</div>
	</div>
	<PlusButton />
</div>
