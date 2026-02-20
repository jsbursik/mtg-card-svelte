<script lang="ts">
  import MtgCard from "./lib/MtgCard.svelte";
</script>

<main style="display: flex; flex-direction: row">
  <div>
    <MtgCard
      frame="standard"
      cardName="Llanowar Elves"
      cardArt="/Llanowar-Elves-MtG-Art.jpg"
      manaCost={["G"]}
      typeLine="Creature — Elf Druid"
      rulesText={`{T}: Add {G}.`}
      flavorText="As patient and generous as life, as harsh and merciless as nature."
      power="1"
      toughness="1"
      cardNumber="101"
      totalCards="136"
      rarity="C"
      setCode="GN3"
      language="EN"
      artist="Chris Rahn"
      year="2022"
    />
  </div>
  <div>
    <MtgCard
      frame="planeswalker"
      cardName="Jace, the Mind Sculptor"
      cardArt="/Llanowar-Elves-MtG-Art.jpg"
      manaCost={["2", "U", "U"]}
      typeLine="Legendary Planeswalker — Jace"
      legendary
      loyaltyAbilities={[
        { cost: "+2", text: "Look at the top card of target player's library." },
        { cost: "0", text: "Draw three cards, then put two cards from your hand on top." },
        { cost: "-1", text: "Return target creature to its owner's hand." },
        { cost: "-12", text: "Exile all cards from target player's library." },
      ]}
      startingLoyalty="3"
    />
  </div>
</main>
