const router         = require("express").Router();
   mainControllers   = require("./controllers/main.controllers");

// export router
module.exports = router;

// config router
router.get("/" , mainControllers.showHome );