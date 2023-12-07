<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AddToOrderListButton from '$lib/buttons/AddToOrderListButton.svelte';
	import DeleteButton from '$lib/buttons/IconDeleteButton.svelte';
	import EditButton from '$lib/buttons/IconEditButton.svelte';
	import type StockTaking from '../../models/stockTaking';
	import PlusButton from '$lib/buttons/PlusButton.svelte';
	import { stringify } from 'uuid';
	export let stockTaking: StockTaking;
	const dispatch = createEventDispatcher<{ delete: string; count: string }>();
</script>

<div class="shadow-md flex border border-tertiary rounded-lg p-3">
	<div class="flex-row flex-auto">
		<div class="flex-row flex-auto">
			<div class="text-text1">{stockTaking.name}</div>
		</div>
		<div class="flex gap-3 pt-1">
			<EditButton />
			<DeleteButton on:click={() => dispatch('delete', stockTaking.uuid)} />
		</div>
	</div>
	<PlusButton on:click={() => dispatch('count', stockTaking.uuid)} />
</div>
