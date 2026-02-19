<script lang="ts">
  import Svg from "./Svg.svelte";
  import edgesMaskRaw from "../../assets/edges-mask.svg?raw";

  let { className, style = null } = $props();
</script>

<Svg html={edgesMaskRaw} {className} {style} />
