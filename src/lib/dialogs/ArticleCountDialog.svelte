<script lang="ts">
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import Dialog from './Dialog.svelte';
	import Counter from '$lib/buttons/Counter.svelte';
	import Searchbox from '$lib/Searchbox.svelte';

	export let showModal: Boolean; // boolean

	export let dialog: HTMLDialogElement;
</script>

<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
		<p class="text-text1">Artikel zählen</p>
	</div>
	<div slot="body">
		<Searchbox />
	</div>
	<div slot="footer">
		<CancleButton on:click={() => dialog.close()} />
	</div>
</Dialog>
