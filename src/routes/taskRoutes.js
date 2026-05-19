const express = require("express");

const router = express.Router();

const { createTask, getTasks } = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { handleValidationErrors } = require("../middleware/validationMiddleware");
const { createTaskValidation } = require("../validators/taskValidator");

router.post(
  "/",
  protect,
  createTaskValidation,
  handleValidationErrors,
  createTask
);

router.get("/", protect, getTasks);

module.exports = router;
