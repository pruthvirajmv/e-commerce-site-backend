const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      active: Boolean,
      quantity: Number
    }
  ]
});

const Cart = mongoose.model("Cart", CartSchema);


module.exports = { Cart }