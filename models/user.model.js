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
            name: { type: String, required: true },
            house: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            pincode: {
               type: Number,
               min: 6,
               required: true,
            },
            state: { type: String, required: true },
            country: { type: String, required: true },
            phoneNumber: { type: Number, min: 10, required: true },
         },
      ],
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
