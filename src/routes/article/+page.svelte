<script>
	import ArticleItem from "$lib/article/ArticleItem.svelte";
	import DeleteDialog from "$lib/dialogs/DeleteDialog.svelte";


    let onDeleteConfirm = () => {
        console.log("delete confirmed");
        showModal = false;
    }
	$:  showModal = false;
</script>
<div class="p-5 flex-row">
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <DeleteDialog bind:showModal on:delete={onDeleteConfirm} />
</div>