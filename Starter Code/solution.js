// Task 1: changing text with innerText
const t1 = document.getElementById("task1");
t1.innerText = "Changed using 'innerText'.";

// Task 2: replacing with innerHTML + adding a button
const t2 = document.getElementById("task2");
t2.innerHTML = "<button>Submit</button>"; // hope this counts as 'adding'?

// Task 3: change body background to dark shade
document.addEventListener("DOMContentLoaded", function () {
  document.body.style.backgroundColor = "#232323";
});


// Task 4: add border to each item
const allItems = document.querySelectorAll(".item");
for (let i = 0; i < allItems.length; i++) {
  allItems[i].style.border = "1px solid #000"; // black border
}

// Task 5: update href
const link = document.getElementById("task5");
link.href = "https://www.springboard.com/";

// Task 6: set input value
const input = document.getElementById("task6");
input.value = "DOM Master";

// Task 7: add new class
const task7 = document.getElementById("task7");
task7.classList.add("new-class"); // not sure if this one shows visibly?

// Task 8: append button to div
const container = document.getElementById("task8");
const btn = document.createElement("button");
btn.textContent = "Click me maybe";
container.appendChild(btn);

// Task 9: remove an element
const removeMe = document.getElementById("task9");
removeMe.parentElement.removeChild(removeMe); // did it this way just for variety
