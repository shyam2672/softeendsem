const router = require("express").Router();
const userctrl = require("../controllers/userController.js");

router.post("/register", userctrl.register);
router.post("/login", userctrl.login);
router.post("/setavatar/:id", userctrl.setAvatar);
router.post("/friends", userctrl.getfriends);
router.post("/sendrequest", userctrl.sendrequest);
router.get("/getrequests/:id", userctrl.getrequests);
router.post("/addfriend", userctrl.addfriend);
router.get("/getuserinfo/:id", userctrl.getuserinfo);

module.exports = router;
