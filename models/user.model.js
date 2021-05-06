const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
  userName: { 
    type: String,
    required: "User name is required",
    unique: true
  },

  email: {
    type: String,
    required: "email is required",
    unique: true
  },

  password: {
  type: String,
  required: "password is required",
  },

  isUserLoggedIn: {
    type: Boolean,
    default: true
  },

  accountStatus: {
    type: Boolean,
    default: true
  }
  
}, 
{
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});


const User = mongoose.model("User", UserSchema);


module.exports = { User }