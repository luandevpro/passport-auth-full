const GoogleStrategy = require('passport-google-oauth20').Strategy;
      mongoose      = require("mongoose");
      bcrypt        = require("bcrypt");

      User          = require("../app/models/User");

module.exports = function(passport){
   passport.use(new GoogleStrategy({
      clientID: "548210758981-gmc489ulfdmkaj3ogdhi27kpvmtpjob9.apps.googleusercontent.com",
      clientSecret: "0Rf5_FOWWFrKoriRrtuxU651",
      callbackURL: "/auth/google/callback",
      proxy: true,
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({email : profile.emails[0].value})
         .then((user) => {
            if(user){
               return done(null,user);
            }
            var newUser = new User();
            newUser.googleId = profile.id;
            newUser.token = accessToken;
            newUser.name  = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.password = "";
            newUser.photoURL = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf("?"));
            
            newUser.save()
               .then((newUser) => {
                  return done(null,newUser);
               }) 
         })
      console.log(profile);
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