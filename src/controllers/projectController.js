const Project = require("../models/Project");


// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {

    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      organizationId: req.user.organizationId,
    });

    res.status(201).json({
      success: true,
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      organizationId: req.user.organizationId,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};