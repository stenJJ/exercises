const mythicalCreatures = [
  { name: "Dragon", type: "Fire", lastSeen: "Volcano Valley" },
  { name: "Mermaid", type: "Water", lastSeen: "Coral Caves" },
  { name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest" },
  { name: "Griffin", type: "Air", lastSeen: "Highwind Mountains" },
  { name: "Kraken", type: "Water", lastSeen: "Abyssal Depths" }
];

// 1) Find the first creature of type "Water" and log its name
const firstWaterCreature = mythicalCreatures.find(function(creature) {
  return creature.type === "Water";
});
console.log("First water creature:", firstWaterCreature.name); // Should log "Mermaid"

// 2) Find the index of the "Griffin" and log it
const griffinIndex = mythicalCreatures.findIndex(function(creature) {
  return creature.name === "Griffin";
});
console.log("Index of Griffin:", griffinIndex); // Should log 3

// 3) Find the first creature last seen in "Enchanted Forest" and log its name
const seenInEnchantedForest = mythicalCreatures.find(function(creature) {
  return creature.lastSeen === "Enchanted Forest";
});
console.log("First creature seen in Enchanted Forest:", seenInEnchantedForest.name); // Should log "Unicorn"

