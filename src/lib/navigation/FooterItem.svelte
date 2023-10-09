<script lang="ts">
    export let name: string;
    export let href: string;
    import { page } from '$app/stores';
</script>

<div
    class=" flex flex-col text-center flex-1 items-center"
    class:text-primary={$page.route.id == href}
    class:text-text1={$page.route.id !== href}>
    <slot />
    <a class="p-1 pb-2" {href}>{name}</a>
</div>