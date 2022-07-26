module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba", {
    // 可传参配置
    useNewUrlParser: true,
  });
};
