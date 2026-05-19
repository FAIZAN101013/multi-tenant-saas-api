const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      !decoded.userId ||
      !decoded.organizationId ||
      !mongoose.isValidObjectId(decoded.userId) ||
      !mongoose.isValidObjectId(decoded.organizationId)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = {
      userId: decoded.userId,
      organizationId: decoded.organizationId,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
