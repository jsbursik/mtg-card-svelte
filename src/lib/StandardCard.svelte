<script lang="ts">
  import ManaSymbol from "./ManaSymbol.svelte";
  import type { StandardCardProps } from "./types";
  import styles from "./css/MtgCard.module.css";

  import Svg from "./shared/Svg.svelte";
  import DropShadow from "./shared/Dropshadow.svelte";
  import ManaCostRow from "./shared/ManaCostRow.svelte";
  import SetSymbolIcon from "./shared/SetSymbolIcon.svelte";
  import Metadata from "./shared/Metadata.svelte";
  import Copyright from "./shared/Copyright.svelte";

  import { useCardTheme, getThemeVars, parseRulesText } from "./shared";

  import flavorBarSvg from "../assets/flavor-bar.svg";
  import legendTopImg from "../assets/legendary-top.webp";

  import coloredBgRaw from "../assets/colored-bg.svg?raw";
  import nameFieldRaw from "../assets/name-field.svg?raw";
  import typelineFieldRaw from "../assets/typeline-field.svg?raw";
  import edgesBorderRaw from "../assets/edges-border.svg?raw";
  import edgesShadowRaw from "../assets/edges-shadow.svg?raw";
  import bgOuterRaw from "../assets/bg-outer.svg?raw";
  import bgInnerRaw from "../assets/bg-inner.svg?raw";
  import legendBorderMaskRaw from "../assets/legendary-border-mask.svg?raw";
  import legendLeftRaw from "../assets/legendary-left.svg?raw";
  import legendRightRaw from "../assets/legendary-right.svg?raw";

  let {
    frame,
    cardName,
    manaCost,
    cardArt,
    typeLine,
    legendary,
    rulesText,
    flavorText,
    power,
    toughness,
    landSymbol,
    cardNumber,
    totalCards,
    rarity,
    setCode,
    setSymbolUrl,
    language,
    artist,
    year,
  }: StandardCardProps = $props();

  const isVehicle = $derived(frame === "vehicle");
  const hasPT = $derived(power !== undefined && toughness !== undefined);
  const { theme, textureUrl } = $derived(useCardTheme(manaCost, frame));
  const { frameVars, fieldVars, borderVars, legendVars, ptVars } = $derived(getThemeVars(theme));
  const parts = $derived(rulesText ? parseRulesText(rulesText) : undefined);

  const vehicleFrameVars = "--fill-0: #C49A6C";
</script>

<div class={styles.card}>
  <!-- 1. Black border (outermost rounded rect) -->
  <div class={styles.borderBlack}></div>

  <!-- 2. Frame texture + colored overlay -->
  <div class={styles.textureBg}>
    <img src={textureUrl} alt="" class={`${styles.textureImg}${isVehicle ? ` ${styles.textureImgVehicle}` : ""}`} />
  </div>
  <Svg html={coloredBgRaw} className={styles.coloredBg} style={isVehicle ? vehicleFrameVars : frameVars} />

  <!-- 3. Text box (cream/colored area for rules text) -->
  <div class={styles.textBox}>
    <div class={styles.textBoxBg} style={`background: ${theme.text}`}></div>
  </div>

  <!-- 4. Edge border decorations -->
  <Svg html={edgesBorderRaw} className={`${styles.edgesBorder}${legendary ? ` ${styles.edgesBorderLegendary}` : ""}`} style={borderVars} />
  <Svg html={edgesShadowRaw} className={`${styles.edgesShadow}${legendary ? ` ${styles.edgesShadowLegendary}` : ""}`} style={borderVars} />
  <DropShadow className={styles.dropShadow} style={borderVars} />

  <!-- 4b. Legendary frame overlay -->
  {#if legendary}
    <Svg html={legendBorderMaskRaw} className={styles.legendBorderMask} />
    <Svg html={legendLeftRaw} className={styles.legendLeft} style={legendVars} />
    <Svg html={legendRightRaw} className={styles.legendRight} style={legendVars} />
    <div class={styles.legendTop} style={`filter: ${theme.legendFilter}`}>
      <img src={legendTopImg} alt="" class={styles.legendTopImg} />
    </div>
  {/if}

  <!-- 5. Name field -->
  <div class={styles.nameField}>
    <Svg html={nameFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
    <div class={styles.fieldShadow}></div>
  </div>

  <!-- 6. Typeline field -->
  <div class={styles.typelineField}>
    <Svg html={typelineFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
    <div class={styles.fieldShadow}></div>
  </div>

  <!-- 7. Card art -->
  <div class={styles.artFrame}>
    {#if cardArt}<img src={cardArt} alt={cardName} class={styles.artImg} />{/if}
    <div class={styles.artShadow}></div>
  </div>

  <!-- 8. Card name text -->
  <div class={styles.cardName}>{cardName}</div>

  <!-- 9. Mana cost -->
  <ManaCostRow {manaCost} className={styles.manaCost} />

  <!-- 10. Type line text -->
  <div class={styles.typeLine}>{typeLine}</div>

  <!-- 11. Set symbol -->
  <SetSymbolIcon className={styles.setSymbol} innerClassName={styles.setSymbolInner} fillClassName={styles.fill} {setCode} {rarity} {setSymbolUrl} />

  <!-- 12. Rules + Flavor text area OR land symbol -->
  {#if landSymbol}
    <div class={styles.landSymbol}>
      <ManaSymbol symbol={landSymbol} size={178} />
    </div>
  {:else}
    <div class={styles.rulesArea}>
      {#if rulesText}
        <p class={styles.rulesText}>
          {#each parts as part}
            {#if part.type === "symbol"}
              <ManaSymbol symbol={part.value} size={22} margin={4} />
            {:else}
              {part.value}
            {/if}
          {/each}
        </p>
      {/if}

      {#if flavorText}
        <div class={styles.flavorBar}>
          <div class={styles.flavorBarInner}>
            <img src={flavorBarSvg} alt="" class={styles.fill} />
          </div>
        </div>
        <p class={styles.flavorText}>{flavorText}</p>
      {/if}
    </div>
  {/if}

  <!-- 13. Power / Toughness box -->
  {#if hasPT}
    <div class={styles.ptBox}>
      <Svg html={bgOuterRaw} className={styles.ptOuter} style={isVehicle ? "--fill-0: #FFFFFF" : ptVars} />
      <Svg html={bgInnerRaw} className={styles.ptInner} style={isVehicle ? "--fill-0: #FFFFFF" : ptVars} />
      <span class={styles.ptText}>{power}/{toughness}</span>
    </div>
  {/if}

  <!-- 14. Metadata -->
  <Metadata
    className={styles.metadata}
    rowClassName={styles.metaRow}
    numClassName={styles.metaNum}
    rarityClassName={styles.metaRarity}
    creditClassName={styles.metaCredit}
    setClassName={styles.metaSet}
    artistIconClassName={styles.artistIcon}
    artistNameClassName={styles.artistName}
    {cardNumber}
    {totalCards}
    {rarity}
    {setCode}
    {language}
    {artist}
  />

  <!-- 15. Copyright -->
  <Copyright className="copyright" {year} />
</div>
