<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/base/Input.svelte';
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import SaveButton from '$lib/buttons/SaveButton.svelte';

	import { goto } from '$app/navigation';
</script>

<h1 class="text-3xl pl-5 pt-5 pb-2.5">Inventur Anlegen</h1>

<div class="px-5 pt-5 flex flex-col gap-5">
	<form
		method="POST"
		use:enhance={({ formElement, formData, action, cancel }) => {
			return async ({ result }) => {
				goto('/stocktaking');
			};
		}}
	>
		<Input name="name" id="name" lable="Name" placeholder="Titel" />
		<div class="flex justify-end gap-3 pt-6">
			<CancleButton on:click={
				(e) => {
					e.preventDefault()
					goto('/stocktaking')}
			}/>
			<SaveButton />
		</div>
	</form>
</div>
