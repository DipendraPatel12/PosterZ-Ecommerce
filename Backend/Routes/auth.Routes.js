const express = require("express");
const {
  signUp,
  login,
  sentOtp,
  verifyOtp,
  verifyOtpForResetPass,
  forgetPassword,
  resetPassword,
  logout,
  updateProfile,
} = require("../Controllers/auth.Controllers");
const authenticateToken = require("../Middlewares/authenticateToken");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
const jwt = require("jsonwebtoken");
const User = require("../Models/user.Model");

// Updated /me route with proper cookie authentication
router.get("/me", async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    
    if (!accessToken) {
      return res.status(401).json({ 
        success: false,
        message: "Not authenticated - no token found" 
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id).select("-password");
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.json({ 
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isAdmin: user.role === 'admin',
        isVerified: user.isVerified,
        googleId: user.googleId
      }
    });
  } catch (error) {
    console.error("Auth check error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: "Token expired" 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Server error during authentication" 
    });
  }
});

router.post("/send-otp", sentOtp);
router.post("/verify-otp", verifyOtp);

router.post("/forgetpassword", forgetPassword);
router.post("/verifyotp", verifyOtpForResetPass);
router.post("/resetPassword", authenticateToken, resetPassword);
router.patch("/update-profile", authenticateToken, updateProfile);

module.exports = router;
