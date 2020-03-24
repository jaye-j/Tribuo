const express = require('express');
const router = express.Router();
const db = require('../models');
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
<<<<<<< HEAD
  if (req.session.is_admin) {
    if (req.session.is_admin == true) {
      next();
    } else {
      res.redirect('/adminlogin');
    }
  } else {
    res.redirect('/');
=======
  if (req.session.employee_email_address) {
    if (req.session.is_admin == true) {
      next();
    } else {
      res.redirect('/employee');
    }
  } else {
    next();
>>>>>>> af4b077b07d7fc4622f860017d79f1b79f50317a
  }
};

router.get('/admin', auth, (req, res) => {
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
// router.get("/admin/:name/:department", (req, res) => {
//   let employee_first_name = req.params.name;
//   let department_title = req.params.department;

//   res.render("admin", {
//     employee_first_name,
//     department_title,
//     new_employee: true
//   });
// });

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
          user.save().then(() => {
            db.departments.findByPk(department_id).then(department => {
              department.department_managers =
                results[0].employee_email_address;
              department.save().then(() => {
                console.log('updated value');
                res.redirect(
                  `/admin?name=${results[0].employee_first_name}&department=${department.department_title}`
                );
              });
            });
          });
        });
      }
    });
});
module.exports = router;
