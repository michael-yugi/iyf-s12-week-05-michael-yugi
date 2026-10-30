// LESSON 10 — To-Do List

// DOM elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// Application state
let todos = [];
let currentFilter = "all";
let nextId = 1;
let editingId = null;

// Create one task row from a todo object
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = String(todo.id);
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark "${todo.text}" as completed`);
    li.appendChild(checkbox);

    if (editingId === todo.id) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit";
        editInput.value = todo.text;
        editInput.setAttribute("aria-label", "Edit task");
        li.appendChild(editInput);
        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                saveEdit(todo.id, editInput.value);
            } else if (event.key === "Escape") {
                editingId = null;
                render();
            }
        });
        editInput.addEventListener("blur", () => {
            if (editingId === todo.id) saveEdit(todo.id, editInput.value);
        });
        requestAnimationFrame(() => {
            editInput.focus();
            editInput.select();
        });
    } else {
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        li.appendChild(span);
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", `Delete "${todo.text}"`);
    li.appendChild(deleteButton);

    return li;
}

// Return only tasks matching the selected filter
function visibleTodos() {
    if (currentFilter === "active") return todos.filter((todo) => !todo.completed);
    if (currentFilter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
}

// Draw the page from the todos array
function render() {
    todoList.replaceChildren(...visibleTodos().map(createTodoElement));
    updateStats();
}

// Update the remaining-task count
function updateStats() {
    const count = todos.filter((todo) => !todo.completed).length;
    itemsLeft.textContent = `${count} item${count === 1 ? "" : "s"} left`;
}

// Add a task
function addTodo(text) {
    todos.push({ id: nextId++, text, completed: false });
    render();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
        formError.textContent = "Type a task first.";
        input.focus();
        return;
    }
    formError.textContent = "";
    addTodo(text);
    input.value = "";
    input.focus();
});

// Toggle or delete tasks by updating the array
function toggleTodo(id) {
    todos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    render();
}

function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    if (editingId === id) editingId = null;
    render();
}

// One delegated click listener handles all task rows
// Checkbox and task text clicks toggle completion; delete clicks remove the task.
todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;
    const id = Number(item.dataset.id);
    if (event.target.closest(".delete")) {
        deleteTodo(id);
        return;
    }
    if (event.target.matches(".edit")) return;
    toggleTodo(id);
});

// Filters
function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    render();
}

filters.forEach((button) => {
    button.addEventListener("click", () => filterTodos(button.dataset.filter));
});

// Remove all completed tasks
function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);

// Bonus: double-click a task's text to edit it
function saveEdit(id, value) {
    if (editingId !== id) return;
    const text = value.trim();
    if (text) {
        todos = todos.map((todo) => todo.id === id ? { ...todo, text } : todo);
    }
    editingId = null;
    render();
}

todoList.addEventListener("dblclick", (event) => {
    const textElement = event.target.closest(".todo-text");
    if (!textElement) return;
    const item = textElement.closest(".todo-item");
    if (!item) return;
    editingId = Number(item.dataset.id);
    render();
});

// Initial display
render();
