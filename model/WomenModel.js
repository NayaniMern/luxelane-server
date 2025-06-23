const mongoose = require("mongoose");
const WomenSchema = mongoose.Schema({
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
  
  features: {
  fit: String,
  material: String,
  sleeve: String,
  collar: String,
  pattern: String,
  occasion: String,
  length: String,
  closure: String,
  transparency: String,
  stretch: String,
  hemline: String,
  placket: String
}
},{
  toJSON: {
    transform: (doc, ret) => ({
      _id: ret._id,
      discount: ret.discount,
      image1: ret.image1,
      image2: ret.image2,
      image3: ret.image3,
      image4: ret.image4,
      name: ret.name,
      description: ret.description,
      brand: ret.brand,
      category: ret.category,
      colour: ret.colour,
      op: ret.op,
      dp: ret.dp,
      features: ret.features,
      __v: ret.__v
    })
  }
});

module.exports = mongoose.model("womens", WomenSchema);
