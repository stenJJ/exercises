// inventory logic
let inventory = [];

export function addItem(item) {
  inventory.push(item); // add item
  console.log(`${item} added.`);
}

export function removeItem(item) {
  inventory = inventory.filter(i => i !== item); // remove item
  console.log(`${item} removed.`);
}

export function listItems() {
  console.log("Current inventory:", inventory.join(", ")); // list items
}
