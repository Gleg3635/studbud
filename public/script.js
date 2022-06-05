// Add button and popup
document.querySelector("#show-task-creator").addEventListener("click",function(){
  document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active");
});

// Task creation (Drew - Tutor)
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button")
var taskInput = document.getElementById("taskInput");
// Changed to column (from tasklist)
var column = document.getElementById("column");

// Additional variable for task decription
var taskDescription = document.getElementById("taskDescriptionInput");

var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

renderTask();

form.addEventListener("submit", function(event){
  event.preventDefault();
  let taskName = taskInput.value;

  // Additional variable for task description
  let taskDescription = taskDescriptionInput.value;
  
  let dueDate = dueDateInput.value;
  let completionTime = completionTimeInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;

  // Modified
  addTask(taskName, taskDescription, dueDate, estimatedTime, priorityRating, completionTime, false);
})

var taskListArray = [];

// Modified
function addTask(taskName, taskDescription, dueDate, estimatedTime, priorityRating, completionTime) {
  let d = new Date();
  let dateCreated = d.getFullYear();
  let task = {
    taskName,
    taskDescription,
    dueDate,
    dateCreated,
    estimatedTime,
    completionTime,
    priorityRating,
  };

  taskListArray.push(task);

  // SAVING TASK TO LOCALSTORAGE
  let existingItems = getItems();

  // Pushes tasks from localstorage into taskListArray
  existingItems.push(taskListArray)

  // Stringifies tasks so they can be stored in local storage
  existingItems = JSON.stringify(existingItems);

  // Saves all tasks to local storage
  localStorage.setItem('tasks', existingItems);
  
  renderTask(task);
}

function getItems() {
  // Checks if there are any item items in localstorage already
  let tasks = localStorage.getItem('tasks');

  // Returns an empty array if nothing has been stored in localstorage yet
  if (tasks == null) {
    return [];
  }

  // Unstringifies the data stored from localstorage
  tasks = JSON.parse(tasks);

  // Returns the list of tasks
  return tasks;
}

// Renders tasks in kanban container
function renderTask(){

  let tasks = getItems();

  tasks.forEach(function(task) {

  // Creates board
  let board = document.createElement('div');
  board.setAttribute('class', 'board');
  
  // Creates task heading
  let heading = document.createElement('h1');
  heading.textContent = `${task.taskName}`;
  
  // Creates task description
  let paragraph = document.createElement('p');
  paragraph.textContent = `${task.taskDescription}`;

  let date = document.createElement('p');
  date.textContent = `Date due: ${task.dueDate}`;

  let completion = document.createElement('p');
  completion.textContent = `Time due: ${task.completionTime}`;

  let estimated = document.createElement('p');
  estimated.textContent = `Estimated completion time: ${task.estimatedTime}mins`;

  let priority = document.createElement('p');
  priority.textContent = `Priority: ${task.priorityRating}`;

  // Appends board to column container
  column.appendChild(board);

  // Append all the sub elements to the board container
  board.appendChild(heading);
  board.appendChild(paragraph);
  board.appendChild(date);
  board.appendChild(completion);
  board.appendChild(estimated);
  board.appendChild(priority);

  // Extra Task DOM elements (Drew - Tutor)
  let delButton = document.createElement("button");
  delButton.setAttribute('id', 'delButton');
  let delButtonText = document.createTextNode("delete");
  delButton.appendChild(delButtonText);
  board.appendChild(delButton);

  // Event Listeners for DOM elements (Drew - Tutor)
  delButton.addEventListener("click", function(event){
    event.preventDefault();
    board.remove();
    removeItem(task.taskName);
  })
});

  // Clear the input form (Drew - Tutor)
  form.reset();

}

// Removes a specific item by name from local storage.
function removeItem(taskName) {
  
  let items = getItems();

  let itemIndex = tasks.findIndex(function(task) {
    return task.taskName == taskName;
  });

  tasks.splice(itemIndex, 1);

  tasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasks);
}