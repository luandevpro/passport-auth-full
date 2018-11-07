const FacebookStrategy = require('passport-facebook').Strategy;
      mongoose      = require("mongoose");
      bcrypt        = require("bcrypt");

      User          = require("../app/models/User");

module.exports = function(passport){
   passport.use(new FacebookStrategy({
      clientID: "319615711954871",
      clientSecret: "e39825bbd6dea3535ce3dc44388abe82",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email'],
      proxy: true,
    }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
    }
  ));
  passport.serializeUser(function(user, done) {
   done(null, user.id);
 });
 
passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
 });
}