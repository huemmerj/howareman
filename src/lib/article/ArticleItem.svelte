<script lang="ts">
	import AddToOrderListButton from '$lib/buttons/AddToOrderListButton.svelte';
	import DeleteButton from '$lib/buttons/DeleteButton.svelte';
	import EditButton from '$lib/buttons/EditButton.svelte';
</script>
<div class="shadow flex my-5 border border-slate-950 rounded-xl">
    <div class="p-3 flex-auto w-32">
        <img class="rounded-xl" src="https://via.placeholder.com/150" alt="Artikelbild">
    </div>
    <div class="flex-row flex-auto pt-2 w-64">
        <div class="flex-row flex-auto">
            <div class="text-text1">
                Name
            </div>
            <div class="text-sm text-text2">
                Beschreibung
            </div>
            <div class="text-xs text-text3">
                Artikelnummer
            </div>
        </div>
        <div class="flex gap-3 pt-1">
            <EditButton/>
            <DeleteButton/>
            <AddToOrderListButton/>
        </div>
    </div>
</div>