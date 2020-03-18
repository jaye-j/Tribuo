const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
let db = require('../models');
const session = require('express-session');
const cookieParser = require('cookie-parser');

let auth = (req, res, next) => {
  if (req.session.userid) {
    res.redirect('/employee');
  } else {
    next();
  }
};

router.get('/', (req, res) => {
  res.render('login');
});
router.use(cookieParser());
router.use(
  session({
    secret: 'Tribuo',
    cookie: { secure: false, maxAge: 5 * 24 * 60 * 60 * 1000 }
  })
);

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
  let employee_email_address = req.body.email;
  let employee_password = req.body.password;

  db.employees
    .findAll({ where: { employee_email_address: employee_email_address } })
    .then(results => {
      console.log(results);
      // bcrypt.compare(
      //   employee_password,
      //   results[0].password,
      //   (err, response) => {
      //     if (response) {
      //       req.session.userid = id;
      //       res.redirect('/employee');
      //     } else {
      //       console.log(err);
      //       res.render('login', {
      //         error: err
      //       });
      //     }
      //   }
      // );
    })
    .catch(err => {
      console.log(err);
      res.render('login', {
        error: 'Record not found.'
      });
    });
});

module.exports = router;
