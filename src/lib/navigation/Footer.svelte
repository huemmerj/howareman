<script lang="ts">
	import HouseIcon from '~icons/mdi/home-outline';
	import ListIcon from '~icons/ic/outline-list-alt';
	import InventoryIcon from '~icons/ic/outline-inventory-2';
	import FooterItem from './FooterItem.svelte';

	const test = true;
</script>

<footer class="text-text1 bg-background fixed flex flex-row justify-center bottom-0 w-full pt-2">
	<FooterItem name="Artikel" href="/article">
		<HouseIcon />
	</FooterItem>
	<FooterItem name="Bestellungen" href="/orderlist">
		<ListIcon />
	</FooterItem>
	<FooterItem name="Inventur" href="/inventory">
		<InventoryIcon />
	</FooterItem>
</footer>
