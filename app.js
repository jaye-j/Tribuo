const express = require("express");
const app = express();

const PORT = 2020;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(require("./controllers/login"));
app.use(require("./controllers/employee"));
app.use(require("./controllers/manager"));

app.listen(PORT, () => {
  console.log("Server is listening on port 2020.");
});
