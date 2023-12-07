<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let search: string = '';
	import QRCodeIcon from '~icons/mdi/qrcode';
	import SearchIcon from '~icons/mdi/search';
	import Button from './buttons/Button.svelte';
	import ScanDialog from './dialogs/ScanDialog.svelte';


	let dialog: HTMLDialogElement;

	let showModal = false

	const onScanned = (e: CustomEvent<string>) => {
		dialog.close();
		dispatch('scanned', e.detail)
	}
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
	<Button on:click={() => {
		showModal = true
	}}>
		<QRCodeIcon style="font-size: 2em;" />
	</Button>
	<Button
		className=" text-primary shadow-md border rounded-full border-primary bg-background text-white p-2 px-3 aspect-square"
		on:click={() => dispatch('search', search)}><SearchIcon /></Button
	>
	<ScanDialog bind:dialog {showModal} on:scanned={onScanned}/>
</div>
