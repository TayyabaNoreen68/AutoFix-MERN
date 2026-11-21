const express = require("express");
const { signup, login } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/register", signup);
router.post("/login", login);

// Admin-only route: returns 403 Forbidden if role is customer
router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
    user: req.user,
  });
});

module.exports = router;