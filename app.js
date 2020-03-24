const express = require('express');
const app = express();
const PORT = 2020;
const bodyParser = require('body-parser');
let db = require('./models');
let sessions = require('express-session');
let cookieParser = require('cookie-parser');
let io = require('socket.io')();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  sessions({
    secret: 'Tribuo',
    cookie: { secure: false, maxAge: 5 * 24 * 60 * 60 * 1000 }
  })
);

// db.departments.destroy({ where: { id: 2 } });
// for (let index = 95; index < 132; index++) {
//   db.tasks.destroy({ where: { id: `${index}` } });
// }

app.use(require('./controllers/login'));
app.use(require('./controllers/employee'));
app.use(require('./controllers/manager'));
app.use(require('./controllers/registration'));
app.use(require('./controllers/error'));
app.use(require('./controllers/login'));
app.use(require('./controllers/admindashboard'));
app.use(require('./controllers/adminlogin'));
app.use(require('./controllers/aboutus'));
app.use(require('./controllers/homepage'));
app.use(require('./controllers/FAQ'));

let server = app.listen(PORT, () => {
  console.log('Server is listening on port 2020.');
});

io.attach(server);
io.on('connection', socket => {
  console.log('a user has connected');
  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });
  socket.on('new task', taskData => {
    console.log('recieved new task on server');
    io.emit('new task', taskData);
  });
  socket.on('claimed task', checkedValue => {
    console.log('received claimed task value on server');
    io.emit('claimed task', checkedValue);
  });
});
