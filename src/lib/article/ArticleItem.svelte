<script lang="ts">
    import EditIcon from '~icons/mdi/edit-outline'
    import DeleteIcon from '~icons/mdi/delete-outline'
    import AddIcon from '~icons/mdi/plus-outline'
</script>
<div class="flex my-5 border border-slate-950 rounded-xl">
    <div class="p-3 flex-auto w-32">
        <img class="rounded-xl" src="https://via.placeholder.com/150" alt="Artikelbild">
    </div>
    <div class="flex-row flex-auto pt-2 w-64">
        <div class="flex-row flex-auto">
            <div class="font-bold">
                Name
            </div>
            <div class="text-sm font-medium">
                Beschreibung
            </div>
            <div class="text-xs font-light">
                Artikelnummer
            </div>
        </div>
        <div class="flex">

            <button><EditIcon/></button>
            <button><DeleteIcon/></button>
            <button><AddIcon/></button>
        </div>
    </div>
</div>