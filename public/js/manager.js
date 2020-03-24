let completedTaskForm = document.querySelector(
  '.select-tasks-manager-approval'
);
let assignTaskButton = document.querySelector('.assign-task');
let logOutBtn = document.querySelector('.logoutbtn');

completedTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('hi');
  let inputElements = document.getElementsByClassName(
    'messageCheckboxComplete'
  );
  let checkedValue = null;
  for (var i = 0; inputElements[i]; ++i) {
    if (inputElements[i].checked) {
      checkedValue = inputElements[i].value;
      break;
    }
  }
  console.log(checkedValue);
  fetch('/managerapprovedtask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      completedTask: checkedValue
    })
  });
});

logOutBtn.addEventListener('click', e => {
  console.log('logout button clicked');
  fetch('/employeelogout', {
    method: 'GET'
  });
});
