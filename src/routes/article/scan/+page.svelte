<script lang="ts">
	import QrCodeScanner from '$lib/QRCodeScanner.svelte';
	import ArticleScanDialog from '$lib/dialogs/ArticleScanDialog.svelte';

	let articleScanDialog: HTMLDialogElement;

	$: showArticleScanDialog = true;
	let scannedCode: string;
</script>

<ArticleScanDialog
	bind:dialog={articleScanDialog}
	bind:showModal={showArticleScanDialog}
	scannedCode="334"
/>
