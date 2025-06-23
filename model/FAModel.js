const mongoose = require("mongoose");
const FASchema = mongoose.Schema({
  discount: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,

  name: String,
  description: String,
  brand: String,

  category: String,
  colour: String,
  op: String,
  dp: String,

  features: [String],
});

module.exports = mongoose.model("footwear and accessories", FASchema);
