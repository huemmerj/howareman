<script>
	import QrCodeScanner from "$lib/QRCodeScanner.svelte";

    $: scannedCode = "";
</script>

<QrCodeScanner bind:scannedCode= {scannedCode}/>
{scannedCode}

<style lang="postcss">
    :global(html){
        background-color: theme(colors.gray.100);
    }
</style>