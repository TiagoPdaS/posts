const form = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const colorInput = document.getElementById("colorInput");
const notesContainer = document.getElementById("notes");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className =
      "relative p-4 rounded-xl shadow-md text-left min-h-[80px] flex flex-col justify-between transition hover:scale-[1.02]";
    div.style.backgroundColor = note.color;
    div.innerHTML = `
      <p class="mb-2 text-gray-800 break-words">${note.text}</p>
      <button class="absolute top-2 right-2 bg-white/80 hover:bg-red-100 text-red-500 rounded-full p-1 transition delete" title="Excluir nota">✖</button>
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