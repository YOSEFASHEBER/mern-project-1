const router = require("express").Router();
const {
  createProduct,
  getproducts,
  updateProduct,
  removeproduct,
} = require("../controller/product.controller");

router.get("/", getproducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", removeproduct);

module.exports = router;
