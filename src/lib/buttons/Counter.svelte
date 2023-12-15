<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let value: number = 1;
	const increment = () => {
		value++;
		onChange();
	};
	const decrement = () => {
		if (value > 0) value--;
		onChange();
	};


	const dispatch = createEventDispatcher();
	const onChange = () => {
		dispatch('change', value);
	};
</script>

<div class="flex">
	<Button on:click={decrement} className="px-4 rounded-l-full">-</Button>
	<input type="number" on:change={onChange} bind:value={value} class="shadow-md border-tertiary flex text-center border-y w-9" />
	<Button on:click={increment} className="px-4 rounded-r-full">+</Button>
</div>
