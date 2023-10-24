<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let className: string = '';
</script>

<button
	on:click
	class={twMerge(
		'hover:opacity-80 hover:shadow-2xl transition-all shadow-md border border-tertiary rounded-lg p-1',
		className
	)}
>
	<slot />
</button>
