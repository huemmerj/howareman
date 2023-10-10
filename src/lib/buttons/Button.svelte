<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    export let className: string = ""
</script>
<button
    class={twMerge("border rounded-lg p-1", className)}>
    <slot></slot>
</button>