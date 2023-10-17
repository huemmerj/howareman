<script lang="ts">
    
	import CancleButton from "$lib/buttons/CancleButton.svelte";
    import DeleteButton from "$lib/buttons/DeleteButton.svelte";
	import { createEventDispatcher } from "svelte";
	import Dialog from "./Dialog.svelte";
	import OrderButton from "$lib/buttons/OrderButton.svelte";
	import Counter from "$lib/buttons/Counter.svelte";

	export let showModal: Boolean; // boolean

	export let dialog: HTMLDialogElement; // HTMLDialogElement
    let dispatch = createEventDispatcher();
</script>


<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
        <p class="text-text1 ">Artikel Zur Bestellliste hinzufügen</p>
    </div>
    <div slot="body">
        <Counter/>
    </div>
    <div slot="footer">
        <CancleButton on:click={() => dialog.close()}/>
        <OrderButton on:click={() => dispatch("save")}/>
    </div>
</Dialog>
