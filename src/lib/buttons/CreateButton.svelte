<script lang="ts">
	import A from './A.svelte';
	export let href: string;
</script>

<A {href} className="text-inverted border-transparent bg-primary px-3">Anlegen</A>
