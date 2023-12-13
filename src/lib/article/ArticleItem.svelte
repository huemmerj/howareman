<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	import AddToOrderListButton from '$lib/buttons/AddToOrderListButton.svelte';
	import DeleteButton from '$lib/buttons/IconDeleteButton.svelte';
	import EditButton from '$lib/buttons/IconEditButton.svelte';
	import type Article from '../../models/article';
	export let article: Article;
	export let small: boolean = false;
</script>

<div class="shadow-md flex border border-tertiary rounded-lg">
	<div class="p-3 flex-auto">
		<img class="rounded-lg" src="https://via.placeholder.com/150" alt="Artikelbild" />
	</div>
	<div class="flex-row flex-auto pt-2 w-64">
		<div class="flex-row flex-auto">
			<div class="text-text1">{article.name}</div>
			<div class="text-sm text-text2">{article.description}</div>
			<div class="text-xs text-text3">{article.articleNumber}</div>
		</div>
		{#if !small}
			<div class="flex gap-3 pt-1">
				<EditButton />
				<DeleteButton on:click={() => dispatch('delete', 1)} />
				<AddToOrderListButton on:click={() => dispatch('addToOrderList')} />
			</div>
		{/if}

	</div>
</div>
