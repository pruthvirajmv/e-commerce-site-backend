const express = require('express');
var router = express.Router();


const { checkUserWishlist, getUserWishlist, updateUserWishlist } = require('../controllers/wishlist.controller');

router.param("userId", checkUserWishlist )

router.route('/:userId')
  .get(  getUserWishlist)
  .post( updateUserWishlist)

module.exports = router;