// Select HTML elements
const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const itemsLeft = document.querySelector("#items-left");
const clearCompletedBtn = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

// Store tasks in an array
let tasks = [];
let currentFilter = "all";

// Add a new task
todoForm.addEventListener("submit", function (event) {
event.preventDefault();

const taskText = taskInput.value.trim();

if (taskText === "") {
    alert("Please enter a task!");
    return;
}

const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
};

tasks.push(newTask);

taskInput.value = "";

renderTasks();

});

// Display tasks
function renderTasks() {
taskList.textContent = "";

const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
        return !task.completed;
    }

    if (currentFilter === "completed") {
        return task.completed;
    }

    return true;
});

filteredTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    if (task.completed) {
        li.classList.add("completed");
    }

    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.type = "button";

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
});

updateItemsLeft();

}

// Event delegation for completing and deleting tasks
taskList.addEventListener("click", function (event) {
const li = event.target.closest(".task-item");

if (!li) {
    return;
}

const taskId = Number(li.dataset.id);

if (event.target.classList.contains("delete-btn")) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
} else if (event.target.classList.contains("task-text")) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    task.completed = !task.completed;
}

renderTasks();

});

// Edit tasks using double-click
taskList.addEventListener("dblclick", function (event) {
    if (!event.target.classList.contains("task-text")) {
        return;
    }

    const li = event.target.closest(".task-item");
    const taskId = Number(li.dataset.id);

    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!task) return;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.classList.add("edit-input");

    event.target.replaceWith(editInput);

    editInput.focus();
    editInput.select();

    editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const updatedText = editInput.value.trim();

            if (updatedText !== "") {
                task.text = updatedText;
            }

            renderTasks();
        }

        if (e.key === "Escape") {
            renderTasks();
        }
    });
});

// Filter tasks
filterButtons.forEach(function (button) {
button.addEventListener("click", function () {
currentFilter = button.dataset.filter;

    filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    renderTasks();
});

});

// Count remaining tasks
function updateItemsLeft() {
const remainingTasks = tasks.filter(function (task) {
return !task.completed;
}).length;

itemsLeft.textContent = `${remainingTasks} ${remainingTasks === 1 ? "item" : "items"} left`;

}

// Clear completed tasks
clearCompletedBtn.addEventListener("click", function () {
tasks = tasks.filter(function (task) {
return !task.completed;
});

renderTasks();

});

// Initial display
renderTasks();
