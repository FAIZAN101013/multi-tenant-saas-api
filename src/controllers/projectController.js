const Project = require("../models/Project");
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      organizationId: req.user.organizationId,
    });

    return res.status(201).json({
      success: true,
      data: { project },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      organizationId: req.user.organizationId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: { projects },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      _id: id,
      organizationId: req.user.organizationId,
    }).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const tasks = await Task.find({
      projectId: project._id,
      organizationId: req.user.organizationId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: { project, tasks },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};
