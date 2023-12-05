<script lang="ts">
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import DeleteButton from '$lib/buttons/DeleteButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import Dialog from './Dialog.svelte';

	export let showModal: Boolean;
	export let dialog: HTMLDialogElement;
	export let headline: string;
	let dispatch = createEventDispatcher<{ delete: null }>();
</script>

<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
		<p class="text-text1">{headline}</p>
	</div>
	<div slot="footer">
		<CancleButton on:click={() => dialog.close()}>Abbrechen</CancleButton>
		<DeleteButton
			on:click={() => {
				dispatch('delete');
			}}>Löschen</DeleteButton
		>
	</div>
</Dialog>
