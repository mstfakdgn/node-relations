const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: { type: Number, min: 18, max: 65, required: true },
  products: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }],
  identifier: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Identifier'
  }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
