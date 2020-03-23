let addTaskForm = document.querySelector(".add-task-form");
let taskContainer = document.querySelector(".select-tasks");
let claimTaskButton = document.querySelector(".claim-task");
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
  let claimTaskButton = document.querySelector(".claim-task");
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
  claimTaskButton.insertAdjacentHTML("beforebegin", output);
});

taskContainer.addEventListener("submit", e => {
  e.preventDefault();
  let inputElements = document.getElementsByClassName("messageCheckbox");
  let checkedValue = null;
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      break;
    }
  }
  console.log(checkedValue);
  socket.emit("claimed task", checkedValue);
  fetch("/employeeselectedtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      selectedTask: checkedValue
    })
  }).then(() => {
    socket.emit("claimed task", checkedValue);
  });
});

socket.on("claimed task", checkedValue => {
  let claimedTask = document.getElementById(`${checkedValue}`);
  let labelForTask = claimedTask.labels[0];
  console.log(claimedTask);
  console.log(labelForTask);
  claimedTask.remove();
  labelForTask.remove();
});
