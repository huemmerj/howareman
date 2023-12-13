<script lang="ts">
	export let value: string = '';
	export let lable: string = '';
	export let placeholder: string = '';
	export let id: string;
	export let name: string;
</script>

<div class="w-full">
	<label for={id} class="block text-sm font-medium text-text2 ite">{lable}</label>
	<div class="flex gap-3">
		<input
			bind:value={value}
			type="text"
			{id}
			class="shadow-md bg-gray-50 border border-tertiary text-text1 text-sm rounded-lg w-full p-2.5"
			{placeholder}
			{name}
		/>
		<slot />
	</div>
</div>
