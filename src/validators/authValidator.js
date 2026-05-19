const { body } = require("express-validator");

exports.registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("organizationName")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required"),
];

exports.loginValidation = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
