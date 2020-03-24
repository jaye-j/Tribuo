const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
let db = require("../models");
const session = require("express-session");
const cookieParser = require("cookie-parser");

let auth = (req, res, next) => {
  if (req.session.employee_email_address)
    if (req.session.is_manager == true) {
      res.redirect("/manager");
    } else {
      res.redirect("/employee");
    }
  else {
    next();
  }
};

router.get("/login", auth, (req, res) => {
  res.render("login");
});
router.use(cookieParser());
router.use(
  session({
    secret: "Tribuo",
    cookie: { secure: false, maxAge: 5 * 24 * 60 * 60 * 1000 }
  })
);

router.post("/login", (req, res) => {
  let employee_email_address = req.body.email;
  let employee_password = req.body.password;

  db.employees
    .findAll({ where: { employee_email_address: employee_email_address } })
    .then(results => {
      console.log(results);
      bcrypt.compare(
        employee_password,
        results[0].employee_password,
        (err, response) => {
          if (response) {
            req.session.employee_id = results[0].id;
            req.session.employee_first_name = results[0].employee_first_name;
            req.session.employee_last_name = results[0].employee_last_name;
            req.session.employee_email_address =
              results[0].employee_email_address;
            req.session.is_manager = results[0].is_manager;
            req.session.department_id = results[0].department_id;
            if (results[0].is_manager == true) {
              console.log("manager session");
              res.redirect("/manager");
            } else {
              res.redirect("/employee");
            }
          } else {
            console.log(err);
            res.render("login", {
              error: err
            });
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
      res.render("login", {
        error: "Record not found."
      });
    });
});

module.exports = router;
