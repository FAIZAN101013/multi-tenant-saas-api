const { body, param } = require("express-validator");

exports.createProjectValidation = [
  body("name").trim().notEmpty().withMessage("Project name is required"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be 500 characters or less"),
];

exports.projectIdValidation = [
  param("id").isMongoId().withMessage("Invalid project id"),
];
