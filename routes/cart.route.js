const express = require('express');
var router = express.Router();


const { getAllCarts, checkUserId, getUserCart, updateUserCart } = require('../controllers/cart.controller');

var { Cart } = require('../models/cart.model.js');


router.route('/').get(getAllCarts)

router.param("userId", checkUserId)

router.route('/:userId')
  .get( getUserCart)
  .post( updateUserCart)

module.exports = router;