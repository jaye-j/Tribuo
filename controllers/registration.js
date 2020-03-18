const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

router.get('/registration', (req, res) => {
  res.render('registration');
});
router.post('/registration', (req, res) => {
  let employee_first_name = req.body.firstname;
  let employee_last_name = req.body.lastname;
  let employee_email_address = req.body.email;
  let departmentID = req.body.departmentID;
  let password = req.body.password;

  let passwordEncrypted = bcrypt.hashSync(password, 8);
  console.log(password);
  console.log(passwordEncrypted);
  db.employees
    .create({
      employee_first_name,
      employee_last_name,
      employee_email_address,
      departmentID,
      employee_password: passwordEncrypted
    })
    .then(newEmployee => {
      // console.log(newEmployee);
      res.redirect('/');
    })
    .catch(error => {
      // console.log(error);
      res.render('registration', {
        error
      });
    });
});

// db.employees
//   .findAll({ where: { employee_email_address: email } })
//   .then(results => {
//     if (results.length == 0 && password == password2) {
//       let passwordEncrypted = bcrypt.hashSync(password, 10);
//       db.employees
//         .create({
//           employee_first_name: firstname,
//           employee_last_name: lastname,
//           employee_email_address: email,
//           employee_password: passwordEncrypted
//         })
//         .then(user => {
//           res.send('post registration');

//           // res.redirect('/login');
//         })
//         .catch(error => {
//           res.send('error duplicate entry');
//           // res.redirect('/registration?error=visible');
//         });
//     } else {
//       //duplicates redicred
//       res.send('There was a problem creating your account');
//     }
//   });

//   db.employees
//     .findAll({ where: { employee_email_address: email } })
//     .then(results => {
//       results
//         .forEach(function(index) {
//           console.log(index);
//           if (index.employee_email_address == email) {
//             res.send("You've already created an email with this account.");
//           }
//         })
//         .then(() => {
//           res.send('Moving on');
//         });
//     });
// });

module.exports = router;
