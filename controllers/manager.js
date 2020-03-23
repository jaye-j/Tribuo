const express = require('express');
const router = express.Router();
const db = require('../models');
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(
  session({
    secret: 'Tribuo',
    cookie: { secure: false, maxAge: 5 * 24 * 60 * 60 * 1000 }
  })
);

router.get('/manager', (req, res) => {
  let department_id = req.session.department_id;
  let employee_first_name = req.session.employee_first_name;
  let employee_last_name = req.session.employee_last_name;
  let employee_id = req.session.employee_id;
  let department_title = '';
  let emp_id = req.session.employee_id;
  let taskInfo = [];
  let inProgress = [];
  let completed = [];

  db.tasks
    .findAll({
      where: { department_id: department_id }
    })
    .then(results => {
      let testing = results.forEach(element => {
        if (element.employee_id == null || false) {
          taskInfo.push(element);
        } else if (element.task_status == 'In progress') {
          inProgress.push(element);
        } else if (element.task_status == 'Completed') {
          completed.push(element);
        }
      });
    })
    .then(() => {
      db.departments
        .findAll({ where: { id: department_id } })
        .then(departmentsresult => {
          department_title = departmentsresult[0].department_title;
          return department_title;
        })
        .then(department_title => {
          res.render('manager', {
            taskInfo: taskInfo,
            inProgress: inProgress,
            completed: completed,
            employee_first_name: employee_first_name,
            employee_last_name: employee_last_name,
            department_title: department_title,
            employee_id: employee_id
          });
        });
    });
});

module.exports = router;
