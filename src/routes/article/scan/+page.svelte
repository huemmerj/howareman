<script lang="ts">
	import QrCodeScanner from '$lib/QRCodeScanner.svelte';
	let scannedCode: string;
</script>

<QrCodeScanner bind:scannedCode />
{#if scannedCode}
	<p>{scannedCode}</p>
{/if}
