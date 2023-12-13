<script lang="ts">
	import { Html5Qrcode, type Html5QrcodeResult } from 'html5-qrcode';
	import { createEventDispatcher } from 'svelte';
	import { showScanDialog, scannedArticleNumber } from '../../Store';
	const dispatch = createEventDispatcher();
	import Dialog from './Dialog.svelte';

	import { onMount } from 'svelte';
	import Button from '$lib/buttons/Button.svelte';
	let dialog: HTMLDialogElement;

	let html5Qrcode: Html5Qrcode;

	onMount(init);
	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}
	$: if ($showScanDialog) {
		start();
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
		dialog.close();// @todo: remove this line
		scannedArticleNumber.update(() => {
			return decodedText;
		});
	}
	function onScanFailure(error: string) {
		console.warn(`Code scan error = ${error}`);
	}
</script>
<Dialog closeOnMisclick={false} bind:dialog on:close={() => console.log('closed')} bind:showModal={$showScanDialog}>
	<div slot="header">
		<p class="text-text1">Scannen Sie</p>
	</div>
	<div slot="body" class="w-full">
		<main>
			<reader id="reader"/>
		</main>
	</div>
	<div slot="footer">
		<Button on:click={() => {
			dialog.close()
			html5Qrcode.stop()
		}}>
			close
		</Button>
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
