const router         = require("express").Router();
   mainControllers   = require("./controllers/main.controllers");
   userControllers   = require("./controllers/user.controllers");

// export router
module.exports = router;

// config router
router.get("/" , mainControllers.showHome );
// set router signup
router.get("/users/signup" , userControllers.showSignup );
router.post("/users/signup" , userControllers.processSignup );
//set router login
router.get("/users/login" , userControllers.showLogin );
router.post("/users/login" , userControllers.processLogin );
// login google
router.get("/auth/google" , userControllers.showLoginGoogle );
router.get("/auth/google/callback" , userControllers.showLoginGoogleCallback );
// login facebook
router.get("/auth/facebook" , userControllers.showLoginFacebook );
router.get("/auth/facebook/callback" , userControllers.showLoginFacebookCallback );

// set logout
router.get("/users/logout" , userControllers.showLogout );
