const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }], // 多选/多分类
  // 评分
  scores: {
    // 难度
    difficult: {
      type: Number,
    },
    //技能
    skills: {
      type: Number,
    },
    // 攻击
    attack: {
      type: Number,
    },
    // 生存
    survive: {
      type: Number,
    },
    skills: [
      {
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String },
      },
    ],
    items: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }], // 顺风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }], // 逆风出装
    usageTips: { type: String }, // 使用技巧
    battleTips: { type: String }, // 对抗技巧
    teamTips: { type: String }, // 团队思路
    partners: [
      {
        hero: { type: mongoose.Schema.ObjectId, ref: "Hero" },
        descrtion: { type: String },
      },
    ],
  },
});
module.exports = mongoose.model("Item", schema);
