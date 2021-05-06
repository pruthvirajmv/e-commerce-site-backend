const express = require('express');
var router = express.Router();
var cors = require('cors')

const { getAllProducts, addProductToDb, checkProductId, getProduct } = require('../controllers/products.controller');

router.route('/')
  .get(cors(), getAllProducts )
  .post(addProductToDb) //only for admin 

router.param("productId", checkProductId )

router.route("/:productId")
  .get(cors(), getProduct )


module.exports = router