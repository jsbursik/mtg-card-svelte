<script lang="ts">
  import { getSetSymbolUrl } from ".";
  import setSymbolSvg from "../../assets/set-symbol.svg";

  let {
    className,
    innerClassName,
    fillClassName,
    setCode,
    rarity,
    setSymbolUrl,
  }: {
    className: string;
    innerClassName: string;
    fillClassName: string;
    setCode?: string;
    rarity?: string;
    setSymbolUrl?: string;
  } = $props();

  const src = setSymbolUrl ? setSymbolUrl : setCode ? getSetSymbolUrl(setCode, rarity) : setSymbolSvg;
</script>
