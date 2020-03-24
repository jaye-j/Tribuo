let addTaskForm = document.querySelector(".add-task-form");
let asssignTaskDropdown = document.querySelector(".select-tasks");
const socket = io();

let completedTaskForm = document.querySelector(
  ".select-tasks-manager-approval"
);
let assignTaskButton = document.querySelector(".assign-task");
let logOutBtn = document.querySelector(".logoutbtn");

completedTaskForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("hi");
  let inputElements = document.getElementsByClassName(
    "messageCheckboxComplete"
  );
  let checkedValue = null;
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      break;
    }
  }
  console.log(checkedValue);
  fetch("/managerapprovedtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completedTask: checkedValue
    })
  });
  let submitTask = document.getElementById(`${checkedValue}`);
  let labelForTask = submitTask.labels[0];
  let instructions = submitTask.labels[0].nextElementSibling;
  console.log(submitTask);
  console.log(labelForTask);
  instructions.remove();
  submitTask.remove();
  labelForTask.remove();
});

addTaskForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log(e);
  let taskTitle = document.querySelector("#task_title");
  let taskInstruction = document.querySelector("#task_instruction");
  console.log(taskTitle.value);
  console.log(taskInstruction.value);
  let taskData = {
    task_title: taskTitle.value,
    task_instruction: taskInstruction.value
  };
  console.log(taskData);

  fetch("/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      taskTitle: taskTitle.value,
      taskInstruction: taskInstruction.value
    })
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
      taskData["task_id"] = res;
      socket.emit("new task", taskData);
    });
});

socket.on("new task", taskData => {
  let asssignTaskDropdown = document.querySelector(".select-tasks");
  console.log("client received new task");
  let output = "";
  output += `<input
    class="messageCheckbox"
    type="radio"
    name="tasks"
    value="${taskData.task_id}"
    id="${taskData.task_id}"
  />`;
  output += `<label for="${taskData.task_id}"> ${taskData.task_title}</label><br />`;
  asssignTaskDropdown.insertAdjacentHTML("beforebegin", output);
});

logOutBtn.addEventListener("click", e => {
  console.log("logout button clicked");
  fetch("/employeelogout", {
    method: "GET"
  });
});
