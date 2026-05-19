const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { title, status, projectId } = req.body;

    const project = await Project.findOne({
      _id: projectId,
      organizationId: req.user.organizationId,
    }).select("_id");

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

    return res.status(201).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      organizationId: req.user.organizationId,
    })
      .populate("projectId", "name")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};
