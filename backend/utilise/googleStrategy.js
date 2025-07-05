const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://ticketbooking-backend-uq35.onrender.com/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email,
            password: 'google_oauth',
            role: 'user',
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
