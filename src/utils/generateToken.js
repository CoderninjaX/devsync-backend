const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, "supersecretkey", {
    expiresIn: "7d",
  });
};

module.exports = generateToken;