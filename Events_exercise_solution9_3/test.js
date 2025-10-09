// test.js
// basic smoke test to confirm main script runs and DOM elements exist

describe("Events Exercise", () => {
  test("box-container element exists", () => {
    const container = document.getElementById("box-container");
    expect(container).not.toBeNull();
  });

  test("new-box-button exists", () => {
    const btn = document.getElementById("new-box-button");
    expect(btn).not.toBeNull();
  });

  test("color-form and color-input exist", () => {
    const form = document.getElementById("color-form");
    const input = document.getElementById("color-input");
    expect(form).not.toBeNull();
    expect(input).not.toBeNull();
  });
});
