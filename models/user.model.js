const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: "User name is required",
         unique: "User name is already taken",
      },

      email: {
         type: String,
         required: "email is required",
         unique: "account already exists for this email ",
      },

      password: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
