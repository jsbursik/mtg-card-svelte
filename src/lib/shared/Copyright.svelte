<script lang="ts">
  let { className, year }: { className: string; year?: string } = $props();
</script>

<div class={className}>
  <span style="fontFeatureSettings: 'lnum' 1, 'pnum' 1">{year ?? "2026"}</span>
  Proxy/Not For Sale
</div>
