const { Cart } = require("../models/cart.model");

const getAllCarts = async (req, res) => {
   try {
      const carts = await Cart.find({});
      res.status(200).json({ success: true, carts });
   } catch (err) {
      res.status(400).json({
         success: false,
         message: "could not fetch the carts",
         errorMessage: err.message,
      });
   }
};

const findUserCart = async (req, res, next) => {
   try {
      const id = req.user._id;
      const userCart = await Cart.findOne({ userId: id });
      if (!userCart) {
         return res.status(400).json({ success: false, message: "user not found" });
      }
      req.cart = userCart;
      next();
   } catch (err) {
      res.status(400).json({
         success: false,
         message: "could not find user",
         errorMessage: err.message,
      });
   }
};

const getUserCart = async (req, res) => {
   let { cart } = req;
   cart = await cart.populate("products.productId").execPopulate();
   const cartItems = cart.products;
   res.status(200).json({ success: true, cartItems });
};

const updateUserCart = async (req, res) => {
   let { cart } = req;
   const { id, qty, remove } = req.body;
   const inCart = cart.products.findIndex(({ productId }) => productId.toString() === id);

   if (remove) {
      cart.products = cart.products.filter(({ productId }) => productId.toString() !== id);
   } else {
      if (inCart >= 0) {
         cart.products[inCart].quantity = qty;
      } else cart.products.push({ productId: id, quantity: qty });
   }
   await cart.save();

   cart = await cart.populate("products.productId").execPopulate();

   const cartItems = cart.products;

   res.status(200).json({ success: true, cartItems });
};

module.exports = { getAllCarts, findUserCart, getUserCart, updateUserCart };
