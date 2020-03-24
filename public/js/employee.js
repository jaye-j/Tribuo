let addTaskForm = document.querySelector(".add-task-form");
let taskContainer = document.querySelector(".select-tasks");
let claimTaskButton = document.querySelector(".claim-task");
let submitTaskButton = document.querySelector(".finish-task");
let submitTaskForm = document.querySelector(".select-specific-tasks");
let logOutBtn = document.querySelector(".logoutbtn");

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
  let specificTaskDisplay = document.querySelector(".our-tasks");
  let checkedValue = null;
  let claimedInfo = [];
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      break;
    }
  }
  console.log(checkedValue);
  fetch("/employeeselectedtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      selectedTask: checkedValue
    })
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      let sendData = [checkedValue, response];
      socket.emit("claimed task", sendData);
      //code for displaying the added task through the append which takes the data for the task from the response.
      console.log(response);
    });
});

socket.on("claimed task", data => {
  let employee_id = document.querySelector(".id-holder").id;
  console.log(employee_id);
  let claimedTask = document.getElementById(`${data[0]}`);
  let labelForTask = claimedTask.labels[0];
  console.log(claimedTask);
  console.log(labelForTask);
  claimedTask.remove();
  labelForTask.remove();
  if (employee_id == data[1].employee_id) {
    let output = "";
    output += `<input
      class="messageCheckbox"
      type="radio"
      name="specificTasks"
      value="${data[1].id}"
      id="${data[1].id}"
    />`;
    output += `<label for="${data[1].id}">`;
    output += `${data[1].task_title}</label>`;
    output += `<div>${data[1].task_instruction}</div>`;
    submitTaskButton.insertAdjacentHTML("beforebegin", output);
  }
});

submitTaskForm.addEventListener("submit", e => {
  e.preventDefault();
  let inputElements = document.getElementsByClassName("messageSubmitCheckbox");
  let checkedValue = null;
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      break;
    }
  }
  console.log(checkedValue);
  fetch("/employeecompletedtask", {
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

logOutBtn.addEventListener("click", e => {
  console.log("logout button clicked");
  fetch("/employeelogout", {
    method: "GET"
  });
});
