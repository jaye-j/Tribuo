const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(
  session({
    secret: 'Tribuo',
    cookie: { secure: false, maxAge: 5 * 24 * 60 * 60 * 1000 }
  })
);

router.get('/employee', (req, res) => {
  let department_id = req.session.department_id;
  let employee_first_name = req.session.employee_first_name;
  let employee_last_name = req.session.employee_last_name;
  let id = req.session.employee_id;
  let department_title = '';
  let taskInfo = [];

  db.tasks
    .findAll({
      where: { department_id: department_id }
    })
    .then(results => {
      let testing = results.forEach(element => {
        if (element.employee_id == null || false) {
          taskInfo.push(element);
        }
      });
      console.log(taskInfo);
      db.departments
        .findAll({ where: { id: department_id } })
        .then(departmentsresult => {
          department_title = departmentsresult[0].department_title;
        })
        .then(() => {
          db.tasks
            .findAll({ where: { employee_id: id } })
            .then(specificresults => {
              return specificresults;
            })
            .then(specificresults => {
              console.log(specificresults);
              res.render('employee', {
                taskInfo: taskInfo,
                specificTaskInfo: specificresults,
                employee_first_name: employee_first_name,
                employee_last_name: employee_last_name,
                department_title: department_title
              });
            });
        });
    });
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/employee', (req, res) => {
  let task_title = req.body.taskTitle;
  let task_instruction = req.body.taskInstruction;
  let department_id = req.session.department_id;

  db.tasks
    .create({
      task_title,
      task_instruction,
      department_id
    })
    .then(result => {
      let newTaskID = result.dataValues.id;
      console.log(newTaskID);
      res.send(`${newTaskID}`);
    });
});

router.post('/employeeselectedtask', (req, res) => {
  let selectedTask = req.body.selectedTask;
  let id = req.session.employee_id;

  db.tasks.findByPk(selectedTask).then(taskselected => {
    taskselected.employee_id = id;
    taskselected.save().then(result => {
      res.send(result);
    });
  });
});

router.post('/employeecompletedtask', (req, res) => {
  let completedTask = req.body.completedTask;
  let id = req.session.employee_id;

  db.tasks.findByPk(completedTask).then(taskselected => {
    taskselected.task_status = 'Completed';
    taskselected.save();
  });
});

module.exports = router;
