<script lang="ts">
    export let value: number = 1;
    const increment = () => {
        value++;
    }
    const decrement = () => {
        if (value > 0) value--;
    }
</script>
<div class="flex">
    <button on:click={decrement} class="shadow-md border-tertiary p-1 border px-4 rounded-l-full">-</button>
    <input {value} class="shadow-md border-tertiary flex text-center border-y w-9"/>
    <button on:click={increment} class="shadow-md border-tertiary border px-4 rounded-r-full">+</button>
</div>