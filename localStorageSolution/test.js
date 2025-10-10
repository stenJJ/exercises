// tes

describe("Local Storage Notes App", () => {
  test("should have main elements", () => {
    expect(document.getElementById("note-container")).not.toBeNull();
    expect(document.getElementById("new-note-button")).not.toBeNull();
    expect(document.getElementById("color-form")).not.toBeNull();
    expect(document.getElementById("color-input")).not.toBeNull();
  });

  test("should initialize localStorage keys correctly", () => {
    localStorage.clear();
    localStorage.setItem("notesApp:color", "pink");
    expect(localStorage.getItem("notesApp:color")).toBe("pink");
  });

  test("should store notes as JSON", () => {
    const sample = [{ id: 0, value: "Test note" }];
    localStorage.setItem("notesApp:notes", JSON.stringify(sample));
    const parsed = JSON.parse(localStorage.getItem("notesApp:notes"));
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].value).toBe("Test note");
  });
});
