const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  // mongoose.SchemaType.ObjectId 里特殊的id ref是模型关联
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  
});
module.exports = mongoose.model("Category", schema);
