const mongoose = require("mongoose");

const tutorialSchema = mongoose.Schema({
  name: String,
  slug: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial;
