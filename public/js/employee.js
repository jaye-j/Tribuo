let addTaskForm = document.querySelector('.add-task-form');
let claimTaskForm = document.querySelector('.select-tasks');

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

claimTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log(claimTaskForm);
  let taskSelection = claimTaskForm.value;
  console.log(taskSelection);
  let postdata = 'THis is post data test';
  fetch('/employeetaskselection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      postdata: postdata
    })
  });
});
