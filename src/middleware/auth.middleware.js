const jwt = require("jsonwebtoken");
jwt.verify(token, process.env.JWT_SECRET);
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "supersecretkey");

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};