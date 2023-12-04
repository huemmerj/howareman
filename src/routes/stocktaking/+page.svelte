<script lang="ts">
	import Searchbox from '$lib/Searchbox.svelte';
	import CreateButton from '$lib/buttons/CreateButton.svelte';
	import StockTakingItem from '$lib/stockTaking/StockTakingItem.svelte';
	import type StockTaking from '../../models/stockTaking';
	export let data: { data: StockTaking[] };
</script>

<div class="p-5 flex-row">
	<h1 class="text-3xl pt-5 pb-2.5">Inventur</h1>
	<Searchbox />
	<div class="flex justify-end pt-5 pb-2.5">
		<CreateButton href="stocktaking/create" />
	</div>

	<div class="flex flex-col gap-5">
		{#each data.data as stockTaking}
			<StockTakingItem {stockTaking} />
		{/each}
	</div>
</div>
