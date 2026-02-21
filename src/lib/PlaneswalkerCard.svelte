<script lang="ts">
  import LoyaltyBadge from "./shared/LoyaltyBadge.svelte";
  import type { PlaneswalkerCardProps } from "./types";
  import styles from "./css/PlaneswalkerCard.module.css";

  import Svg from "./shared/Svg.svelte";
  import ManaCostRow from "./shared/ManaCostRow.svelte";
  import SetSymbolIcon from "./shared/SetSymbolIcon.svelte";
  import Metadata from "./shared/Metadata.svelte";
  import Copyright from "./shared/Copyright.svelte";

  import { useCardTheme, getThemeVars, parseRulesText } from "./shared";

  import pwColoredBgRaw from "../assets/pw-colored-bg.svg?raw";
  import pwBorderRaw from "../assets/pw-border.svg?raw";
  import pwNameFieldRaw from "../assets/pw-name-field.svg?raw";
  import pwTextboxRaw from "../assets/pw-textbox.svg?raw";
  import pwLoyaltyOuterRaw from "../assets/pw-loyalty-outer.svg?raw";
  import pwLoyaltyInnerRaw from "../assets/pw-loyalty-inner.svg?raw";
  import ManaSymbol from "./ManaSymbol.svelte";

  let {
    cardName,
    manaCost,
    cardArt,
    typeLine,
    loyaltyAbilities,
    startingLoyalty,
    cardNumber,
    totalCards,
    rarity,
    setCode,
    setSymbolUrl,
    language,
    artist,
    year,
  }: PlaneswalkerCardProps = $props();

  const { theme, textureUrl } = $derived(useCardTheme(manaCost));
  const { frameVars, fieldVars } = $derived(getThemeVars(theme));
</script>

<div class={styles.card}>
  <!-- 1. Black border -->
  <div class={styles.borderBlack}></div>

  <!-- 2. Frame texture + colored overlay -->
  <div class={styles.textureBg}>
    <img src={textureUrl} alt="" class={styles.textureImg} />
  </div>
  <Svg html={pwColoredBgRaw} className={styles.coloredBg} style={frameVars} />

  <!-- 3. Card art (full bleed behind frame) -->
  <div class={styles.artFrame}>
    {#if cardArt}<img src={cardArt} alt={cardName} class={styles.artImg} />{/if}
    <div class={styles.artShadow}></div>
  </div>

  <!-- 4. Text box for abilities -->
  <div class={styles.textBox}>
    <Svg html={pwTextboxRaw} className={styles.textBoxBg} style={`--fill-0: ${theme.text}`} />
    <div class={styles.textBoxDarker}></div>
  </div>

  <!-- 5. Edge border (pw-border.svg uses --fill-0, not --stroke-0) -->
  <div class={styles.edgesBorder}>
    <Svg html={pwBorderRaw} className={styles.edgesBorderInner} style={`--fill-0: ${theme.border}`} />
  </div>

  <!-- 6. Name field -->
  <div class={styles.nameField}>
    <Svg html={pwNameFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
    <div class={styles.fieldShadow}></div>
  </div>

  <!-- 7. Typeline field -->
  <div class={styles.typelineField}>
    <Svg html={pwNameFieldRaw} className={styles.fieldBgWrap} style={fieldVars} />
    <div class={styles.fieldShadow}></div>
  </div>

  <!-- 8. Card name text -->
  <div class={styles.cardName}>{cardName}</div>

  <!-- 9. Mana cost -->
  <ManaCostRow {manaCost} className={styles.manaCost} />

  <!-- 10. Type line text -->
  <div class={styles.typeLine}>{typeLine}</div>

  <!-- 11. Set symbol -->
  <SetSymbolIcon className={styles.setSymbol} innerClassName={styles.setSymbolInner} fillClassName={styles.fill} {setCode} {rarity} {setSymbolUrl} />

  <!-- 12. Loyalty abilities -->
  <div class={styles.abilitiesArea}>
    {#each loyaltyAbilities as ability}
      <div class={styles.abilityRow}>
        <LoyaltyBadge cost={ability.cost} />
        <span class={styles.abilityText}>
          {#each parseRulesText(ability.text) as part}
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

  <!-- 13. Loyalty counter -->
  <div class={styles.loyaltyCounter}>
    <div class={styles.loyaltyOuter}>
      <div class={styles.loyaltyOuterInner}>
        <Svg html={pwLoyaltyOuterRaw} className={styles.fill} />
      </div>
    </div>
    <div class={styles.loyaltyInner}>
      <div class={styles.loyaltyInnerInner}>
        <Svg html={pwLoyaltyInnerRaw} className={styles.fill} />
      </div>
    </div>
    <span class={styles.loyaltyText}>{startingLoyalty}</span>
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
