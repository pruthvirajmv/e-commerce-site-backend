const express = require("express");
var router = express.Router();

const {
   getAllCarts,
   findUserCart,
   getUserCart,
   updateUserCart,
} = require("../controllers/cart.controller");

//for admin or data study
router.route("/allcarts").get(getAllCarts);

router.use(findUserCart);

router.route("/").get(getUserCart).post(updateUserCart);

module.exports = router;
