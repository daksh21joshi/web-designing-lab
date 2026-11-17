// Select the form, input box, task list and task counter.
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

// Update the number of tasks that are not completed.
function updateTaskCount() {
  const remainingTasks = taskList.querySelectorAll("li:not(.completed)").length;
  taskCount.textContent = remainingTasks + " tasks remaining";
}

// Add a new task to the list.
function addTask(taskText) {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskName = document.createElement("span");
  taskName.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";

  checkbox.addEventListener("change", function () {
    listItem.classList.toggle("completed", checkbox.checked);
    updateTaskCount();
  });

  deleteButton.addEventListener("click", function () {
    listItem.remove();
    updateTaskCount();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskName);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
  updateTaskCount();
}

// Run this code when the form is submitted.
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  addTask(taskText);
  taskInput.value = "";
  taskInput.focus();
});