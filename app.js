const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");
const taskItems = [...incompleteTaskHolder.children, ...completedTasksHolder.children];

const createElement = function (tag, { className, text } = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createNewTaskElement = function (taskString) {
  const listItem = createElement("li");
  const checkBox = createElement("input");
  const label = createElement("label", { text: taskString, className: "task" });
  const editInput = createElement("input", { className: "task" });
  const editButton = createElement("button", { text: "Edit", className: "edit" });
  const deleteButton = createElement("button", { className: "delete" });
  const deleteButtonImg = createElement("img");

  editInput.type = "text";
  checkBox.type = "checkbox";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  const inputValue = taskInput.value.trim();
  if (!inputValue) return;
  const listItem = createNewTaskElement(inputValue);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    const editValue = editInput.value.trim();

    if (!editValue) {
      editInput.focus();
      return;
    }
    label.innerText = editValue;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const handleCheckbox = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTasksHolder : incompleteTaskHolder;
  targetList.appendChild(listItem);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.addEventListener("change", handleCheckbox);
};

taskItems.forEach((taskItem) => bindTaskEvents(taskItem));
