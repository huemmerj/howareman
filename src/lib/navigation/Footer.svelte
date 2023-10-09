<script lang="ts">
 import HouseIcon from '~icons/mdi/home-outline'
 import ListIcon from '~icons/ic/outline-list-alt'
 import Inventory from '~icons/ic/outline-inventory-2'
 import { page } from '$app/stores';

 const test = true;
</script>
<footer class="text-text1 bg-background fixed flex flex-row  justify-center bottom-0 w-full">
    <div
        class="text-text1 flex flex-col text-center flex-1 items-center"
        class:text-primary={$page.route.id == "/article"}>
        <HouseIcon style="font-size: 1.5em"/>
        <a class=" p-1 pb-2" href="/article">Artikel</a>
    </div>
    <div
        class="text-text1 flex flex-col text-center flex-1 items-center"
        class:text-primary={$page.route.id == "/orderlist"}>
        <ListIcon style="font-size: 1.5em"/>
        <a class="p-1 pb-2" href="/orderlist">Bestellliste</a>
    </div>
    <div
        class="text-text1 flex flex-col text-center flex-1 items-center"
        class:text-primary={$page.route.id == "/inventory"}>
        <Inventory style="font-size: 1.5em"/>
        <a class="p-1 pb-2" href="/inventory">Inventuren</a>
    </div>
</footer>