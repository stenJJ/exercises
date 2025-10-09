// run after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // grab elements we need
  const boxContainer = document.getElementById('box-container');
  const newBoxBtn = document.getElementById('new-box-button');
  const colorForm = document.getElementById('color-form');
  const colorInput = document.getElementById('color-input');

  // state
  let currentColor = ''; // no color until user sets it
  let nextId = 1;        // box id counter

  // helper: add a new box
  function addBox() {
    const div = document.createElement('div');
    div.className = 'box';

    // assign id and keep it in a data attribute for later restore
    div.dataset.boxId = String(nextId);
    div.textContent = div.dataset.boxId;

    // apply color if any was set by user
    if (currentColor) {
      div.style.backgroundColor = currentColor;
    }

    boxContainer.appendChild(div);
    nextId += 1;
  }

  // set color on submit, and update existing boxes
  colorForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const value = colorInput.value.trim();
    if (!value) return;

    currentColor = value;

    // update all current boxes
    const boxes = boxContainer.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.backgroundColor = currentColor;
    }

    // small UX reset
    colorInput.value = '';
    colorInput.blur();
  });

  // click button => new box
  newBoxBtn.addEventListener('click', addBox);

  // delegation for dblclick (remove)
  document.addEventListener('dblclick', function (evt) {
    const el = evt.target;
    if (el.classList && el.classList.contains('box')) {
      el.remove();
    }
  });

  // delegation for mouseover (show page coords of the box)
  document.addEventListener('mouseover', function (evt) {
    const el = evt.target;
    if (el.classList && el.classList.contains('box')) {
      // compute top-left page coordinates for the box
      const rect = el.getBoundingClientRect();
      const pageX = Math.round(rect.left + window.scrollX);
      const pageY = Math.round(rect.top + window.scrollY);
      el.textContent = `(${pageX}, ${pageY})`;
    }
  });

  // delegation for mouseout (restore id)
  document.addEventListener('mouseout', function (evt) {
    const el = evt.target;
    if (el.classList && el.classList.contains('box')) {
      el.textContent = el.dataset.boxId || '';
    }
  });

  // keydown: 'N' or 'n' => new box, but ignore if typing in color input
  document.addEventListener('keydown', function (evt) {
    const active = document.activeElement;
    if (active === colorInput) return;

    const k = evt.key;
    if (k === 'n' || k === 'N') {
      addBox();
    }
  });
});
