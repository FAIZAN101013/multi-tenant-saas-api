const { body } = require("express-validator");

exports.createTaskValidation = [
  body("title").trim().notEmpty().withMessage("Task title is required"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid task status"),
  body("projectId").isMongoId().withMessage("Invalid project id"),
];
