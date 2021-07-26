const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   cartItems: [
      {
         productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
         },
         quantity: Number,
      },
   ],
   paymentId: { type: String },
   orderId: { type: String },
   amount: { type: Number },
   shipTo: {
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
   delivered: { type: Date, default: Date.now() },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
