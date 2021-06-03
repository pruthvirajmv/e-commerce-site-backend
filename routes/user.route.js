const express = require("express");
var router = express.Router();

const { authVerify } = require("../middlewares/auth-verify.middleware");

const {
   addNewUser,
   userLogin,
   userResetPassword,
   getUserProfile,
   updateUserProfile,
} = require("../controllers/user.controller");

router.route("/").get(authVerify, getUserProfile).post(authVerify, updateUserProfile);

router.route("/register").post(addNewUser);

router.route("/login").post(userLogin);

router.route("/resetpassword").post(userResetPassword);

module.exports = router;
