const express = require("express");
const router = express.Router();
console.log("workspace.routes.js loaded");
const auth = require("../middleware/auth.middleware");

const {
  createWorkspace,
  joinWorkspace,
  getMyWorkspaces
} = require("../controllers/workspace.controller");

router.post("/", auth, createWorkspace);
router.post("/join", auth, joinWorkspace);
router.get("/", auth, getMyWorkspaces);

module.exports = router;