<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

onMount(() => {
  goto("/article");
});
</script>

<h1 class="mb-4">Home</h1>
<div class="card p-3 pb-1" />
