<script>
	import Searchbox from "$lib/Searchbox.svelte";
    import Footer from "$lib/navigation/Footer.svelte";
import "../app.css";    
</script>
<div>
    <Searchbox/>
    <slot/>
    <Footer/>
</div>
