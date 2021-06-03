const express = require("express");
var router = express.Router();

const {
   getAllProducts,
   addProductToDb,
   checkProductId,
   getProduct,
} = require("../controllers/product.controller");

router.route("/").get(getAllProducts).post(addProductToDb); //only for admin

router.param("productId", checkProductId);

router.route("/:productId").get(getProduct);

module.exports = router;
