const { Cart } = require("../models/cart.model");
const { Order } = require("../models/order.model");
const Razorpay = require("razorpay");
require("dotenv").config();
const shortid = require("shortid");

const RAZORPAY_ID = process.env.RAZORPAY_ID;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

const getUserOrders = async (req, res) => {
   try {
      const { user } = req;
      const orders = await Order.find({ userId: user._id }).populate("cartItems.productId");
      res.status(200).json({ message: "user orders fetched", orders });
   } catch (error) {
      res.status(400).json({ message: "failed to fetch orders", errorMessage: error.message });
   }
};

const createOrder = async (req, res) => {
   try {
      const { user } = req;

      const razorpay = new Razorpay({
         key_id: RAZORPAY_ID,
         key_secret: RAZORPAY_SECRET,
      });

      const cart = await Cart.findOne({ userId: user._id }).populate("products.productId");

      let cartAmount = cart.products.reduce((amount, product) => {
         const productFinalPrice =
            product.productId.price - product.productId.price * (product.productId.discount / 100);
         return amount + productFinalPrice * product.quantity;
      }, 0);
      cartAmount = Math.floor(cartAmount * 100);

      const currency = "INR";

      const options = {
         amount: cartAmount,
         currency,
         receipt: shortid.generate(),
      };
      const response = await razorpay.orders.create(options);
      const order = { id: response.id, currency: response.currency, amount: response.amount };
      res.status(200).json({ message: "order created", order });
   } catch (error) {
      res.status(400).json({ message: "failed to create order", errorMessage: error.message });
   }
};

const saveOrder = async (req, res) => {
   try {
      const { user } = req;
      const { razorpayResponse, order, address } = req.body;
      const cart = await Cart.findOne({ userId: user._id });

      const newOrder = {
         userId: user._id,
         paymentId: razorpayResponse.razorpay_payment_id,
         orderId: razorpayResponse.razorpay_order_id,
         amount: order.amount / 100,
         cartItems: cart.products,
         shipTo: address,
      };
      const ordered = new Order(newOrder);
      await ordered.save();
      await ordered.populate("cartItems.productId").execPopulate();
      cart.products = [];
      cart.save();
      res.status(200).json({ message: "order store", ordered });
   } catch (error) {
      res.status(400).json({ message: "failed to store order", errorMessage: error.message });
   }
};

module.exports = { getUserOrders, createOrder, saveOrder };
