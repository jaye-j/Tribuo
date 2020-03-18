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

  console.log(employee_email_address);
  res.redirect('/admin');
});
module.exports = router;
