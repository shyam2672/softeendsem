const router = require("express").Router();
const userctrl = require("../controllers/userController.js");

router.post("/register", userctrl.register);
router.post("/login", userctrl.login);
router.post("/setavatar/:id", userctrl.setAvatar);


module.exports = router;
