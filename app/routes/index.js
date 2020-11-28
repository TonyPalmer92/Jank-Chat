const express = require("express");
const routes = express.Router();

/*
  Route: / 
*/

routes.get("/", (req, res) => {
  res.render("home");
});

routes.get("/chat", (req, res) => {
  res.render("chat");
});

module.exports = routes;
