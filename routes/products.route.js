const express = require('express');
var router = express.Router();
var cors = require('cors')
var { Product } = require("../models/product.model")

router.route('/')
  .get(cors(), async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, products })
    }
    catch (err) {
      res.status(500).json({ success: false, message: "unable to fetch the products", errorMessage: err.message })
    }
  })
  .post(async (req, res, next) => {
    try {
      const addProduct = req.body;
      const NewProduct = new Product(addProduct);
      const savedProduct = await NewProduct.save();
      res.status(200).json({ success: true, savedProduct })
    }
    catch (err) {
      res.status(500).json({ success: false, message: "unable to add the product", errorMessage: err.message })
    }
  })

router.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ success: false, message: "product not found" })
    }
    req.product = product;
    next()
  } catch {
    res.status(400).json({ success: false, message: "could not retrieve product " })
  }
})

router.route("/:productId")
  .get(cors(), (req, res) => {
    const { product } = req
    product.__v = undefined;
    res.json({ success: true, product })
  })


module.exports = router