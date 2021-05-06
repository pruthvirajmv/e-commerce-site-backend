const express = require('express');
var router = express.Router();
var cors = require('cors');

const { 
  getAllUsers, 
  addNewUser, 
  userLogin, 
  userResetPassword, 
  checkUserId,
  getUserProfile,
  updateUserProfile,
  userLogout
  } = require('../controllers/users.controller');


router.route('/')
.get( getAllUsers )
.post(cors(), addNewUser)

router.route('/login')
.post(cors(), userLogin)

router.route('/resetpassword')
.post(cors(), userResetPassword )


router.param("userId", checkUserId)

router.route("/:userId")
  .get(getUserProfile)
  .post(cors(), updateUserProfile)

router.route("/:userId/logout")
  .post(cors(), userLogout)

module.exports = router; 