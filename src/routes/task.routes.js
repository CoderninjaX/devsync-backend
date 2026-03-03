const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { createTask , getTasks} = require("../controllers/task.controller");
const { updateTaskStatus } = require("../controllers/task.controller");

router.patch("/:taskId/status", auth, updateTaskStatus);
router.post("/:workspaceId", auth, createTask);
router.get("/:workspaceId", auth, getTasks);
module.exports = router;