<script lang="ts">
  let { html, className = "", style = "" } = $props();
</script>

<div class={className} {style}>
  {@html html}
</div>
