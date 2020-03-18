const express = require("express");
const app = express();
const PORT = 2020;
const bodyParser = require("body-parser");
let db = require("./models");
let sessions = require("express-session");
let cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(cookieParser());
app.use(
  sessions({
    secret: "Tribuo",
    cookie: { secure: false, maxAge: 5 * 24 * 60 * 60 * 1000 }
  })
);

app.use(require('./controllers/login'));
app.use(require('./controllers/employee'));
app.use(require('./controllers/manager'));
app.use(require('./controllers/registration'));
app.use(require('./controllers/error'));
app.use(require('./controllers/login'));
app.use(require('./controllers/admindashboard'));

app.listen(PORT, () => {
  console.log("Server is listening on port 2020.");
});
