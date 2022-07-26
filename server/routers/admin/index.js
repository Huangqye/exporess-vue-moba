// 导出函数,传入app
module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    // 发回客户端
    res.send(model);
  });


  app.use("/admin/api", router);
};
