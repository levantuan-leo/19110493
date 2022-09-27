const express = require("express");
const {
  addRequest,
  getRequest,
} = require("../controllers/controllers.19110493");
const router = express.Router();

router.post("/", addRequest);
router.get("/:id", getRequest);

module.exports = router;
