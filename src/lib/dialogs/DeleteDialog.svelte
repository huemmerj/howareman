<script lang="ts">
    
	import CancleButton from "$lib/buttons/CancleButton.svelte";
    import DeleteButton from "$lib/buttons/DeleteButton.svelte";
	import { createEventDispatcher } from "svelte";
	import Dialog from "./Dialog.svelte";

	export let showModal: Boolean; // boolean

	export let dialog: HTMLDialogElement; // HTMLDialogElement
    let dispatch = createEventDispatcher();
</script>


<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
        <p class="text-text1 ">Wollen Sie den Artikel wirklich Löschen?</p>
    </div>
    <div slot="footer">
        <CancleButton on:click={() => dialog.close()}>Abbrechen</CancleButton>
        <DeleteButton on:click={() => dispatch("delete")}>Löschen</DeleteButton>
    </div>
</Dialog>
