require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const bcrypt = require("bcrypt");
const { extend } = require("lodash");

const { User } = require("../models/user.model");
const { Wishlist } = require("../models/wishlist.model");
const { Cart } = require("../models/cart.model");

const addNewUser = async (req, res) => {
   try {
      const { name, email, password } = req.headers;

      const user = {
         name: name,
         email: email,
         password: password,
      };

      let NewUser = new User(user);
      const salt = await bcrypt.genSalt(10);
      NewUser.password = await bcrypt.hash(NewUser.password, salt);
      NewUser = await NewUser.save();

      const userWishlist = new Wishlist({
         userId: NewUser._id,
      });
      userWishlist.save();

      const userCart = new Cart({
         userId: NewUser._id,
      });
      userCart.save();

      res.status(200).json({
         success: true,
         message: "user created successfully",
      });
   } catch (err) {
      res.status(400).json({
         success: false,
         message: "could not add user",
         errorMessage: err.message,
      });
   }
};

const userLogin = async (req, res) => {
   try {
      const { email, password } = req.headers;

      const user = await User.findOne({
         email: email,
      });

      if (user) {
         const passwordMatched = await bcrypt.compare(password, user.password);
         if (passwordMatched) {
            const token = jwt.sign({ userId: user._id }, JWT_KEY, { expiresIn: "24h" });
            return res.status(200).json({
               success: true,
               user,
               token,
            });
         } else {
            return res.status(403).json({
               success: false,
               message: "email and password did not match",
            });
         }
      } else {
         return res.status(401).json({
            success: false,
            message: "User does not exist",
         });
      }
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "cannot retrieve user",
         errorMessage: err.message,
      });
   }
};

const userResetPassword = async (req, res) => {
   try {
      const { email, password } = req.headers;

      let user = await User.findOne({
         email: email,
      });

      if (!user) {
         return res.status(404).json({
            success: true,
            message: "user does not exist",
         });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user = await user.save();
      res.status(200).json({
         success: true,
         message: "user credentials updated",
         user,
      });
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "cannot retrieve user",
         errorMessage: err.message,
      });
   }
};

const getUserProfile = (req, res) => {
   const { user } = req;
   res.status(200).json({
      success: true,
      message: "user found",
      user,
   });
};

const updateUserProfile = async (req, res) => {
   const { name } = req.headers;
   let { user } = req;
   try {
      user.name = name;
      user = await user.save();
      return res.status(200).json({
         success: true,
         message: "user profile updated",
         user,
      });
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "could not update user profile",
         errorMessage: err.message,
      });
   }
};

const addDeliveryAddress = async (req, res) => {
   try {
      const { user } = req;
      const { address } = req.body;
      user.addresses.push(address);
      await user.save();

      return res.status(200).json({ message: "new address added", addresses: user.addresses });
   } catch (error) {
      res.status(500).json({ message: "could not add new address", errorMessage: error.message });
   }
};

const updateDeliveryAddress = async (req, res) => {
   try {
      const { user } = req;
      const { address } = req.body;
      console.log(address);

      user.addresses = user.addresses.map((existingAddress) => {
         if (existingAddress._id.toString() === address._id) {
            return extend(existingAddress, address);
         }
         return existingAddress;
      });
      await user.save();

      return res.status(200).json({ message: "address udated", addresses: user.addresses });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "could not update address", errorMessage: error.message });
   }
};

const removeDeliveryAddress = async (req, res) => {
   try {
      const { user } = req;
      const { address } = req.body;

      user.addresses = user.addresses.filter(({ _id }) => _id.toString() !== address._id);
      await user.save();

      return res.status(200).json({ message: "address udated", addresses: user.addresses });
   } catch (error) {
      res.status(500).json({ message: "could not delete address", errorMessage: error.message });
   }
};

module.exports = {
   addNewUser,
   userLogin,
   userResetPassword,
   getUserProfile,
   updateUserProfile,

   addDeliveryAddress,
   updateDeliveryAddress,
   removeDeliveryAddress,
};
