// script.js — Local Storage Exercise

document.addEventListener("DOMContentLoaded", function () {
  // DOM refs (match index.html)
  const noteContainer = document.getElementById("note-container");
  const newNoteButton = document.getElementById("new-note-button");
  const colorForm = document.getElementById("color-form");
  const colorInput = document.getElementById("color-input");

  // LocalStorage keys (namespaced)
  const LS_COLOR = "notesApp:color";
  const LS_COUNTER = "notesApp:counter";
  const LS_NOTES = "notesApp:notes";

  // State
  let noteColor = "";           // selected note color
  let noteIdCounter = 0;        // next id to assign
  let notes = [];               // [{ id: number, value: string }]

  // -- LS helpers ----
  function loadNotesSafe() {
    try {
      const raw = localStorage.getItem(LS_NOTES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  function saveNotes() {
    localStorage.setItem(LS_NOTES, JSON.stringify(notes));
  }
  function persistCounter() {
    localStorage.setItem(LS_COUNTER, String(noteIdCounter));
  }
  function persistColor() {
    localStorage.setItem(LS_COLOR, noteColor || "");
  }

  // --- Create one textarea element from a note record ----
  function createNoteElement({ id, value }) {
    const el = document.createElement("textarea");
    el.setAttribute("data-note-id", String(id));
    el.value = value;
    el.className = "note";
    if (noteColor) el.style.backgroundColor = noteColor;
    noteContainer.appendChild(el);
    return el;
  }

  // ----- Add new note (UI + state + LS) ---
  function addNewNote() {
    const id = noteIdCounter;
    const record = { id, value: `Note ${id}` };
    createNoteElement(record);
    notes.push(record);
    noteIdCounter += 1;
    saveNotes();
    persistCounter();
  }

  // ===== Initial load (fulfills the “read from local storage” TODOs) ===
  noteColor = localStorage.getItem(LS_COLOR) || "";         // Load color
  const counterRaw = localStorage.getItem(LS_COUNTER);      // Load counter
  noteIdCounter = Number.isInteger(parseInt(counterRaw, 10))
    ? parseInt(counterRaw, 10)
    : 0;

  notes = loadNotesSafe();                                  // Load notes
  for (const n of notes) createNoteElement(n);              // Rebuild UI

  // If a color was saved, you can optionally show it in the input
  if (noteColor) colorInput.placeholder = noteColor;

  // ===== Handlers (match the provided starter hooks) =====

  // Color submit: recolor all notes + persist color
  colorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newColor = colorInput.value.trim();
    if (!newColor) return;

    const all = document.querySelectorAll(".note");
    for (const note of all) note.style.backgroundColor = newColor;

    colorInput.value = "";
    colorInput.blur();

    noteColor = newColor;
    persistColor(); // save color
  });

  // New note button
  newNoteButton.addEventListener("click", function () {
    addNewNote();
  });

  // Delete on double-click (remove from DOM + LS)
  document.addEventListener("dblclick", function (event) {
    if (!event.target.classList || !event.target.classList.contains("note")) return;

    const el = event.target;
    const id = parseInt(el.getAttribute("data-note-id"), 10);

    // Remove from state
    notes = notes.filter((n) => n.id !== id);
    saveNotes();

    // Remove from DOM
    el.remove();
  });

  // Update on blur (capturing set in index.html starter; we use true below)
  noteContainer.addEventListener(
    "blur",
    function (event) {
      if (!event.target.classList || !event.target.classList.contains("note")) return;

      const el = event.target;
      const id = parseInt(el.getAttribute("data-note-id"), 10);
      const idx = notes.findIndex((n) => n.id === id);
      if (idx !== -1) {
        notes[idx] = { id, value: el.value };
        saveNotes();
      }
    },
    true // capture to catch non-bubbling blur
  );

  // Add note on 'N' unless typing in inputs/textarea
  window.addEventListener("keydown", function (event) {
    if (event.target.id === "color-input" || event.target.type === "textarea") return;
    if (event.key === "n" || event.key === "N") addNewNote();
  });
});
