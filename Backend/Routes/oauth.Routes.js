const express = require("express");
const router = express.Router();
const passport = require("passport");
const RefreshToken = require("../Models/refreshToken.Model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utilities/jwt");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  async (req, res) => {
    try {
      const user = {
        _id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      };
      
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await RefreshToken.create({
        token: refreshToken,
        userId: req.user._id,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });

      // Set cookies with proper settings
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      // FIXED: Redirect to LOGIN page with success parameter
      res.redirect(`${process.env.CLIENT_URL}/login?success=true`);

    } catch (error) {
      console.error('Auth callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
  }
);

router.get('/failure', (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
});

module.exports = router;