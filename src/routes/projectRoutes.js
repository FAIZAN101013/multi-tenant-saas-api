const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectDetails,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectDetails);


module.exports = router;