const router = require("express").Router();
const userctrl = require("../controllers/userController.js");

router.post("/register", userctrl.register);
router.post("/login", userctrl.login);
router.post("/setavatar", userctrl.setAvatar);
router.post("/friends", userctrl.getfriends);
router.post("/sendrequest", userctrl.sendrequest);
router.post("/getrequests", userctrl.getrequests);
router.post("/addfriend", userctrl.addfriend);
router.post("/getuserinfo", userctrl.getuserinfo);
router.post("/setrandomusername",userctrl.setrandomusername);
router.post("/rateuser",userctrl.rateuser);
router.post("/getrating",userctrl.getrating);
router.get("/verify/:id", userctrl.verify);

module.exports = router;
