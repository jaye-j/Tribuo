const express = require("express");
const router = express.Router();

router.get("/employee", (req, res) => {
  res.render("employee");
});

module.exports = router;
