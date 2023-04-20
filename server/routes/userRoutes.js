const router = require("express").Router();
const userctrl = require("../controllers/userController.js");

router.post("/register", userctrl.register);
router.post("/login", userctrl.login);
router.post("/setavatar/:id", userctrl.setAvatar);
router.get("/friends/:id", userctrl.getfriends);
router.post("/sendrequest/sender/:senderid/receiver/:receiverid", userctrl.sendrequest);
router.post("/getrequests/:id", userctrl.getrequests);

router.post("/addfriend/sender/:senderid/receiver/:receiverid", userctrl.addfriend);
router.get("/getuserinfo/:id", userctrl.getuserinfo);





module.exports = router;
