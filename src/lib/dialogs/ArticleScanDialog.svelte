<script lang="ts">
	import { Html5Qrcode, type Html5QrcodeResult } from 'html5-qrcode';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Dialog from './Dialog.svelte';

	import { onMount } from 'svelte';
	export let showModal: Boolean;
	export let dialog: HTMLDialogElement;

	let scannedCode: string;

	let html5Qrcode: Html5Qrcode;

	onMount(init);
	$: if (showModal) {
		start();
	}
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
	}
	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		html5Qrcode.stop();
		dispatch('scanned', decodedText);
		console.log(decodedResult);
	}

	function onScanFailure(error: string) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
		<p class="text-text1">Scannen Sie den Artikel</p>
	</div>
	<div slot="body" class="w-full">
		<main>
			<reader id="reader" />
		</main>
	</div>
</Dialog>

<style>
	reader {
		width: 100%;
		min-height: 500px;
		background-color: black;
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
</style>
