<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import ImageUpload from '$lib/base/ImageUpload.svelte';
	import Input from '$lib/base/Input.svelte';
	import InputBig from '$lib/base/TextArea.svelte';
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import IconScanButton from '$lib/buttons/IconScanButton.svelte';
	import SaveButton from '$lib/buttons/SaveButton.svelte';

	import { goto } from '$app/navigation';
	import { scannedArticleNumber, showScanDialog } from '../../../Store';
	$: articleNumber = '';
	scannedArticleNumber.subscribe((e) => {
		articleNumber = e as string;
	})
</script>

<h1 class="text-3xl pl-5 pt-5 pb-2.5">Artikel Anlegen</h1>

<div class="px-5 pt-5 flex flex-col gap-5">
	<form
		method="POST"
		use:enhance={({ formElement, formData, action, cancel }) => {
			return async ({ result }) => {
				goto('/article');
			};
		}}
	>
		<ImageUpload />
		<Input name="name" id="name" lable="Name" placeholder="Titel" />
		<InputBig name="description" id="description" lable="Beschreibung" placeholder="Beschreibung" />
		<div class="flex">
			<Input bind:value={articleNumber} name="articleNumber" id="articleNumber" lable="Artikelnummer" placeholder="123456789">
				<IconScanButton on:click={(e) => {
					e.preventDefault()
					$showScanDialog = true
					}}/>
			</Input>
		</div>
		<div class="flex justify-end gap-3 pt-6">
			<CancleButton />
			<SaveButton />
		</div>
	</form>
</div>
