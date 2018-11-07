const User = require("../models/User");
      passportLocal = require("passport");
      passportGoogle = require("passport");
      passportFacebook = require("passport");
      bcrypt      = require("bcrypt");

require("../../config/passport")(passportLocal);
require("../../config/passport-google-oauth")(passportGoogle);
require("../../config/passport-facebook-oauth")(passportFacebook);

module.exports = {
   showSignup,
   processSignup,
   showLogin,
   processLogin,
   showLogout,
   showLoginGoogle,
   showLoginGoogleCallback,
   showLoginFacebook,
   showLoginFacebookCallback
}

function showSignup(req,res){
   res.render("users/signup", {
      error: req.flash("success"),
   });
}

function processSignup(req,res){
   const errors = [];
   if(!req.body.name){
      errors.push({text: "Name is required"});
   }
   if(!req.body.email){
      errors.push({text: "Email is required"});
   }
   if(!req.body.password){
      errors.push({text: "Password is required"});
   }
   if(!req.body.confirmpassword){
      errors.push({text: "Confirmpasasword is required"});
   }
   if(req.body.password !== req.body.confirmpassword && req.body.password){
      errors.push({text: "Password not match"})
   }
   if(errors.length > 0){
      req.flash("success", errors );
      res.redirect("/users/signup");
   }else{
      const newUser = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
      });
      User.findOne({email: req.body.email})
         .then(user => {
            if(user){
               req.flash("success", "tai khoan vvs email da ton tai");
               res.redirect("/users/login");
            }else{
               // middleware hash password
               bcrypt.genSalt(10, function(err, salt) {
                  bcrypt.hash(newUser.password, salt, function(err, hash) {
                     if(err) throw err;
                     newUser.password = hash;
                     newUser.save()
                     .then(() => {
                        req.flash("success", "Ban da tao ta khoaan thanh cong vui long login");
                        res.redirect("/users/login")
                     })
                  });
                });
              
            }
         })
   }
}

function showLogin(req,res){
   res.render("users/login", {
      success: req.flash("success"),
      error: req.flash("error"),
   })
}

function processLogin(req,res,next){
   passportLocal.authenticate('local', { 
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true 
   })(req,res,next);
}

function showLogout(req,res){
   req.flash("Ban da logout thanh cong !!");
   req.session.destroy();
   res.redirect("/users/login");
}

function showLoginGoogle(req,res,next){
   passportGoogle.authenticate('google', { 
      scope: ['profile' , 'email'] ,
   })(req,res,next);
}

function showLoginGoogleCallback(req,res,next){
   passportGoogle.authenticate('google', { 
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true 
   })(req,res,next)
}

function showLoginFacebook(req,res,next){
   passportFacebook.authenticate('facebook' , 
      { scope: ['user_friends', 'manage_pages'] }
   )(req,res,next);
}

function showLoginFacebookCallback(req,res,next){
   passportFacebook.authenticate('facebook', { 
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true 
   })(req,res,next)
}