<script lang="ts">
  import artistIcon from "../../assets/artist-icon.svg";

  let {
    className,
    rowClassName,
    numClassName,
    rarityClassName,
    creditClassName,
    setClassName,
    artistIconClassName,
    artistNameClassName,
    cardNumber,
    totalCards,
    rarity,
    setCode,
    language,
    artist,
  }: {
    className: string;
    rowClassName: string;
    numClassName: string;
    rarityClassName: string;
    creditClassName: string;
    setClassName: string;
    artistIconClassName: string;
    artistNameClassName: string;
    cardNumber?: string;
    totalCards?: string;
    rarity?: string;
    setCode?: string;
    language?: string;
    artist?: string;
  } = $props();
</script>

<div class={className}>
  <div class={rowClassName}>
    <span class={numClassName}>
      {#if cardNumber && totalCards}
        <span style="fontFeatureSettings: 'lnum' 1, 'pnum' 1">{cardNumber}</span>
        <span style="fontStyle: italic">/</span>
        <span style="fontFeatureSettings: 'lnum' 1, 'pnum' 1">{totalCards}</span>
      {/if}
    </span>
    {#if rarity}<span class={rarityClassName}>{rarity}</span>{/if}
  </div>
  <div class={rowClassName}>
    <span class={setClassName}>
      {[setCode, language].filter(Boolean).join(" \u2022 ")}
    </span>
    <img src={artistIcon} alt="" class={artistIconClassName} />
    <span class={artistNameClassName}>{artist}</span>
  </div>
</div>
