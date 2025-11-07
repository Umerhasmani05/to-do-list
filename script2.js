const Inputbox = document.getElementById("input-box");
const Listcontainer = document.getElementById("list-container");
const dateDisplay = document.getElementById("date-display");

// 🗓️ Display today's date
const today = new Date();
dateDisplay.textContent = today.toDateString();
dateDisplay.style.color = "#002765";
dateDisplay.style.fontWeight = "bold";
dateDisplay.style.textAlign = "center";

// ➕ Add new task
function addtask() {
    if (Inputbox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${Inputbox.value}</span>
            <div class="task-actions">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;
        Listcontainer.appendChild(li);
        saveData();
    }
    Inputbox.value = "";
}

// 🖱️ Handle clicks (check, delete, edit)
Listcontainer.addEventListener("click", function (e) {
    const target = e.target;

    // Check item
    if (target.tagName === "LI" || target.classList.contains("task-text")) {
        target.closest("li").classList.toggle("checkitem");
        saveData();
    }

    // Delete item
    if (target.classList.contains("delete-btn")) {
        target.closest("li").remove();
        saveData();
    }

    // ✏️ Edit item
    if (target.classList.contains("edit-btn")) {
        const li = target.closest("li");
        const textSpan = li.querySelector(".task-text");
        const oldText = textSpan.textContent;
        const newText = prompt("Edit your task:", oldText);
        if (newText !== null && newText.trim() !== "") {
            textSpan.textContent = newText.trim();
            saveData();
        }
    }
}, false);

// 💾 Save & Load data
function saveData() {
    localStorage.setItem("data", Listcontainer.innerHTML);
}

function showTask() {
    Listcontainer.innerHTML = localStorage.getItem("data");
}

showTask();

// 📥 Download List (TXT)
function downloadList() {
    const text = Array.from(Listcontainer.querySelectorAll(".task-text"))
        .map(task => task.textContent)
        .join("\n");
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "todo-list.txt";
    a.click();
}
