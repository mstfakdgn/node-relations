const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  name: String,
  slug: String,
  tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
      expose:false
    },
  ],
});

tagSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.tutorials;
  return obj;
}

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
