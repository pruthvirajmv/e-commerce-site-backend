const express = require('express');
var router = express.Router();
var cors = require('cors');

const { checkUserWishlist, getUserWishlist, updateUserWishlist } = require('../controllers/wishlist.controller');

router.param("userId", checkUserWishlist )

router.route('/:userId')
  .get( cors(), getUserWishlist)
  .post(cors(), updateUserWishlist)

module.exports = router;