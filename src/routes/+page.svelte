<script>
	import QrCodeScanner from "$lib/QRCodeScanner.svelte";

    $: scannedCode = "";
</script>

<QrCodeScanner scannedCode= {scannedCode}/>
{scannedCode}