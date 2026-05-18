const Task = require("../models/Task");
const Project = require("../models/Project");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const { title, status, projectId } = req.body;

    // Verify project belongs to same organization
    const project = await Project.findOne({
      _id: projectId,
      organizationId: req.user.organizationId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      status,
      projectId,
      organizationId: req.user.organizationId,
    });

    res.status(201).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET TASKS
exports.getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      organizationId: req.user.organizationId,
    }).populate("projectId", "name");

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};