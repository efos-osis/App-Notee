const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const notesList = document.getElementById("notesList");

// Load catatan di awal
let notes = JSON.parse(localStorage.getItem("notes")) || [];
renderNotes();

// Simpan catatan
saveBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (text === "") return alert("Catatan tidak boleh kosong!");

    const note = {
        id: Date.now(),
        text
    };

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";

    renderNotes();
});

// Tampilkan catatan
function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <p>${note.text}</p>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Hapus</button>
        `;
        notesList.appendChild(div);
    });
}

// Hapus catatan
function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}
