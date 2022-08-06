<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column fixed="right" prop="name" label="操作">
        <template slot-scope="scope">
          <!-- 加'/'的目的是为了从跟目录开始 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定删除分类${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        typing: "warning",
      }).then(async () => {
        await this.$http.delete(`/categories/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功",
        });
      this.fetch()
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
