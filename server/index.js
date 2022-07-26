const express = require("express");

const app = express();

// 跨域
app.use(require("cors")());
// 中间件，拿到可用结果
app.use(express.json());

require("./routers/admin")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
  console.log("30001");
});
