<script lang="ts">
    import EditIcon from '~icons/mdi/edit-outline'
    import DeleteIcon from '~icons/mdi/delete-outline'
    import AddIcon from '~icons/mdi/plus-outline'
</script>
<div class="flex my-2 border border-slate-950 rounded-lg">
    <div>
        <img src="https://via.placeholder.com/150" alt="Artikelbild">
    </div>
    <div class="flex-row">
        <div class="flex-row">
            <div class="pl-2 font-bold">
                Name
            </div>
            <div class="pl-2 text-sm font-medium">
                Beschreibung
            </div>
            <div class="pl-2 text-xs font-light">
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