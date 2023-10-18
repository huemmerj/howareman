<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    export let className: string = ""
    export let href: string = "#"
</script>
<a
    href={href}
    class={twMerge("shadow-md border border-tertiary rounded-lg p-1", className)}>
    <slot></slot>
</a>