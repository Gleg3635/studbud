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
var tasklist = document.getElementById("tasklist");

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

  // Modified to include task description
  addTask(taskName, taskDescription, dueDate, estimatedTime, priorityRating, completionTime, false);
  console.log(taskList);
})

var taskListArray = [];

// Modified to include task description
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

function renderTask(task){
  // Create HTML elements (Drew - Tutor)
  let item = document.createElement("li");
  item.innerHTML = "<p>" + task.taskName + "</p>";

  tasklist.appendChild(item);

  // Task description

  // Extra Task DOM elements (Drew - Tutor)
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);


  // Event Listeners for DOM elements (Drew - Tutor)
  delButton.addEventListener("click", function(event){
    event.preventDefault();
    item.remove();
  })

  // Clear the input form (Drew - Tutor)
  form.reset();
}

// Create task boards
  // Board container
  let card = document.createElement('div');
  card.setAttribute('class', 'board');

  // Task Heading
  let heading = document.createElement('h1');
  heading.textContent = task.taskDescription;

  // Description Paragraph
  let paragraph = document.createElement('p');
  movie.description = task.taskDescription.substring(0, 300);
  paragraph.textContent = `${task.taskDescription}`;

  // Appends the board to the main content div
  kanban.appendChild(board);

  // Append all the sub elements to the board div
  board.appendChild(heading);
  board.appendChild(paragraph);