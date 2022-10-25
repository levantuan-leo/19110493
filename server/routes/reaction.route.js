const express = require("express");
const { addRequest } = require("../controllers/reaction.controller");
const router = express.Router();

router.post("/", addRequest);

module.exports = router;
