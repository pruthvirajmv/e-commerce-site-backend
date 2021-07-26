const express = require("express");
var router = express.Router();

const {
   findUserWishlist,
   getUserWishlist,
   updateUserWishlist,
} = require("../controllers/wishlist.controller");

router.use(findUserWishlist);

router.route("/").get(getUserWishlist).post(updateUserWishlist);

module.exports = router;
