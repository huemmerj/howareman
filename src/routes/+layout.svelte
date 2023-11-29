<script>
	import ScannButton from '$lib/ScannButton.svelte';
	import Searchbox from '$lib/Searchbox.svelte';
	import Footer from '$lib/navigation/Footer.svelte';
	import '../app.css';
</script>

<div>
	<slot />
	<Footer />
</div>
