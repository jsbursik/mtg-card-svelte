<script lang="ts">
  import ManaSymbol from "./ManaSymbol.svelte";
  import type { StandardCardProps } from "./types";
  import "./css/MtgCard.css";

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

<div class="card">
  <!-- 1. Black border (outermost rounded rect) -->
  <div class="borderBlack"></div>

  <!-- 2. Frame texture + colored overlay -->
  <div class="textureBg">
    <img src={textureUrl} alt="" class={`textureImg ${isVehicle ? `textureImgVehicle"` : ""}`} />
  </div>
  <Svg html={coloredBgRaw} className="coloredBg" style={isVehicle ? vehicleFrameVars : frameVars} />

  <!-- 3. Text box (cream/colored area for rules text) -->
  <div class="textBox">
    <div class="textBoxBg" style={`background: ${theme.text}`}></div>
  </div>

  <!-- 4. Edge border decorations -->
  <Svg html={edgesBorderRaw} className={`edgesBorder ${legendary ? `edgesBorderLegendary` : ""}`} style={borderVars} />
  <Svg html={edgesShadowRaw} className={`edgesShadow ${legendary ? `edgesShadowLegendary` : ""}`} style={borderVars} />
  <DropShadow className="dropShadow" style={borderVars} />

  <!-- 4b. Legendary frame overlay -->
  {#if legendary}
    <Svg html={legendBorderMaskRaw} className="legendBorderMask" />
    <Svg html={legendLeftRaw} className="legendLeft" style={legendVars} />
    <Svg html={legendRightRaw} className="legendRight" style={legendVars} />
    <div class="legendTop" style={`filter: ${theme.legendFilter}`}>
      <img src={legendTopImg} alt="" class="legendTopImg" />
    </div>
  {/if}

  <!-- 5. Name field -->
  <div class="nameField">
    <Svg html={nameFieldRaw} className="fieldBgWrap" style={fieldVars} />
    <div class="fieldShadow"></div>
  </div>

  <!-- 6. Typeline field -->
  <div class="typelineField">
    <Svg html={typelineFieldRaw} className="fieldBgWrap" style={fieldVars} />
    <div class="fieldShadow"></div>
  </div>

  <!-- 7. Card art -->
  <div class="artFrame">
    {#if cardArt}<img src={cardArt} alt={cardName} class="artImg" />{/if}
    <div class="artShadow"></div>
  </div>

  <!-- 8. Card name text -->
  <div class="cardName">{cardName}</div>

  <!-- 9. Mana cost -->
  <ManaCostRow {manaCost} className="manaCost" />

  <!-- 10. Type line text -->
  <div class="typeLine">{typeLine}</div>

  <!-- 11. Set symbol -->
  <SetSymbolIcon className="setSymbol" innerClassName="setSymbolInner" fillClassName="fill" {setCode} {rarity} {setSymbolUrl} />

  <!-- 12. Rules + Flavor text area OR land symbol -->
  {#if landSymbol}
    <div class="landSymbol">
      <ManaSymbol symbol={landSymbol} size={178} />
    </div>
  {:else}
    <div class="rulesArea">
      {#if rulesText}
        <p class="rulesText">
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
        <div class="flavorBar">
          <div class="flavorBarInner">
            <img src={flavorBarSvg} alt="" class="fill" />
          </div>
        </div>
        <p class="flavorText">{flavorText}</p>
      {/if}
    </div>
  {/if}

  <!-- 13. Power / Toughness box -->
  {#if hasPT}
    <div class="ptBox">
      <Svg html={bgOuterRaw} className="ptOuter" style={isVehicle ? "--fill-0: #FFFFFF" : ptVars} />
      <Svg html={bgInnerRaw} className="ptInner" style={isVehicle ? "--fill-0: #FFFFFF" : ptVars} />
      <span class="ptText">{power}/{toughness}</span>
    </div>
  {/if}

  <!-- 14. Metadata -->
  <Metadata
    className="metadata"
    rowClassName="metaRow"
    numClassName="metaNum"
    rarityClassName="metaRarity"
    creditClassName="metaCredit"
    setClassName="metaSet"
    artistIconClassName="artistIcon"
    artistNameClassName="artistName"
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

<style>
  /* ============================================================
   MTG Card Component — 672 x 936 px
   All positions derived from Figma design tokens.
   SVGs use CSS custom properties (--fill-0, --stroke-0)
   set inline on parent elements for color theming.
   ============================================================ */

  /* --- Utilities --- */

  .fill {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
  }

  /* --- Card shell --- */

  .card {
    position: relative;
    width: 672px;
    height: 936px;
    font-family: "Beleren", serif;
    overflow: hidden;
    border-radius: 30px;
  }

  /* 1. Black outer border */
  .borderBlack {
    position: absolute;
    inset: 0;
    background: #17140f;
    border-radius: 30px;
  }

  /* 2a. Frame texture background (clipped to frame shape) */
  .textureBg {
    position: absolute;
    inset: 2.56% 3.57% 6.94% 3.57%;
    overflow: hidden;
    clip-path: path(
      "M0 32C0 20.7989 0 15.1984 2.17987 10.9202C4.09734 7.15695 7.15695 4.09734 10.9202 2.17987C15.1984 0 20.7989 0 32 0H592C603.201 0 608.802 0 613.08 2.17987C616.843 4.09734 619.903 7.15695 621.82 10.9202C624 15.1984 624 20.7989 624 32V691.551C624 745.955 624 773.157 613.406 793.923C604.088 812.189 589.221 827.033 570.94 836.321C550.157 846.882 522.955 846.838 468.551 846.751L154.951 846.248C100.705 846.161 73.5816 846.118 52.866 835.534C34.6436 826.223 19.8325 811.388 10.5512 793.151C0 772.418 0 745.295 0 691.049V32Z"
    );
  }

  /* Legendary frame overlay */
  .legendBorderMask {
    position: absolute;
    inset: 0 0 91.03% 0;
    pointer-events: none;
  }

  .legendTop {
    position: absolute;
    inset: 2.56% 2.08% 88.89% 2.08%;
    pointer-events: none;
  }

  .legendTopImg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
  }

  .legendLeft {
    position: absolute;
    inset: 3.42% 93.13% 51.71% 3.57%;
    pointer-events: none;
  }

  .legendRight {
    position: absolute;
    inset: 3.42% 3.57% 51.71% 93.13%;
    pointer-events: none;
  }

  .textureImg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: none;
  }

  /* Vehicle: warm brown wood look from cold gray metal texture */
  .textureImgVehicle {
    filter: sepia(1) saturate(2.5) brightness(0.55) hue-rotate(-5deg);
  }

  /* 2b. Colored frame background (blends with texture) */
  .coloredBg {
    position: absolute;
    inset: 2.56% 3.57% 6.94% 3.57%;
    mix-blend-mode: multiply;
  }

  /* 3. Text box */
  .textBox {
    position: absolute;
    inset: 62.55% 7.51% 7.64% 7.81%;
  }

  .textBoxBg {
    position: absolute;
    inset: 0;
    box-shadow:
      inset 1px -3px 3px 0 rgba(255, 255, 255, 0.3),
      inset -3px 3px 3px 0 rgba(85, 85, 85, 0.45);
  }

  /* 4. Edge border decorations (positioned directly on card) */
  .edgesBorder {
    position: absolute;
    inset: 4.22% 4.83% 7% 4.98%;
    pointer-events: none;
  }

  .edgesShadow {
    position: absolute;
    inset: 3.53% 3.57% 6.01% 3.57%;
    pointer-events: none;
  }

  /* 4c. Drop shadow (dark shadow on left edge of border) */
  .dropShadow {
    position: absolute;
    inset: 3.53% 84.3% 7.15% 3.57%;
    pointer-events: none;
  }

  /* Legendary: clip the standard edges' top bulge to prevent double-border */
  .edgesBorderLegendary {
    clip-path: inset(8% 0 0 0);
  }

  .edgesShadowLegendary {
    clip-path: inset(8.3% 0 0 0);
  }

  /* 5 & 6. Name / Typeline fields */
  .nameField {
    position: absolute;
    inset: 5.02% 5.8% 89.42% 5.95%;
  }

  .typelineField {
    position: absolute;
    inset: 56.41% 5.8% 38.03% 5.95%;
  }

  .fieldBgWrap {
    position: absolute;
    inset: -3.85% -0.34%;
  }

  /* .fieldShadow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow:
    inset 0 -6px 2px 0 rgba(51, 51, 51, 0.5),
    inset 6px 0 2px 0 rgba(68, 68, 68, 0.2),
    inset 6px -6px 2px 0 rgba(68, 68, 68, 0.2),
    inset -2px 6px 2px 0 rgba(255, 255, 255, 0.4);
} */

  /* 7. Card art */
  .artFrame {
    position: absolute;
    inset: 11.38% 7.51% 44.18% 7.66%;
    pointer-events: none;
    overflow: hidden;
  }

  .artImg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: none;
  }

  .artShadow {
    position: absolute;
    inset: 0;
    box-shadow:
      inset 2px -2px 3px 0 rgba(0, 0, 0, 0.7),
      inset -2px 2px 4px 0 rgba(0, 0, 0, 0.7);
  }

  /* 8. Card name */
  .cardName {
    position: absolute;
    top: 5%;
    left: 8.18%;
    right: 7.44%;
    height: 5.56%;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 36px;
    color: black;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
  }

  /* 9. Mana cost row */
  .manaCost {
    position: absolute;
    right: 47px;
    top: 72px;
    transform: translateY(-50%);
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .manaSymbol {
    position: relative;
    width: 32px;
    height: 32px;
    box-shadow: -0.5px 2px 0 0 black;
    flex-shrink: 0;
    border-radius: 50%;
  }

  .manaSymbolBg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
  }

  .manaSymbolVector {
    position: absolute;
  }

  .manaSymbolFallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    color: black;
  }

  /* 10. Type line */
  .typeLine {
    position: absolute;
    top: 56.41%;
    left: 8.18%;
    right: 7.44%;
    height: 5.56%;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 31px;
    color: black;
    line-height: normal;
    letter-spacing: -0.155px;
    white-space: nowrap;
    overflow: hidden;
  }

  /* 11. Set symbol */
  .setSymbol {
    position: absolute;
    top: 56.94%;
    right: 7.74%;
    bottom: 38.78%;
    width: 40px;
    overflow: visible;
  }

  .setSymbolInner {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 36px;
  }

  /* 12. Rules + Flavor text */
  .rulesArea {
    position: absolute;
    inset: 63.46% 7.44% 8.55% 9.38%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 13px;
    overflow: hidden;
  }

  .rulesText {
    width: 100%;
    margin: 0;
    font-family: "Merriweather", serif;
    font-weight: normal;
    font-size: 25px;
    color: black;
    line-height: normal;
    letter-spacing: -0.125px;
    white-space: pre-wrap;
  }

  .rulesText > div {
    display: inline-flex;
    vertical-align: middle;
    box-shadow: none;
  }

  .flavorBar {
    width: 520px;
    height: 2px;
    position: relative;
    flex-shrink: 0;
  }

  .flavorBarInner {
    position: absolute;
    inset: -50% -0.19% 0 -0.19%;
  }

  .flavorText {
    width: 100%;
    margin: 0;
    font-family: "Merriweather", serif;
    font-style: italic;
    font-size: 25px;
    color: black;
    line-height: normal;
    letter-spacing: -0.125px;
    white-space: pre-wrap;
  }

  /* 12b. Basic Land large mana symbol */
  .landSymbol {
    position: absolute;
    inset: 66.99% 33.78% 11.85% 39.73%;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(-4px 4px 4px rgba(0, 0, 0, 0.7)) drop-shadow(4px -3px 8px rgba(255, 255, 255, 0.75));
  }

  /* 13. Power / Toughness */
  .ptBox {
    position: absolute;
    right: 36px;
    bottom: 50px;
    width: 111px;
    height: 53px;
  }

  .ptOuter {
    position: absolute;
    inset: 0 0 -15.09% -7.21%;
    filter: drop-shadow(-4px 4px 4px rgba(0, 0, 0, 0.4));
  }

  .ptInner {
    position: absolute;
    width: 103px;
    height: 45px;
    left: 4px;
    top: 4px;
  }

  .ptInnerShadow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    box-shadow:
      inset -2px 4px 4px 0 rgba(35, 35, 35, 0.7),
      inset 2px -2px 3px 0 rgba(255, 255, 255, 0.4);
  }

  .ptText {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 35px;
    color: black;
    line-height: normal;
  }

  /* 14. Metadata (bottom-left) */
  .metadata {
    position: absolute;
    left: 43px;
    bottom: 24px;
    width: 380px;
    height: 40px;
    overflow: hidden;
  }

  .metaRow {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 20px;
  }

  .metaNum {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 18px;
    color: #ededed;
    letter-spacing: 1.6px;
    white-space: nowrap;
  }

  .metaRarity {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 18px;
    color: #ededed;
    letter-spacing: 1.8px;
    white-space: nowrap;
    margin-left: 8px;
  }

  .metaCredit {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    color: #ededed;
    white-space: nowrap;
    margin-left: 8px;
  }

  .metaSet {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 18px;
    color: #ededed;
    letter-spacing: 1.8px;
    white-space: nowrap;
  }

  .artistIcon {
    width: 19px;
    height: 11px;
    margin-left: 4px;
  }

  .artistName {
    font-family: "Beleren", serif;
    font-weight: bold;
    font-size: 14px;
    color: #ededed;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* 15. Copyright (bottom-right) */
  .copyright {
    position: absolute;
    right: 39px;
    bottom: 28px;
    font-family: "Merriweather", serif;
    font-size: 12px;
    color: #ededed;
    white-space: nowrap;
  }
</style>
