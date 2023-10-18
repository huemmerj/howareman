<script>
	import Button from '$lib/buttons/Button.svelte';
	import UploadIcon from '~icons/ic/baseline-upload';
</script>

<div class="flex gap-3">
	<img class="rounded-lg" src="https://via.placeholder.com/120" alt="Artikelbild" />
	<Button className="w-full flex flex-col justify-center items-center"
		><UploadIcon style="font-size: 2em" />
		<p class="text-text3 text-xs">Klicke, um ein Bild Hochzuladen</p>
	</Button>
</div>
