// categories is the main data structure for the app; it looks like this:
//
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];  // global state the starter file defined :contentReference[oaicite:0]{index=0}


// my additions: API base + config
const BASE_API_URL = "https://rithm-jeopardy.herokuapp.com/api";
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;


/** Get NUM_CATEGORIES random category ids from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {           // replaced empty starter stub :contentReference[oaicite:1]{index=1}
  // grab 100 categories then pick 6 random ones from there
  const res = await $.getJSON(`${BASE_API_URL}/categories?count=100`);
  // res is an array of objects: { id, title, clues_count }

  const allIds = res.map(c => c.id);
  const pickedIds = [];

  // randomly sample 6 unique ids
  while (pickedIds.length < NUM_CATEGORIES && allIds.length > 0) {
    const randIdx = Math.floor(Math.random() * allIds.length);
    const id = allIds[randIdx];

    if (!pickedIds.includes(id)) {
      pickedIds.push(id);
    }
  }

  console.log("category ids:", pickedIds);
  return pickedIds;
}


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "...", answer: "...", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {         // replaced empty starter stub :contentReference[oaicite:2]{index=2}
  const res = await $.getJSON(`${BASE_API_URL}/category?id=${catId}`);
  // res: { id, title, clues: [ {question, answer, id}, ... ] }

  const allClues = res.clues.slice(); // copy so we can mutate
  const pickedClues = [];

  // randomly sample up to NUM_QUESTIONS_PER_CAT clues
  while (pickedClues.length < NUM_QUESTIONS_PER_CAT && allClues.length > 0) {
    const randIdx = Math.floor(Math.random() * allClues.length);
    const clue = allClues.splice(randIdx, 1)[0];

    pickedClues.push({
      question: clue.question,
      answer: clue.answer,
      showing: null   // null → question → answer
    });
  }

  return {
    title: res.title,
    clues: pickedClues
  };
}


/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */

function fillTable() {                      // replaced empty starter stub :contentReference[oaicite:3]{index=3}
  const $board = $("#jeopardy");
  $board.empty();

  // header row with category titles
  const $thead = $("<thead></thead>");
  const $headRow = $("<tr></tr>");

  for (let cat of categories) {
    const $th = $("<th></th>").text(cat.title);
    $headRow.append($th);
  }

  $thead.append($headRow);
  $board.append($thead);

  // body: 5 question rows
  const $tbody = $("<tbody></tbody>");

  for (let clueIdx = 0; clueIdx < NUM_QUESTIONS_PER_CAT; clueIdx++) {
    const $tr = $("<tr></tr>");

    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
      const $td = $("<td>?</td>");

      // store indices so click handler knows which clue
      $td.attr("data-cat", catIdx);
      $td.attr("data-clue", clueIdx);

      $tr.append($td);
    }

    $tbody.append($tr);
  }

  $board.append($tbody);

  // click handler for all cells
  $("#jeopardy td").on("click", handleClick);
}


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 */

function handleClick(evt) {                 // replaced empty starter stub :contentReference[oaicite:4]{index=4}
  const $cell = $(evt.target);
  const catIdx = $cell.data("cat");
  const clueIdx = $cell.data("clue");

  if (catIdx == null || clueIdx == null) return;

  const clue = categories[catIdx].clues[clueIdx];
  if (!clue) {
    console.log("no clue for this cell somehow");
    return;
  }

  if (clue.showing === null) {
    $cell.text(clue.question);
    clue.showing = "question";
  } else if (clue.showing === "question") {
    $cell.text(clue.answer);
    clue.showing = "answer";
  } else {
    // already showing answer → do nothing
  }
}


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {                // small implementation instead of empty stub
  $("#restart").prop("disabled", true).text("Loading...");
  $("#jeopardy").html("<tbody><tr><td>Loading...</td></tr></tbody>");
}


/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {                // small implementation instead of empty stub
  $("#restart").prop("disabled", false).text("Restart");
}


/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 */

async function setupAndStart() {            // replaced empty starter stub, calls helpers now
  showLoadingView();
  categories = [];

  try {
    const ids = await getCategoryIds();

    for (let id of ids) {
      const cat = await getCategory(id);
      categories.push(cat);
    }

    fillTable();
  } catch (err) {
    console.error("error setting up game:", err);
    alert("something went wrong loading jeopardy data, sorry :(");
  } finally {
    hideLoadingView();
  }
}


/** On click of start / restart button, set up game. */
/** On page load, add event handler for clicking clues */

$(async function () {                       // replaces the starter TODOs :contentReference[oaicite:5]{index=5}
  await setupAndStart();

  $("#restart").on("click", function () {
    setupAndStart();
  });
});
