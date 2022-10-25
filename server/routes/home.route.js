const express = require("express");
const { homeRequest } = require("../controllers/home.controller");
const router = express.Router();

router.get("/", homeRequest);

module.exports = router;
