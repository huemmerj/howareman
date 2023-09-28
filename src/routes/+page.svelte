<script>
	import QrCodeScanner from "$lib/QRCodeScanner.svelte";

    let scannedCode = "";
</script>

<QrCodeScanner scannedCode= {scannedCode}/>
{scannedCode}