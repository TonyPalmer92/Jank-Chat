const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

/*
  Route: /api/message

*/

router.post("/", messageController.postMessage);

module.exports = router;
