const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Organization = require("../models/Organization");

const signToken = (user) =>
  jwt.sign(
    {
      userId: user._id,
      organizationId: user.organizationId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

exports.register = async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const organization = await Organization.create({
      name: organizationName,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      organizationId: organization._id,
    });

    const token = signToken(user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          organizationId: user.organizationId,
        },
      },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          organizationId: user.organizationId,
        },
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
