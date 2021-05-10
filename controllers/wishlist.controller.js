const { extend } = require('lodash');

const { Wishlist } = require('../models/wishlist.model.js');


const checkUserWishlist = async (req, res, next, id) => {
    try {
      const userWishlist = await Wishlist.findOne({ userId: id });
      if (!userWishlist) {
        return res.status(400).json({ success: false, message: "user not found" })
      }
      req.wishlist = userWishlist;
      next();
    }
    catch (err) {
      res.status(400).json({ success: false, message: "could not find user", errorMessage: err.message })
    }
}

const getUserWishlist = async (req, res, next) => {
    let { wishlist } = req;
    wishlist = await wishlist.populate("products.productId").execPopulate();
    const wishlistItems = wishlist.products.filter(({ active }) => active)
    res.status(200).json({ success: true, wishlistItems });
}

const updateUserWishlist = async (req, res, next) => {
    console.log(req.body)
    let { wishlist } = req;
    const { id } = req.body;
    const inWishlist = wishlist.products.findIndex(({productId}) => productId.toString() === id);

    inWishlist >= 0
    ? wishlist.products[inWishlist].active = !wishlist.products[inWishlist].active
    : wishlist.products.push({productId: id, active: true })

    await wishlist.save()

    wishlist = await wishlist.populate("products.productId").execPopulate();

    const wishlistItems = wishlist.products.filter(product => product.active)

    res.status(200).json({success: true, wishlistItems})
  }

module.exports = { checkUserWishlist, getUserWishlist, updateUserWishlist }