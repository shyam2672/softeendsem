const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
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

    // ids corresponding to each object
  },
  onlineStatus: {
    type: String,
    default: "",
  }
});

module.exports = mongoose.model("users", userSchema);
