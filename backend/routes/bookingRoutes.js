const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    userId: req.user._id,
    role: req.user.role,
    data: req.body,
  });
});

module.exports = router;