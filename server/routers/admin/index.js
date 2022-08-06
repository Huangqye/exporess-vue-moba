// 导出函数,传入app
module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");

  router.post("/categories", async (req, res) => {
    // 创建
    const model = await Category.create(req.body);
    // 发回客户端
    res.send(model);
  });

  // 更新
  router.put("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  
  // 删除
  router.delete("/categories/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  // 获取列表
  router.get("/categories", async (req, res) => {
    // populate('parent') 拿到完整对象 
    const items = await Category.find().populate('parent').limit(10);
    res.send(items);
  });

  // 根据id查询
  router.get("/categories/:id", async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  });

  app.use("/admin/api", router);
};
