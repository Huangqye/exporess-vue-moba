// 导出函数,传入app
module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    // 合并url参数 将父级合并进来
    mergeParams: true,
  });
  // const Category = require("../../models/Category");

  router.post("/", async (req, res) => {
    // 创建
    const model = await req.Model.create(req.body);
    // 发回客户端
    res.send(model);
  });

  // 更新
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
    });
  });

  // 获取列表
  router.get("/", async (req, res) => {
    // populate('parent') 拿到完整对象
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    // limit(10);
    const items = await req.Model.find().setOptions(queryOptions);
    res.send(items);
  });

  // 根据id查询
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 进来后要先走中间件，最后走router
  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      // 请求对象挂载Model
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );

  //  图片上传
  const multer = require("multer");
  // __dirname根，绝对地址
  const upload = multer({ dest: __dirname + "/../../uploads" });
  // single 单文件夹
  app.use(
    "/admin/api/upload",
    upload.single("file"),
    async (req, res) => {
      // 本来是没有这个file的，是通过中间件的所用
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    },
    router
  );
};
