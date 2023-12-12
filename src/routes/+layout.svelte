<script>
	import ScanDialog from '$lib/dialogs/ScanDialog.svelte';
  import Footer from '$lib/navigation/Footer.svelte';
	import '../app.css';

</script>

<div>
	<slot />
	<Footer />
	<ScanDialog />
</div>
