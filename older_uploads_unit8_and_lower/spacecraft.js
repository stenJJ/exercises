
const activateHyperdrive = () => {
    console.log("Hyperdrive activated!");
};

activateHyperdrive();

const scanForLife = () => "No lifeforms detected";

console.log(scanForLife());


const currentCoordinates = () => ({
    x: 100,
    y: 200,
    z: -50,
});

console.log(currentCoordinates());


const spacecraft = {
    name: "Explorer I",
    receiveMessage: (message) => {
        console.log("Message received:", message);
        console.log("Spacecraft name:", this.name);
    },
};

spacecraft.receiveMessage("Return to base.");


