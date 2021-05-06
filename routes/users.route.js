const express = require('express');
var router = express.Router();
var cors = require('cors');
const { extend } = require('lodash');


var { User } = require('../models/user.model.js');
const { Wishlist } = require('../models/wishlist.model.js');
const { Cart } = require('../models/cart.model.js');




router.route('/')
.get(async(req, res, next) => {
  try{
    const users = await User.find({});
    res.status(200).json({success:true, users})
  }
  catch(err){
    res.status(400).json({success:false, message: "cannot retrieve users", errorMessage: err.message})
  }
})
.post(cors(), async(req, res, next) =>{
  try{
    const {username,email,password } = req.headers;
    const user = {userName: username, email: email, password: password}
    const NewUser = new User(user);
    const addedUser = await NewUser.save();

    const userWishlist = new Wishlist({userId: addedUser._id})
    userWishlist.save();

    const userCart = new Cart({userId: addedUser._id})
    userCart.save();

    addedUser.__v = undefined;
    addedUser.password = undefined;

    res.status(200).json({success: true, addedUser});
  }
  catch(err){
    res.status(400).json({success:false, message: "could not add user", errorMessage: err.message});
  }
})

router.route('/login')
.post(cors(), async(req, res, next) => {
  try{
    const {username,password } = req.headers;
    
    let user = await User.findOne({userName: username});

    if(!user){
      return res.status(404).json({success:true, message: "username does not exist"})
    }
    else if(user.password !== password){
      return res.status(403).json({success:true, message: "incorrect password"})
    }
    user.isUserLoggedIn = true;
    await user.save();
    res.status(200).json({success:true, user})
  }
  catch(err){
    res.status(400).json({success:false, message: "cannot retrieve user", errorMessage: err.message})
  }
})

router.route('/resetpassword')
.post(cors(), async(req, res, next) => {
  try{
    const {email,password } = req.headers;
    const updateUserPassword = {password: password}
    console.log(email, password);
    let user = await User.findOne({email: email});

    if(!user){
      return res.status(404).json({success:true, message: "user does not exist"})
    }
    user = extend(user, updateUserPassword);
    user.isUserLoggedIn = true;
    await user.save();
    res.status(200).json({success:true, user})
  }
  catch(err){
    res.status(400).json({success:false, message: "cannot retrieve user", errorMessage: err.message})
  }
})


router.param("userId", async (req, res, next, id) => {
  try {
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" })
    }
    req.user = user;
    next()
  } catch(err) {
    res.status(400).json({ success: false, message: "could not retrieve user ", errorMessage: err.message })
  }
})

router.route("/:userId")
  .get((req, res) => {
    const { user } = req
    user.__v = undefined;
    res.json({ success: true, user })
  })
  .post(cors(), async(req, res) => {
    const {username,password } = req.headers;
    const userUpdate = {username : username, password: password}
    let { user } = req;
    user = extend(user, userUpdate);
    await user.save();
    user.__v = undefined;
    res.json({ success: true, user });
  })

router.route("/:userId/logout")
  .post(cors(), async(req, res) => {
    let { user } = req;
    user.isUserLoggedIn = false;
    await user.save();
    res.json({ success: true});
  })

module.exports = router; 