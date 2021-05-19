const mongoose = require("mongoose");

const identifierSchema = mongoose.Schema({
  code: {
    type:String,
    required:true
  },
  customer: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
  }
});

const Identifier = mongoose.model("Identifier", identifierSchema);

module.exports = Identifier;
