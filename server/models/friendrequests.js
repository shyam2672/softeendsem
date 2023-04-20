const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
user1:{
  type:mongoose.SchemaTypes.ObjectId,

},
user2:{
  type:mongoose.SchemaTypes.ObjectId,

},
});

module.exports = mongoose.model("users", userSchema);
