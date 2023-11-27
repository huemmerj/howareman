<script lang="ts">
	import { Html5Qrcode, type Html5QrcodeResult } from 'html5-qrcode';
	import { onMount } from 'svelte';

	export let scannedCode: string;
	let scanning = false;

	let html5Qrcode: Html5Qrcode;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 20,
				qrbox: { width: 500, height: 500 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		html5Qrcode.stop();
		scanning = false;
		scannedCode = decodedText;
		console.log(decodedResult);
	}

	function onScanFailure(error: string) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<main>
	<reader id="reader" />
	{#if scanning}
		<button class="border border-white" on:click={stop}>stop</button>
	{:else}
		<button class="border border-white" on:click={start}>start</button>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	reader {
		width: 100%;
		min-height: 500px;
		background-color: black;
	}
</style>
