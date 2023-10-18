<script>
	import ImageUpload from '$lib/base/ImageUpload.svelte';
	import Input from '$lib/base/Input.svelte';
	import InputBig from '$lib/base/TextArea.svelte';
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import IconScanButton from '$lib/buttons/IconScanButton.svelte';
	import SaveButton from '$lib/buttons/SaveButton.svelte';
</script>

<h1 class="text-3xl pl-5 pt-5 pb-2.5">Artikel Anlegen</h1>

<div class="px-5 pt-5 flex flex-col gap-5">
	<ImageUpload />
	<Input id="name" lable="Name" placeholder="Max" />
	<InputBig id="description" lable="Beschreibung" placeholder="Max Mustermann" />
	<div class="flex">
		<Input id="articleNumber" lable="Artikelnummer" placeholder="123456789">
			<IconScanButton />
		</Input>
	</div>
	<div class="flex justify-end gap-3 pt-6">
		<CancleButton />
		<SaveButton />
	</div>
</div>
