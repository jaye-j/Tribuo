const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

router.get("/registration", (req, res) => {
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
      res.render("registration", {
        departments: departmentsData
      });
    });
});

router.post("/registration", (req, res) => {
  let employee_first_name = req.body.firstname;
  let employee_last_name = req.body.lastname;
  let employee_email_address = req.body.email;
  let department_id = req.body.departmentID;
  let employee_password = req.body.password;

  db.employees
    .findAll({ where: { employee_email_address: employee_email_address } })
    .then(results => {
      if (results.length == 0) {
        let passwordEncrypted = bcrypt.hashSync(employee_password, 8);
        db.employees
          .create({
            employee_first_name,
            employee_last_name,
            employee_email_address,
            department_id,
            employee_password: passwordEncrypted
          })
          .then(newEmployee => {
            res.redirect("/login");
          })
          .catch(error => {
            res.render("registration", {
              error
            });
          });
      } else {
        res.render("registration", {
          err: "There was a problem making your account."
        });
      }
    });
});
module.exports = router;
