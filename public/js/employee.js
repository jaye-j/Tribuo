let addTaskForm = document.querySelector('.add-task-form');
let taskContainer = document.querySelector('.select-tasks');
let claimTaskButton = document.querySelectorAll('.claim-task');

addTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  let taskTitle = document.querySelector('#task_title');
  let taskInstruction = document.querySelector('#task_instruction');
  console.log(taskTitle.value);
  console.log(taskInstruction.value);
  fetch('/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      taskTitle: taskTitle.value,
      taskInstruction: taskInstruction.value
    })
  });
});

taskContainer.addEventListener('submit', e => {
  e.preventDefault();
  let inputElements = document.getElementsByClassName('messageCheckbox');
  let checkedValue = null;
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      break;
    }
  }
  console.log(checkedValue);
  fetch('/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      selectedTask: checkedValue
    })
  });
});
