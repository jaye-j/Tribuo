const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

router.get('/registration', (req, res) => {
  res.render('registration');
});
router.post('/registration', (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let password2 = req.body.password2;
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  console.log(password);
  console.log(password2);

  db.employees
    .findAll({ where: { employee_email_address: email } })
    .then(results => {
      if (results.length == 0 && password == password2) {
        let passwordEncrypted = bcrypt.hashSync(password, 10);
        db.employees
          .create({
            employee_first_name: firstname,
            employee_last_name: lastname,
            employee_email_address: email,
            employee_password: passwordEncrypted
          })
          .then(user => {
            res.send('post registration');

            // res.redirect('/login');
          })
          .catch(error => {
            res.send('error duplicate entry');
            // res.redirect('/registration?error=visible');
          });
      } else {
        //duplicates redicred
        res.send('There was a problem creating your account');
      }
    });
});

module.exports = router;
