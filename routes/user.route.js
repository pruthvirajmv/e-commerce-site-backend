const express = require("express");
var router = express.Router();

const { authVerify } = require("../middlewares/auth-verify.middleware");

const {
   addNewUser,
   userLogin,
   userResetPassword,
   getUserProfile,
   updateUserProfile,

   addDeliveryAddress,
   updateDeliveryAddress,
   removeDeliveryAddress,
} = require("../controllers/user.controller");

router.route("/").get(authVerify, getUserProfile).post(authVerify, updateUserProfile);

router.route("/register").post(addNewUser);

router.route("/login").post(userLogin);

router.route("/resetpassword").post(userResetPassword);

router.route("/addresses/add").post(authVerify, addDeliveryAddress);
router.route("/addresses/update").post(authVerify, updateDeliveryAddress);
router.route("/addresses/remove").post(authVerify, removeDeliveryAddress);

module.exports = router;
