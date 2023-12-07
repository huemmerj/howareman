<script lang="ts">
	import ArticleScanDialog from '$lib/dialogs/ScanDialog.svelte';

	let articleScanDialog: HTMLDialogElement;

	$: showArticleScanDialog = true;
</script>

<ArticleScanDialog bind:dialog={articleScanDialog} bind:showModal={showArticleScanDialog} />
