const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/manager', (req, res) => {
  let department_id = req.session.department_id;
  let employee_first_name = req.session.employee_first_name;
  let employee_last_name = req.session.employee_last_name;
  db.tasks
    .findAll({
      where: { department_id: department_id }
    })
    .then(results => {
      // console.log(results[0].task_title);
      let taskInfo = results;
      db.departments
        .findAll({ where: { id: department_id } })
        .then(departmentsresult => {
          // console.log(departmentsresult);
          let department_title = departmentsresult[0].department_title;
          res.render('manager', {
            taskInfo: taskInfo,
            employee_first_name: employee_first_name,
            employee_last_name: employee_last_name,
            department_title: department_title
          });
        });
    });
});

module.exports = router;
