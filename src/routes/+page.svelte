<script>
	import DeleteDialog from "$lib/dialogs/DeleteDialog.svelte";


	let showModal = false;
</script>

<button on:click={() => (showModal = true)}> show modal </button>

<DeleteDialog bind:showModal>
</DeleteDialog>
