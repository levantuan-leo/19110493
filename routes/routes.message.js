const express = require("express");
const { getRequest } = require("../controllers/controllers.message");
const router = express.Router();

router.get("/", getRequest);
router.get("/:id", getRequest);

module.exports = router;
