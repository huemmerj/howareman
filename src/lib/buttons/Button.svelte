<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    export let className: string = ""
</script>
<button
    on:click
    class={twMerge("shadow-md border border-tertiary rounded-lg p-1", className)}>
    <slot></slot>
</button>