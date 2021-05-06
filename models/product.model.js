const mongoose = require('mongoose');
require('mongoose-type-url');

const ProductSchema = new mongoose.Schema({
  name:{ 
    type: String,
    required: "Product name is required",
    unique: true
  },

  price: {
    type: Number,
    min: 1,
    max: 100000,
    required: "Product price must be between 100 to 100000"
  },

  discount: {
  type: Number,
  min: 0,
  max: 100,
  required: "Product discount must be between 0 to 100 percent"
  },

  rating: {
  type: Number,
  min: 0,
  max: 5,
  required: "Product rating must be between 0 to 5"
  },

  category:{
  type: String,
  required: "Product category must be specified",
  },

  image: {
    type: mongoose.SchemaTypes.Url,
    required: "Please enter product image url"
  },

  description:{
    type: String,
    minLength:[10, "Description is short"] 
  },

  brand:{
  type: String,
  required: "Product category must be specified",
  },

  inStock:{
    type: Boolean,
    required: "Please enter product stock status",
  }
}, 
{
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});


const Product = mongoose.model("Product", ProductSchema);


module.exports = { Product }