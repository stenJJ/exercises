/* Task 1: Compile Participant Details with Shorthand Property Names */
let name = "Alice";
let age = 30;
let studyField = "Astrophysics";
let participant = { name, age, studyField };
console.log("Participant details:", participant);

/* Task 2: Implement a Shorthand Function for Participant Info */
participant.displayInfo = function() {
  console.log(`Participant: ${this.name}, Age: ${this.age}, Field: ${this.studyField}`);
};
participant.displayInfo();

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
participant.displayInfoArrow = () => {
  console.log(`Participant: ${this.name}, Age: ${this.age}, Field: ${this.studyField}`);
};
participant.displayInfoArrow();

/*
 * Observations:
 * The arrow function did not log the correct participant details.
 * This is because arrow functions don't bind their own `this`,
 * so `this` in displayInfoArrow doesn't refer to the participant object.
 * Instead, `this` points to the outer scope 
 */

/* Task 4: Using Computed Property Names */
function updateParticipantInfo(obj, propName, value) {
  return { ...obj, [propName]: value };
}
let updatedParticipant = updateParticipantInfo(participant, "experience", "5 years");
console.log("Updated participant:", updatedParticipant);
