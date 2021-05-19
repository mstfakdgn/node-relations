const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  code: String,
  name: String,
  details: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
