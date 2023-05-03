const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
sender:{
  type:mongoose.SchemaTypes.ObjectId,
},
receiver:{
  type:mongoose.SchemaTypes.ObjectId,
},
});

module.exports = mongoose.model("friendrequests", friendSchema);
