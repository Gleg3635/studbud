// Add button
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
  console.log(column);
})

var taskListArray = [];

// Modified
function addTask(taskName, taskDescription, dueDate, estimatedTime, priorityRating, completionTime, completionStatus) {
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
    estimatedTime,
    completionStatus
  };
  taskListArray.push(task);
  renderTask(task);
}

// Renders tasks in kanban container
function renderTask(task){
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
  })

  // Clear the input form (Drew - Tutor)
  form.reset();
}