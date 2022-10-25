const express = require("express");
const { addRequest } = require("../controllers/comment.controller");
const router = express.Router();

router.post("/", addRequest);

module.exports = router;
