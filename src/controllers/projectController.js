const Project = require("../models/Project");
const Task = require("../models/Task");

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




// GET PROJECT DETAILS WITH TASKS
exports.getProjectDetails = async (req, res) => {
  try {

    const { id } = req.params;

    // Find project with tenant isolation
    const project = await Project.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Fetch related tasks
    const tasks = await Task.find({
      projectId: project._id,
      organizationId: req.user.organizationId,
    }); 

    res.status(200).json({
      success: true,
      project,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};