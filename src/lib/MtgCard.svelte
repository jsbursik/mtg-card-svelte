<script lang="ts">
  import type { MtgCardProps } from "./types";
  import StandardCard from "./StandardCard.svelte";
  import PlaneswalkerCard from "./PlaneswalkerCard.svelte";

  let { ...props }: MtgCardProps = $props();
</script>

{#if props.frame === "planeswalker"}
  <PlaneswalkerCard {...props} />
{:else if props.frame === "standard"}
  <StandardCard {...props} />
{/if}
