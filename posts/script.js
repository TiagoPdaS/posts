const form = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const colorInput = document.getElementById("colorInput");
const notesContainer = document.getElementById("notes");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.style.backgroundColor = note.color;
    div.innerHTML = `
      <p>${note.text}</p>
      <button class="delete">✖</button>
    `;
    div.querySelector(".delete").addEventListener("click", () => {
      notes = notes.filter(n => n.id !== note.id);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    });
    notesContainer.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newNote = {
    id: Date.now(),
    text: noteInput.value,
    color: colorInput.value
  };
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  noteInput.value = "";
  renderNotes();
});

renderNotes();
