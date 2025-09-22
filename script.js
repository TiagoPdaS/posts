const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const prioritySelect = document.getElementById("prioritySelect");
const notesContainer = document.getElementById("notesContainer");
const sortSelect = document.getElementById("sortSelect");

let notes = [];

// Função para renderizar notas
function renderNotes() {
  notesContainer.innerHTML = "";

  let sortedNotes = [...notes];

  if (sortSelect.value === "priority") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    sortedNotes.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else {
    sortedNotes.sort((a, b) => a.date - b.date);
  }

  sortedNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = `note p-3 rounded-lg shadow flex justify-between items-center ${note.priority}`;

    if (note.editing) {
      // Modo edição inline
      noteDiv.innerHTML = `
        <input type="text" id="editInput-${index}" value="${note.text}" 
          class="flex-1 rounded-lg p-2 text-black" />
        <div class="flex gap-2 ml-4">
          <button class="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md text-sm"
            onclick="saveEdit(${index})">💾 Salvar</button>
          <button class="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md text-sm"
            onclick="cancelEdit(${index})">❌ Cancelar</button>
        </div>
      `;
    } else {
      // Modo visualização normal
      noteDiv.innerHTML = `
        <span class="flex-1">${note.text}</span>
        <div class="flex gap-2 ml-4">
          <button class="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md text-sm"
            onclick="editNote(${index})">✏️ Editar</button>
          <button class="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md text-sm"
            onclick="deleteNote(${index})">🗑️ Excluir</button>
        </div>
      `;
    }

    notesContainer.appendChild(noteDiv);
  });
}

// Adicionar nota
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newNote = {
    text: noteInput.value,
    priority: prioritySelect.value,
    date: new Date(),
    editing: false
  };

  notes.push(newNote);
  noteInput.value = "";
  renderNotes();
});

// Excluir nota
function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

// Editar nota (troca para modo edição)
function editNote(index) {
  notes[index].editing = true;
  renderNotes();
}

// Salvar edição
function saveEdit(index) {
  const input = document.getElementById(`editInput-${index}`);
  if (input.value.trim() !== "") {
    notes[index].text = input.value.trim();
    notes[index].editing = false;
    renderNotes();
  }
}

// Cancelar edição
function cancelEdit(index) {
  notes[index].editing = false;
  renderNotes();
}

// Ordenar quando mudar opção
sortSelect.addEventListener("change", renderNotes);
