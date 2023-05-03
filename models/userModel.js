const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  random_username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratedby: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  onlineStatus: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token:{
  type: String,
  },
});

userSchema.methods.generateVerificationToken = function () {
  const user = this;
  console.log(user);
  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return verificationToken;
};

module.exports = mongoose.model("users", userSchema);
