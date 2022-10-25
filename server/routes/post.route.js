const express = require("express");
const {
  getRequest,
  addRequest,
  deleteRequest,
  getEditRequest,
  editRequest,
} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getRequest);
router.get("/:id", getRequest);
router.post("/", addRequest);
router.post("/delete", deleteRequest);
router.get("/edit/:id", getEditRequest);
router.post("/edit", editRequest);

module.exports = router;
