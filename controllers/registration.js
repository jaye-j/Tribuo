const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
let db = require("./models");

router.get("/registration", (req, res) => {
  res.render("registration");
});

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/registration", (req, res) => {
  let employee_first_name = req.body.first_name;
  let employee_last_name = req.body.last_name;
  let employee_email_address = req.body.email_address;
  let departmentID = req.body.departmentID;
  let employee_password = req.body.password;

  let passwordEncypted = bcrypt.hashSync(employee_password, 8);

  db.employees
    .create({
      employee_first_name,
      employee_last_name,
      employee_email_address,
      departmentID,
      employee_password: passwordEncypted
    })
    .then(newEmployee => {
      console.log(newEmployee);
      res.redirect("/login");
    })
    .catch(error => {
      console.log(error);
      res.render("registration", {
        error
      });
    });
});

module.exports = router;
