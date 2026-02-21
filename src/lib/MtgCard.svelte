<script lang="ts">
  import type { MtgCardProps } from "./types";
  import StandardCard from "./StandardCard.svelte";
  import PlaneswalkerCard from "./PlaneswalkerCard.svelte";
  import SagaCard from "./SagaCard.svelte";
  import AdventureCard from "./AdventureCard.svelte";

  let { ...props }: MtgCardProps = $props();
</script>

{#if props.frame === "planeswalker"}
  <PlaneswalkerCard {...props} />
{:else if props.frame === "saga"}
  <SagaCard {...props} />
{:else if props.frame === "adventure"}
  <AdventureCard {...props} />
{:else}
  <StandardCard {...props} />
{/if}
