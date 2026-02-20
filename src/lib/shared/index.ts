import { getColorTheme, type CardColorTheme } from "./colors";

// Frame background textures
import bgWhite from "../../assets/bgWhite.webp";
import bgBlue from "../../assets/bgBlue.webp";
import bgBlack from "../../assets/bgBlack.webp";
import bgRed from "../../assets/bgRed.webp";
import bgGreen from "../../assets/bgGreen.webp";
import bgGold from "../../assets/bgGold.webp";
import bgArtifact from "../../assets/bgArtifact.webp";
import bgWB from "../../assets/bgWB.webp";
import bgUB from "../../assets/bgUB.webp";
import bgUR from "../../assets/bgUR.webp";
import bgBR from "../../assets/bgBR.webp";
import bgBG from "../../assets/bgBG.webp";
import bgRW from "../../assets/bgRW.webp";
import bgRG from "../../assets/bgRG.webp";
import bgGW from "../../assets/bgGW.webp";
import bgGU from "../../assets/bgGU.webp";
import bgLand from "../../assets/bgLand.webp";

const MONO_TEXTURES: Record<string, string> = {
  W: bgWhite,
  U: bgBlue,
  B: bgBlack,
  R: bgRed,
  G: bgGreen,
};
const DUAL_TEXTURES: Record<string, string> = {
  WB: bgWB,
  BW: bgWB,
  UB: bgUB,
  BU: bgUB,
  UR: bgUR,
  RU: bgUR,
  BR: bgBR,
  RB: bgBR,
  BG: bgBG,
  GB: bgBG,
  RW: bgRW,
  WR: bgRW,
  RG: bgRG,
  GR: bgRG,
  GW: bgGW,
  WG: bgGW,
  GU: bgGU,
  UG: bgGU,
};

export function getTextureUrl(manaCost: string[], frame?: string): string {
  // Vehicles always use the brown wooden artifact texture
  if (frame === "vehicle") return bgArtifact;
  const WUBRG = new Set(["W", "U", "B", "R", "G"]);
  const colors = new Set<string>();
  for (const sym of manaCost) {
    const s = sym.toUpperCase();
    if (WUBRG.has(s)) {
      colors.add(s);
      continue;
    }
    if (s.includes("/")) {
      const [a, b] = s.split("/");
      if (WUBRG.has(a)) colors.add(a);
      if (WUBRG.has(b)) colors.add(b);
    }
  }
  // Lands with no color identity use the land texture
  if (frame === "land" && colors.size === 0) return bgLand;
  if (colors.size === 0) return bgArtifact;
  if (colors.size === 1) {
    const [c] = colors;
    return MONO_TEXTURES[c];
  }
  if (colors.size === 2) {
    const key = [...colors].join("");
    if (DUAL_TEXTURES[key]) return DUAL_TEXTURES[key];
  }
  return bgGold;
}

export function useCardTheme(manaCost: string[], frame?: string) {
  const theme = getColorTheme(manaCost, frame);
  const textureUrl = getTextureUrl(manaCost, frame);
  return { theme, textureUrl };
}

export function getThemeVars(theme: CardColorTheme) {
  return {
    frameVars: `--fill-0: ${theme.card}`,
    fieldVars: `--fill-0: ${theme.nameType}`,
    borderVars: `--stroke-0: ${theme.border}`,
    legendVars: `--fill-0: ${theme.border}`,
    ptVars: `--fill-0: ${theme.nameType}`,
  };
}

/** Build a jsdelivr CDN URL for a set symbol SVG from mtg-vectors */
const RARITY_MAP: Record<string, string> = {
  common: "C",
  uncommon: "U",
  rare: "R",
  mythic: "M",
};

export function getSetSymbolUrl(setCode: string, rarity?: string): string {
  const code = setCode.toUpperCase();
  const file = (rarity && RARITY_MAP[rarity.toLowerCase()]) || rarity?.toUpperCase() || "R";
  return `https://cdn.jsdelivr.net/gh/Investigamer/mtg-vectors@main/svg/optimized/set/${code}/${file}.svg`;
}

/**
 * Parse rules text and prepare for inline symbols
 * Returns an array of { type: "text" | "symbol", value: string }
 */
export function parseRulesText(text: string): Array<{ type: "text"; value: string } | { type: "symbol"; value: string }> {
  return text.split(/(\{[^}]+\})/).map((part) => {
    const match = part.match(/^\{([^}]+)\}$/);
    if (match) return { type: "symbol", value: match[1] };
    return { type: "text", value: part };
  });
}
