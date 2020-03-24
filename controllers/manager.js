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
let auth = (req, res, next) => {
  if (req.session.employee_email_address) {
    if (req.session.is_manager == null || false) {
      res.redirect('/employee');
    } else {
      next();
    }
  } else {
    res.redirect('/login');
  }
};

router.get('/manager', auth, (req, res) => {
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
      console.log(results);
      let testing = results.forEach(element => {
        if (element.employee_id == null || false) {
          taskInfo.push(element);
        } else if (element.task_status == 'In progress') {
          inProgress.push(element);
        } else if (
          (element.task_status == 'Completed' &&
            element.task_approval == null) ||
          false
        ) {
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
router.post('/managerapprovedtask', (req, res) => {
  let completedTask = req.body.completedTask;

  db.tasks.findByPk(completedTask).then(taskselected => {
    console.log(taskselected);
    taskselected.task_approval = 'true';
    taskselected.save();
  });
});

module.exports = router;
