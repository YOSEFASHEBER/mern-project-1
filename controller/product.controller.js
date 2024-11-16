const Product = require("../models/product.models");
const { default: mongoose } = require("mongoose");
const getproducts = async (req, res) => {
  try {
    const allproduct = await Product.find({});
    res.status(200).json({ success: true, data: allproduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in create product: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, massage: "server error" });
  }
};

const removeproduct = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
module.exports = { createProduct, getproducts, updateProduct, removeproduct };