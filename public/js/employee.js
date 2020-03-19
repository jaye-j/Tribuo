let addTaskForm = document.querySelector('.add-task-form');
console.log(addTaskForm);

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