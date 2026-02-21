<script lang="ts">
  import ManaSymbol from "./ManaSymbol.svelte";
  import type { SagaCardProps } from "./types";
  import styles from "./css/SagaCard.module.css";

  import Svg from "./shared/Svg.svelte";
  import ManaCostRow from "./shared/ManaCostRow.svelte";
  import SetSymbolIcon from "./shared/SetSymbolIcon.svelte";
  import Metadata from "./shared/Metadata.svelte";
  import Copyright from "./shared/Copyright.svelte";

  import { useCardTheme, getThemeVars, parseRulesText } from "./shared";

  // Inline SVGs (rendered as DOM nodes so CSS custom properties inherit)
  import sagaColoredBgRaw from "../assets/saga-colored-bg.svg?raw";
  import sagaEdgesRaw from "../assets/saga-edges.svg?raw";
  import sagaEdgesShadowRaw from "../assets/saga-edges-shadow.svg?raw";
  import nameFieldRaw from "../assets/name-field.svg?raw";
  import typelineFieldRaw from "../assets/typeline-field.svg?raw";

  // Saga-specific assets
  import sagaBannerBorderRaw from "../assets/saga-banner-border.svg?raw";
  import sagaBannerColumnRaw from "../assets/saga-banner-column.svg?raw";
  import sagaBannerReverseRaw from "../assets/saga-banner-reverse.svg?raw";
  import sagaBannerSpike1Raw from "../assets/saga-banner-spike1.svg?raw";
  import sagaBannerSpike2Raw from "../assets/saga-banner-spike2.svg?raw";
  import sagaLoreOuterRaw from "../assets/saga-lore-outer.svg?raw";
  import sagaLoreInnerRaw from "../assets/saga-lore-inner.svg?raw";
  import sagaDividerRaw from "../assets/saga-divider.svg?raw";

  let {
    cardName,
    manaCost,
    cardArt,
    typeLine,
    chapters,
    reminderText,
    cardNumber,
    totalCards,
    rarity,
    setCode,
    setSymbolUrl,
    language,
    artist,
    year,
  }: SagaCardProps = $props();

  const { theme, textureUrl } = $derived(useCardTheme(manaCost));
  const { frameVars, fieldVars, borderVars } = $derived(getThemeVars(theme));

  const DEFAULT_REMINDER = "(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III).";
</script>

{#snippet LoreStep(numerals: string)}
  <div class={styles.loreStep}>
    <div class={styles.loreStepOuter}>
      <div class={styles.loreStepOuterInner}>
        <Svg html={sagaLoreOuterRaw} className={styles.fill} />
      </div>
    </div>
    <div class={styles.loreStepInner}>
      <div class={styles.loreStepInnerInner}>
        <Svg html={sagaLoreInnerRaw} className={styles.fill} />
      </div>
    </div>
    <span class={styles.loreStepText}>{numerals}</span>
  </div>
{/snippet}

{#snippet ChapterDivider()}
  <div class={styles.chapterDivider}>
    <div class={styles.chapterDividerInner}>
      <Svg html={sagaDividerRaw} className={styles.fill} />
    </div>
  </div>
{/snippet}

<div class={styles.card}>
  <!-- 1. Black border -->
  <div class={styles.borderBlack}></div>

  <!-- 2. Frame texture + colored overlay -->
  <div class={styles.textureBg}>
    <img src={textureUrl} alt="" class={styles.textureImg} />
  </div>
  <Svg html={sagaColoredBgRaw} className={styles.coloredBg} style={frameVars} />

  <!-- 3. Text box (left side) -->
  <div class={styles.textBox}>
    <div class={styles.textBoxBg} style={`background: ${theme.text}`}></div>
  </div>

  <!-- 4. Card art (right side) -->
  <div class={styles.artFrame}>
    {#if cardArt}<img src={cardArt} alt={cardName} class={styles.artImg} />{/if}
    <div class={styles.artShadow}></div>
  </div>

  <!-- 5. Edge decorations -->
  <div class={styles.edgesBorder}>
    <div class={styles.edgesBorderInner}>
      <Svg html={sagaEdgesRaw} className={styles.fill} style={borderVars} />
    </div>
  </div>

  <!-- 5b. Edge shadow -->
  <div class={styles.edgesShadow}>
    <div class={styles.edgesBorderInner}>
      <Svg html={sagaEdgesShadowRaw} className={styles.fill} />
    </div>
  </div>

  <!-- 6. Saga banner (vertical left decoration) -->
  <div class={styles.banner}>
    <div class={styles.bannerReverse}>
      <Svg html={sagaBannerReverseRaw} className={styles.fill} />
    </div>
    <div class={styles.bannerBorder}>
      <div class={styles.bannerBorderInner}>
        <Svg html={sagaBannerBorderRaw} className={styles.fill} />
      </div>
    </div>
    <div class={styles.bannerColumn}>
      <Svg html={sagaBannerColumnRaw} className={styles.fill} />
    </div>
    <div class={styles.bannerSpike2}>
      <div class={styles.bannerSpike2Inner}>
        <Svg html={sagaBannerSpike2Raw} className={styles.fill} />
      </div>
    </div>
    <div class={styles.bannerSpike1}>
      <div class={styles.bannerSpike1Inner}>
        <Svg html={sagaBannerSpike1Raw} className={styles.fill} />
      </div>
    </div>
  </div>

  <!-- 7. Name field -->
  <div class={styles.nameField}>
    <Svg html={nameFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
    <div class={styles.fieldShadow}></div>
  </div>

  <!-- 8. Typeline field -->
  <div class={styles.typelineField}>
    <Svg html={typelineFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
    <div class={styles.fieldShadow}></div>
  </div>

  <!-- 9. Card name text -->
  <div class={styles.cardName}>{cardName}</div>

  <!-- 10. Mana cost -->
  <ManaCostRow {manaCost} className={styles.manaCost} />

  <!-- 11. Type line text -->
  <div class={styles.typeLine}>{typeLine}</div>

  <!-- 12. Set symbol -->
  <SetSymbolIcon className={styles.setSymbol} innerClassName={styles.setSymbolInner} fillClassName={styles.fill} {setCode} {rarity} {setSymbolUrl} />

  <!-- 13. Chapter content -->
  <div class={styles.chaptersArea}>
    <div class={styles.chaptersInner}>
      <!-- Reminder text -->
      <p class={styles.reminderText}>
        {reminderText ?? DEFAULT_REMINDER}
      </p>

      <!-- Chapter steps -->
      <div class={styles.chapterSteps}>
        {#each chapters as chapter}
          {@render ChapterDivider()}
          <div class={styles.chapterRow}>
            {@render LoreStep(chapter.numerals)}
            <span class={styles.chapterText}>
              {#each parseRulesText(chapter.text) as part}
                {#if part.type === "symbol"}
                  <ManaSymbol symbol={part.value} size={22} />
                {:else}
                  {part.value}
                {/if}
              {/each}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>

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
