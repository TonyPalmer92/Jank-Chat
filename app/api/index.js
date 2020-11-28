const express = require("express");
const router = express.Router();

/*
  Route: /api
*/

router.use("/message", require("./routes/messages"));

module.exports = router;
