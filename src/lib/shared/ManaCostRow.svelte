<script lang="ts">
  import ManaSymbol from "../ManaSymbol.svelte";

  let { manaCost, className }: { manaCost: string[]; className: string } = $props();
</script>

<div class={className}>
  {#each manaCost as symbol}
    <ManaSymbol {symbol} />
  {/each}
</div>
