const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  return res.json({ msg: "SUcces" });
});

module.exports = route;
