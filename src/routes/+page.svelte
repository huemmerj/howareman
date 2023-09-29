<script>
	import QrCodeScanner from "$lib/QRCodeScanner.svelte";

    $: scannedCode = "";
</script>

<QrCodeScanner bind:scannedCode= {scannedCode}/>
{scannedCode}
