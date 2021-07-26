const { Product } = require("../models/product.model");

const getAllProducts = async (req, res) => {
   try {
      const products = await Product.find({});
      res.status(200).json({ success: true, products });
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "unable to fetch the products",
         errorMessage: err.message,
      });
   }
};

const addProductToDb = async (req, res) => {
   try {
      const addProduct = req.body;
      const NewProduct = new Product(addProduct);
      const savedProduct = await NewProduct.save();
      res.status(200).json({ success: true, savedProduct });
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "unable to add the product",
         errorMessage: err.message,
      });
   }
};

const checkProductId = async (req, res, next, id) => {
   try {
      const product = await Product.findById(id);
      if (!product) {
         return res.status(400).json({ success: false, message: "product not found" });
      }
      req.product = product;
      next();
   } catch (err) {
      res.status(400).json({
         success: false,
         message: "could not retrieve product ",
         errorMessage: err.message,
      });
   }
};

const getProduct = (req, res) => {
   const { product } = req;
   product.__v = undefined;
   res.json({ success: true, product });
};

module.exports = { getAllProducts, addProductToDb, checkProductId, getProduct };
