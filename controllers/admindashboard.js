const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/admin', (req, res) => {
  res.render('admindashboard');
});

router.get('/admin/department', (req, res) => {
  res.redirect('/admin');
});

router.get('/admin/managers', (req, res) => {
  res.redirect('/admin');
});

router.post('/admin/department', (req, res) => {
  let department_title = req.body.department;
  let department_managers = req.body.department_managers;
  console.log(department_title);
  console.log(department_managers);
  res.redirect('/admin');
});

router.post('/admin/managers', (req, res) => {
  let employee_email_address = req.body.emp_email;

  db.employees
    .findAll({ where: { employee_email_address: employee_email_address } })
    .then(results => {
      if (results.is_manager == null || false) {
        db.employees.findByPk(results[0].id).then(user => {
          console.log(user);
          user.is_manager = true;
          user.save().then(() => {
            console.log('updated value').then(() => {
              res.redirect('/admin');
            });
          });
        });
      }
    });
});
module.exports = router;
