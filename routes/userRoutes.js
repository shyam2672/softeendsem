const router = require("express").Router();
const userctrl = require("../controllers/userController.js");
const protect = require("../middlewares/authmiddleware");

router.post("/register", userctrl.register);
router.post("/login", userctrl.login);
router.post("/logout", protect.protectstu, userctrl.logout);
// router.post("/setavatar", protect.protectstu, userctrl.setAvatar);
router.post("/friends", protect.protectstu, userctrl.getfriends);
// router.post("/sendrequest", protect.protectstu, userctrl.sendrequest);
// router.post("/getrequests", protect.protectstu, userctrl.getrequests);
router.post("/addfriend", protect.protectstu, userctrl.addfriend);
router.post("/getuserinfo", protect.protectstu, userctrl.getuserinfo);
router.post(
  "/setrandomusername",
  protect.protectstu,
  userctrl.setrandomusername
);
router.post("/rateuser", protect.protectstu, userctrl.rateuser);
router.post("/getrating", protect.protectstu, userctrl.getrating);
router.get("/verify/:id", protect.protectstu, userctrl.verify);

module.exports = router;
