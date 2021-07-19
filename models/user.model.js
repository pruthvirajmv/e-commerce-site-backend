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
      addresses: [
         {
            name: { type: String },
            house: { type: String },
            street: { type: String },
            city: { type: String },
            pincode: {
               type: Number,
               min: 6,
               max: 6,
            },
            state: { type: String },
            country: { type: String },
            phoneNumber: { type: Number, min: 10, max: 10 },
         },
      ],
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
