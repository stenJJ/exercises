function trackSightings(...animals) {
  console.log("Animal sightings:", ...animals);
}

const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
const protectedAreas = [...forestHabitats, ...savannahHabitats];

const rhinoStatus = {
  population: 500,
  status: "Endangered"
};
const updatedRhinoStatus = {
  ...rhinoStatus,
  population: 650,
  habitat: "Protected Reserve"
};

const lionProfile = {
  name: "Leo",
  age: 5,
  species: "Lion"
};
const lionProfileCopy = {
  ...lionProfile,
  genetics: { diversityScore: 0.85 }
};
lionProfileCopy.genetics.diversityScore = 0.95;

const ecosystemHealth = {
  waterQuality: "Good",
  foodSupply: {
    herbivores: "Abundant",
    carnivores: "Sufficient"
  }
};
const ecosystemHealthCopy = { ...ecosystemHealth };
ecosystemHealthCopy.foodSupply.herbivores = "Scarce";
