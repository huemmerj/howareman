<script lang="ts">
	import Button from './Button.svelte';

	export let value: number = 1;
	const increment = () => {
		value++;
	};
	const decrement = () => {
		if (value > 0) value--;
	};
</script>

<div class="flex">
	<Button on:click={decrement} className="px-4 rounded-l-full">-</Button>
	<input {value} class="shadow-md border-tertiary flex text-center border-y w-9" />
	<Button on:click={increment} className="px-4 rounded-r-full">+</Button>
</div>
