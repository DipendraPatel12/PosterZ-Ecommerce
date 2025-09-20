require("dotenv").config({ quiet: true });
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/user.Model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        
        if (!email) {
          return done(new Error('No email found in Google profile'), null);
        }

        let user = await User.findOne({ email });
        
        if (user) {
          // Update Google ID if not set
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user
        user = new User({
          googleId: profile.id,
          fullName: profile.displayName,
          email: email,
          role: "user",
          isVerified: true, // Google users are automatically verified
        });

        await user.save();
        return done(null, user);
      } catch (err) {
        console.error('Passport Google Strategy error:', err);
        return done(err, null);
      }
    }
  )
);