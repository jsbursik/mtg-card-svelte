<script lang="ts">
  import Svg from "./Svg.svelte";
  import "../css/PlaneswalkerCard.css";

  import pwAbilityPlusOuterRaw from "../../assets/pw-ability-plus-outer.svg?raw";
  import pwAbilityPlusInnerRaw from "../../assets/pw-ability-plus-inner.svg?raw";
  import pwAbilityMinusOuterRaw from "../../assets/pw-ability-minus-outer.svg?raw";
  import pwAbilityMinusInnerRaw from "../../assets/pw-ability-minus-inner.svg?raw";

  let { cost }: { cost: string } = $props();

  function isMinusAbility(cost: string): boolean {
    const trimmed = cost.trim();
    return trimmed.startsWith("-") || trimmed.startsWith("\u2212");
  }

  const minus = $derived(isMinusAbility(cost));
</script>

{#if minus}
  <div class="loyaltyBadge loyaltyBadgeMinus">
    <div class="loyaltyBadgeOuter">
      <div class="loyaltyBadgeMinusFlip">
        <div class="loyaltyBadgeOuterInner">
          <Svg html={pwAbilityMinusOuterRaw} className="fill" />
        </div>
      </div>
    </div>
    <div class="loyaltyBadgeInner">
      <div class="loyaltyBadgeMinusFlip">
        <div class="loyaltyBadgeInnerInner">
          <Svg html={pwAbilityMinusInnerRaw} className="fill" />
        </div>
      </div>
    </div>
    <span class="loyaltyBadgeCost">{cost}</span>
    <span class="loyaltyBadgeColon">:</span>
  </div>
{:else}
  <div class="loyaltyBadge">
    <div class="loyaltyBadgeOuter">
      <div class="loyaltyBadgeOuterInner">
        <Svg html={pwAbilityPlusOuterRaw} className="fill" />
      </div>
    </div>
    <div class="loyaltyBadgeInner">
      <div class="loyaltyBadgeInnerInner">
        <Svg html={pwAbilityPlusInnerRaw} className="fill" />
      </div>
    </div>
    <span class="loyaltyBadgeCost">{cost}</span>
    <span class="loyaltyBadgeColon">:</span>
  </div>
{/if}
