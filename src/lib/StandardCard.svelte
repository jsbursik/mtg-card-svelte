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
