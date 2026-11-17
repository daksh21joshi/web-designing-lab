// Get the HTML elements that we need to use.
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedButton = document.getElementById("clearCompleted");

// Update the number of tasks and show a message if the list is empty.
function updateTaskCount() {
  const tasks = taskList.querySelectorAll("li");
  const remainingTasks = taskList.querySelectorAll("li:not(.completed)");

  taskCount.textContent = remainingTasks.length + " tasks left";
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// Add a new task to the list.
function addTask(taskText) {
  const listItem = document.createElement("li");

  // Checkbox is used to mark a task as completed.
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", "Mark task as completed");

  // This span displays the task text.
  const taskName = document.createElement("span");
  taskName.textContent = taskText;

  // Delete button removes this task from the list.
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";

  checkbox.addEventListener("change", function() {
    listItem.classList.toggle("completed", checkbox.checked);
    updateTaskCount();
  });

  deleteButton.addEventListener("click", function() {
    listItem.remove();
    updateTaskCount();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskName);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  updateTaskCount();
}

// Listen for the form submit event when Add Task is clicked.
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  addTask(taskText);
  taskInput.value = "";
  taskInput.focus();
});

// Remove all tasks that have been marked as completed.
clearCompletedButton.addEventListener("click", function() {
  const completedTasks = taskList.querySelectorAll("li.completed");

  completedTasks.forEach(function(task) {
    task.remove();
  });

  updateTaskCount();
});

// Show the correct task count when the page first opens.
updateTaskCount();
