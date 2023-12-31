<script>
	import Toast from '$lib/Toast.svelte';
import ScanDialog from '$lib/dialogs/ScanDialog.svelte';
  import Footer from '$lib/navigation/Footer.svelte';
	import '../app.css';

	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
</script>

<div>
	<SignedIn>
		<UserButton afterSignOutUrl="/login" />
	</SignedIn>
	<slot />
	<Footer />
	<ScanDialog />
	<Toast />
</div>
