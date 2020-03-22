let addTaskForm = document.querySelector(".add-task-form");
let taskContainer = document.querySelector(".task-container");
let claimTaskButton = document.querySelectorAll(".claim-task");
const socket = io();

addTaskForm.addEventListener("submit", e => {
  e.preventDefault();
  let taskTitle = document.querySelector("#task_title");
  let taskInstruction = document.querySelector("#task_instruction");
  console.log(taskTitle.value);
  console.log(taskInstruction.value);
  let taskData = {
    task_title: taskTitle.value,
    task_instruction: taskInstruction.value
  };
  console.log(taskData);
  socket.emit("new task", taskData);
  fetch("/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      taskTitle: taskTitle.value,
      taskInstruction: taskInstruction.value
    })
  });
});

socket.on("new task", taskData => {
  console.log("client received new task");
  let existingHTML = taskContainer.innerHTML;
  console.log(existingHTML);
  let output = "";
  output += `<div class="task">`;
  output += `<h1 class="task-div">${taskData.task_title}</h1>`;
  output += `<div>${taskData.task_instruction}</div>`;
  output += `<button class="claim-task">`;
  output += `Claim Task`;
  output += `</button>`;
  output += `</div>`;
  let updatedHTML = existingHTML + output;
  console.log(updatedHTML);
  taskContainer.innerHTML = updatedHTML;
});
