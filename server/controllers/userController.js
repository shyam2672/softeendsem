const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const friendrequests = require("../models/friendrequests");
module.exports.login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // console.log(user);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    // console.log(user.password);
    isPasswordValid = await bcrypt.compare(password, user.password);
    //  isPasswordValid = await(password == user.password)
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getuserinfo = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id }).select({
      username,
      email,
      rating,
      avatarImage,
      gender,
    });
    // console.log(user);
    // delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    // console.log(ex);
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { username, email, password, gender } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      gender,
      password: hashedPassword,
    });
    // console.log(user);

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    // console.log(ex);
    next(ex);
  }
};

module.exports.sendrequest = async (req, res, next) => {
  try {
    // const user = await User.find({ _id:  req.params.id  });
    // console.log(req.body);
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    // console.log(sender);
    // console.log(receiver);

    const request = await friendrequests.create({ sender, receiver });
    // console.log(request);
    return res.json({ status: true, request });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addfriend = async (req, res, next) => {
  try {
    // const user = await User.find({ _id:  req.params.id  });
    const senderid = req.body.senderid;
    const receiverid = req.body.receiverid;
    // const user=user.findOne({receiver});
    const user = await User.findOneAndUpdate(
      { _id: receiverid },
      { $push: { friends: senderid } },
      { new: true }
    );
    const user1 = await User.findOneAndUpdate(
      { _id: senderid },
      { $push: { friends: receiverid } },
      { new: true }
    );
    // console.log(user);
    // console.log(user1);

    return res.json({ user, user1 });

    // const request=friendrequests.create({sender,receiver});
  } catch (ex) {
    next(ex);
  }
};
module.exports.getrequests = async (req, res, next) => {
  try {
    // const user = await User.find({ _id:  req.params.id  });
    const requests = await friendrequests.find({ receiver: req.params.id });
    // console.log(requests);
    return res.json(requests);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getfriends = async (req, res, next) => {
  try {
    // const user = await User.find({ _id:  req.params.id  });
    const userid = req.body.id;
    // console.log(userid);
    const user = await User.findById(userid);

    const userfriendsids = user.friends;
    let friends = [];
    for (const friendid of userfriendsids) {
      const user = await User.findById(friendid);
      friends.push(user);
    }

    // res.json(users);
    // console.log(friends);
    return res.json(friends);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    // console.log("ghjk");
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    // console.log(userData);
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.logOut = (req, res, next) => {
//   try {
//     if (!req.params.id) return res.json({ msg: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };
