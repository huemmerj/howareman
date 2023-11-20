<script lang="ts">
	export let value: string = '';
	export let lable: string = '';
	export let placeholder: string = '';
	export let id: string;
	export let name: string;
</script>

<div>
	<label for={id} class="block text-sm font-medium text-text2 ite">{lable}</label>
	<textarea
		{name}
		{value}
		{id}
		class="shadow-md items-start flex h-52 bg-gray-50 border border-tertiary text-text1 text-sm rounded-lg w-full p-2.5"
		{placeholder}
	/>
</div>
