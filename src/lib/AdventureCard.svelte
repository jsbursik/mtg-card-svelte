<script lang="ts">
  import ManaSymbol from "./ManaSymbol.svelte";

  import type { AdventureCardProps } from "./types";
  import styles from "./css/MtgCard.module.css";
  import advStyles from "./css/AdventureCard.module.css";

  import Svg from "./shared/Svg.svelte";
  import ManaCostRow from "./shared/ManaCostRow.svelte";
  import DropShadow from "./shared/Dropshadow.svelte";
  import SetSymbolIcon from "./shared/SetSymbolIcon.svelte";
  import Metadata from "./shared/Metadata.svelte";
  import Copyright from "./shared/Copyright.svelte";

  import { useCardTheme, getThemeVars, parseRulesText } from "./shared";

  // Inline SVGs (rendered as DOM nodes so CSS custom properties inherit)
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

  // Static assets
  import flavorBarSvg from "../assets/flavor-bar.svg";
  import legendTopImg from "../assets/legendary-top.webp";

  let {
    cardName,
    manaCost,
    cardArt,
    typeLine,
    legendary,
    rulesText,
    flavorText,
    power,
    toughness,
    adventureName,
    adventureManaCost,
    adventureTypeLine,
    adventureRulesText,
    cardNumber,
    totalCards,
    rarity,
    setCode,
    setSymbolUrl,
    language,
    artist,
    year,
  }: AdventureCardProps = $props();

  const hasPT = $derived(power !== undefined && toughness !== undefined);
  const { theme, textureUrl } = $derived(useCardTheme(manaCost, "adventure"));
  const { frameVars, fieldVars, borderVars, legendVars, ptVars } = $derived(getThemeVars(theme));
</script>

<div class={styles.card}>
  <!-- 1. Black border -->
  <div class={styles.borderBlack}></div>

  <!-- 2. Frame texture + colored overlay -->
  <div class={styles.textureBg}>
    <img src={textureUrl} alt="" class={styles.textureImg} />
  </div>
  <Svg html={coloredBgRaw} className={styles.coloredBg} style={frameVars} />

  <!-- 3. Text box -->
  <div class={styles.textBox}>
    <div class={styles.textBoxBg} style={`background: ${theme.text}`}></div>
  </div>

  <!-- 4. Edge border decorations -->
  <Svg html={edgesBorderRaw} className={styles.edgesBorder} style={borderVars} />
  <Svg html={edgesShadowRaw} className={styles.edgesShadow} style={borderVars} />
  <DropShadow className={styles.dropShadow} style={borderVars} />

  <!-- 4b. Legendary frame overlay -->
  {#if legendary}
    <Svg html={legendBorderMaskRaw} className={styles.legendBorderMask} />
    <div class={styles.legendTop} style={`filter: ${theme.legendFilter}`}>
      <div class={styles.legendTopInner}>
        <img src={legendTopImg} alt="" class={styles.legendTopImg} />
      </div>
    </div>
    <Svg html={legendLeftRaw} className={styles.legendLeft} style={legendVars} />
    <Svg html={legendRightRaw} className={styles.legendRight} style={legendVars} />
  {/if}

  <!-- 5. Name field -->
  <div class={styles.nameField}>
    <Svg html={nameFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
  </div>

  <!-- 6. Typeline field -->
  <div class={styles.typelineField}>
    <Svg html={typelineFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
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

  <!-- 12. Split text box: adventure (left) + creature (right) -->
  <div class={advStyles.splitBox}>
    <div class={advStyles.adventureSide}>
      <div class={advStyles.adventureHeader}>
        <span class={advStyles.adventureName}>{adventureName}</span>
        <div class={advStyles.adventureManaCost}>
          {#each adventureManaCost as symbol}<ManaSymbol {symbol} size={22} />{/each}
        </div>
      </div>
      <div class={advStyles.adventureTypeLine}>{adventureTypeLine}</div>
      <p class={advStyles.adventureRules}>
        {#each parseRulesText(adventureRulesText) as part}
          {#if part.type === "symbol"}
            <ManaSymbol symbol={part.value} size={16} margin={4} />
          {:else}
            {part.value}
          {/if}
        {/each}
      </p>
    </div>

    <div class={advStyles.creatureSide}>
      {#if rulesText}
        <p class={advStyles.creatureRules}>
          {#each parseRulesText(rulesText) as part}
            {#if part.type === "symbol"}
              <ManaSymbol symbol={part.value} size={16} margin={4} />
            {:else}
              {part.value}
            {/if}
          {/each}
        </p>
      {/if}
      {#if flavorText}
        <div class={advStyles.flavorBar}>
          <div class={advStyles.flavorBarInner}>
            <img src={flavorBarSvg} alt="" class={styles.fill} />
          </div>
        </div>
        <p class={advStyles.creatureFlavor}>{flavorText}</p>
      {/if}
    </div>
  </div>

  <!-- 13. Power / Toughness box -->
  {#if hasPT}
    <div class={styles.ptBox}>
      <Svg html={bgOuterRaw} className={styles.ptOuter} style={ptVars} />
      <Svg html={bgInnerRaw} className={styles.ptInner} style={ptVars} />
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
  <Copyright className={styles.copyright} {year} />
</div>
