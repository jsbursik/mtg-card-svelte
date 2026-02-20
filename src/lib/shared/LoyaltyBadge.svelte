<script lang="ts">
  import Svg from "./Svg.svelte";
  import styles from "../css/PlaneswalkerCard.module.css";

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
  <div class={`${styles.loyaltyBadge} ${styles.loyaltyBadgeMinus}`}>
    <div class={styles.loyaltyBadgeOuter}>
      <div class={styles.loyaltyBadgeMinusFlip}>
        <div class={styles.loyaltyBadgeOuterInner}>
          <Svg html={pwAbilityMinusOuterRaw} className={styles.fill} />
        </div>
      </div>
    </div>
    <div class={styles.loyaltyBadgeInner}>
      <div class={styles.loyaltyBadgeMinusFlip}>
        <div class={styles.loyaltyBadgeInnerInner}>
          <Svg html={pwAbilityMinusInnerRaw} className={styles.fill} />
        </div>
      </div>
    </div>
    <span class={styles.loyaltyBadgeCost}>{cost}</span>
    <span class={styles.loyaltyBadgeColon}>:</span>
  </div>
{:else}
  <div class={styles.loyaltyBadge}>
    <div class={styles.loyaltyBadgeOuter}>
      <div class={styles.loyaltyBadgeOuterInner}>
        <Svg html={pwAbilityPlusOuterRaw} className={styles.fill} />
      </div>
    </div>
    <div class={styles.loyaltyBadgeInner}>
      <div class={styles.loyaltyBadgeInnerInner}>
        <Svg html={pwAbilityPlusInnerRaw} className={styles.fill} />
      </div>
    </div>
    <span class={styles.loyaltyBadgeCost}>{cost}</span>
    <span class={styles.loyaltyBadgeColon}>:</span>
  </div>
{/if}
