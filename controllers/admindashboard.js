const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/admin', (req, res) => {
  let departmentsData = [];
  db.departments
    .findAll()
    .then(results => {
      results.forEach(department => {
        departmentsData.push({
          id: department.id,
          department_title: department.department_title
        });
      });
    })
    .then(() => {
      res.render('admindashboard', {
        departments: departmentsData
      });
    });
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

  db.departments
    .findAll({ where: { department_title: department_title } })
    .then(results => {
      if (results.length == 0) {
        db.departments
          .create({
            department_title,
            department_managers
          })
          .then(newDepartment => {
            res.redirect('/admin');
          })
          .catch(error => {
            res.redirect('/admin');
            console.log('Error: ', error);
          });
      } else {
        res.redirect('/admin');
        console.log('There was an error.');
      }
    });
});

router.post('/admin/managers', (req, res) => {
  let employee_email_address = req.body.emp_email;

  db.employees
    .findAll({ where: { employee_email_address: employee_email_address } })
    .then(results => {
      console.log(results);
      let department_id = results[0].department_id;
      console.log(department_id);
      if (results.is_manager == null || false) {
        db.employees.findByPk(results[0].id).then(user => {
          user.is_manager = true;
          user
            .save()
            .then(() => {
              db.departments.findByPk(department_id).then(department => {
                department.department_managers =
                  results[0].employee_email_address;
                department.save();
              });
            })
            .then(() => {
              console.log('updated value');
              res.redirect('/admin');
            });
        });
      }
    });
});
module.exports = router;
