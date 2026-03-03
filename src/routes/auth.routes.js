const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
router.post("/login", login);


// POST /api/auth/signup
router.post("/signup", signup);
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // token
    const token = generateToken(user.id);

    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = router;