const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  zipCode: String,
  tempSetting: String,
  isNewUser: Boolean,
  capacity: Number,
  // birthday: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
