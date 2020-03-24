const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
let db = require('../models');
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
  if (req.session.is_admin) {
    if (req.session.is_admin == true) {
      res.redirect('/admin');
    } else {
      res.redirect('/adminlogin');
    }
  } else {
    next();
  }
};

router.get('/adminlogin', auth, (req, res) => {
  res.render('adminlogin');
});

router.post('/adminlogin', (req, res) => {
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
            req.session.is_admin = results[0].is_admin;

            if (results[0].is_admin == true) {
              console.log('admin session');
              res.redirect('/admin');
            } else {
              res.redirect('/adminlogin');
            }
          } else {
            console.log(err);
            res.render('login', {
              error: err
            });
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
      res.render('login', {
        error: 'Record not found.'
      });
    });
});

module.exports = router;
