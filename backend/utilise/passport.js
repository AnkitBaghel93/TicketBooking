const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
require('dotenv').config();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('[Passport] Facebook profile:', profile);

    const email = profile.emails?.[0]?.value;
    console.log('[Passport] Extracted email:', email);

    let user = await User.findOne({ email });

    if (!user) {
      console.log('[Passport] No user found, creating new user');

      user = await User.create({
        username: `${profile.name.givenName} ${profile.name.familyName}`,
        email,
        password: 'facebook_oauth', // ideally hash if you allow login via password
        role: 'user',
      });
    } else {
      console.log('[Passport] Existing user found:', user.email);
    }

    return done(null, user);
  } catch (err) {
    console.error('[Passport] Error:', err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  console.log('[Passport] serializeUser:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('[Passport] deserializeUser:', id);
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
