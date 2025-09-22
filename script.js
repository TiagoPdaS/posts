const form = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const colorInput = document.getElementById("colorInput");
const notesContainer = document.getElementById("notes");
const colorRadios = document.querySelectorAll(".color-radio");
const addBtn = document.getElementById("addBtn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// --- Funções utilitárias ---
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className =
      "relative p-4 rounded-xl shadow-md text-left min-h-[80px] flex flex-col justify-between transition hover:scale-[1.02] " +
      (note.done ? "opacity-60" : "");
    div.style.backgroundColor = note.color;

    div.innerHTML = `
      <div class="flex items-start gap-2">
        <input type="checkbox" class="done-checkbox mt-1" ${note.done ? "checked" : ""} aria-label="Marcar nota como concluída">
        <p class="mb-2 text-gray-800 break-words flex-1 ${note.done ? "line-through" : ""}">${note.text}</p>
      </div>
      <div class="absolute top-2 right-2 flex gap-1">
        <button class="edit bg-white/80 hover:bg-blue-100 text-blue-500 rounded-full p-1 transition" aria-label="Editar nota">✎</button>
        <button class="delete bg-white/80 hover:bg-red-100 text-red-500 rounded-full p-1 transition" aria-label="Excluir nota">✖</button>
      </div>
    `;

    // Checkbox concluído
    div.querySelector(".done-checkbox").addEventListener("change", (e) => {
      note.done = e.target.checked;
      saveNotes();
      renderNotes();
    });

    // Excluir
    div.querySelector(".delete").addEventListener("click", () => {
      notes = notes.filter(n => n.id !== note.id);
      saveNotes();
      renderNotes();
    });

    // Editar
    div.querySelector(".edit").addEventListener("click", () => editNote(div, note));

    notesContainer.appendChild(div);
  });
}

function addNote(text, color) {
  const newNote = {
    id: Date.now(),
    text,
    color,
    done: false
  };
  notes.push(newNote);
  saveNotes();
  renderNotes();
}

function editNote(div, note) {
  div.innerHTML = `
    <textarea class="w-full rounded-lg border border-gray-300 p-2 mb-2 resize-none" style="font-size:16px;">${note.text}</textarea>
    <div class="flex gap-2">
      <button class="save bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition">Salvar</button>
      <button class="cancel bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-3 py-1 rounded transition">Cancelar</button>
    </div>
  `;
  const textarea = div.querySelector("textarea");
  textarea.focus();

  div.querySelector(".save").addEventListener("click", () => {
    const newText = textarea.value.trim();
    if (newText) {
      note.text = newText;
      saveNotes();
      renderNotes();
    }
  });

  div.querySelector(".cancel").addEventListener("click", () => renderNotes());
}

// --- Listeners ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (!text) return;

  addNote(text, colorInput.value);
  noteInput.value = "";
  addBtn.disabled = true;
  noteInput.focus();
});

// Habilitar/desabilitar botão
noteInput.addEventListener("input", () => {
  addBtn.disabled = !noteInput.value.trim();
});

// Color picker
colorRadios.forEach(radio => {
  radio.addEventListener("change", function () {
    if (this.checked) colorInput.value = this.value;
  });
});

// Atalho de teclado: Ctrl+Enter para adicionar
noteInput.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter" && noteInput.value.trim()) {
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  }
});

renderNotes();
