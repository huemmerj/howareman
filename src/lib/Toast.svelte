<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications } from "$lib/notifications.js";

  export let themes = {
      danger: "#E26D69",
      success: "#00b433",
      warning: "#f0ad4e",
      info: "#5bc0de",
      default: "#aaaaaa",
  };
</script>

<div class="fixed z-[9999] flex flex-col justify-start items-center pointer-events-none mx-auto my-0 p-0 top-2.5 inset-x-0">
  {#each $notifications as notification (notification.id)}
      <div
          animate:flip
          class="flex-[0_0_auto] mb-2.5 rounded-md shadow-md"
          style="background: {themes[notification.type]};"
          transition:fly={{ y: 30 }}
      >
          <div class="block text-[white] font-medium p-2.5">{notification.message}</div>
          {#if notification.icon}<i class={notification.icon} />{/if}
      </div>
  {/each}
</div>
