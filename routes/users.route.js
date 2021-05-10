const express = require('express');
var router = express.Router();

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
.post(addNewUser)

router.route('/login')
.post(userLogin)

router.route('/resetpassword')
.post(userResetPassword )


router.param("userId", checkUserId)

router.route("/:userId")
  .get(getUserProfile)
  .post(updateUserProfile)

router.route("/:userId/logout")
  .post(userLogout)

module.exports = router; 