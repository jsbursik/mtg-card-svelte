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
  <div>
    <MtgCard
      frame="saga"
      cardName="The Antiquities War"
      manaCost={["3", "U"]}
      typeLine="Enchantment — Saga"
      chapters={[
        {
          numerals: "I",
          text: "Look at the top five cards of your library. You may reveal up to two artifact cards. Put them into your hand and the rest on the bottom.",
        },
        { numerals: "II", text: "Artifacts you control become 5/5 creatures until end of turn." },
        { numerals: "III", text: "Destroy all artifacts your opponents control." },
      ]}
      cardNumber="42"
      totalCards="291"
      rarity="R"
      setCode="EMA"
      language="EN"
      artist="AI Artist"
      year="2026"
    />
  </div>
  <div>
    <MtgCard
      frame="adventure"
      cardName="Bonecrusher Giant"
      manaCost={["2", "R"]}
      typeLine="Creature — Giant"
      rulesText="Whenever Bonecrusher Giant becomes the target of a spell, Bonecrusher Giant deals 2 damage to that spell's controller."
      flavorText="Not every tale ends in glory."
      adventureName="Stomp"
      adventureManaCost={["1", "R"]}
      adventureTypeLine="Instant — Adventure"
      adventureRulesText="Damage can't be prevented this turn. Stomp deals 2 damage to any target."
      power="4"
      toughness="3"
      cardNumber="115"
      totalCards="291"
      rarity="R"
      setCode="EMA"
      language="EN"
      artist="AI Artist"
      year="2026"
    />
  </div>
</main>
