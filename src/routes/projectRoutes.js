const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectDetails,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const { handleValidationErrors } = require("../middleware/validationMiddleware");
const {
  createProjectValidation,
  projectIdValidation,
} = require("../validators/projectValidator");

router.post(
  "/",
  protect,
  createProjectValidation,
  handleValidationErrors,
  createProject
);

router.get("/", protect, getProjects);

router.get(
  "/:id",
  protect,
  projectIdValidation,
  handleValidationErrors,
  getProjectDetails
);

module.exports = router;
