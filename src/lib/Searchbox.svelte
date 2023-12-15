<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{count: number}>();
	let search: string = '';
	import QRCodeIcon from '~icons/mdi/qrcode';
	import SearchIcon from '~icons/mdi/search';
	import Button from './buttons/Button.svelte';
	import { showScanDialog } from '../Store';

	export let showSearchButton = true;
	export let showScanButton = true;

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
	{#if showScanButton}
	<Button on:click={() => {
		$showScanDialog = true
	}}>
		<QRCodeIcon style="font-size: 2em;" />
	</Button>
	{/if}
	{#if showSearchButton}
		<Button
			className=" text-primary shadow-md border rounded-full border-primary bg-background text-white p-2 px-3 aspect-square"
			on:click={() => dispatch('search', search)}><SearchIcon /></Button
		>
	{/if}
</div>
