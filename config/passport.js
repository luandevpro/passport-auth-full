const LocalStrategy = require('passport-local').Strategy;
      mongoose      = require("mongoose");
      bcrypt        = require("bcrypt");

      User          = require("../app/models/User");

module.exports = function(passport){
   passport.use(new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password'
      }, (email,password,done) => {
         User.findOne({email: email})
            .then(user => {
               if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
               }
               bcrypt.compare(password, user.password, (err,result) => {
                  if(err) throw err;
                  if(result){
                     return done(null, user);
                  }else{
                     return done(null, false, { message: 'Password sai !' });
                  }
               })
            })
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
