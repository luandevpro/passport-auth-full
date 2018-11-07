const mongoose = require("mongoose");
   Schema      = mongoose.Schema;

// create schema
const userSchema = new Schema({
   googleId: String,
   name: {
      type: String,
   },
   email: {
      type: String,
      unique: true,
   },
   password: {
      type: String,
   },
   photoURL: String,
   date: {
      type: Date,
      default: Date.now
   },
});

// create model
const User = mongoose.model("user", userSchema);

// exports
module.exports = User;