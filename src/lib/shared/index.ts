import ManaSymbol from "../ManaSymbol.svelte";

// Static assets (no theming needed)
import artistIcon from "../../assets/artist-icon.svg";
import setSymbolSvg from "../../assets/set-symbol.svg";

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
