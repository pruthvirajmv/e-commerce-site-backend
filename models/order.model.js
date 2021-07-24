const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   orders: [
      {
         products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
         },
         ordered: Boolean,
         amount: Number,
      },
   ],
});

const Cart = mongoose.model("Cart", OrderSchema);

module.exports = { Cart };
