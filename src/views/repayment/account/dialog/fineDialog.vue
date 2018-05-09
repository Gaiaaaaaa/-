<template>
  <div class="rehisDialog-wrapper">
    <el-table :data="tableData" v-loading="listLoading">
      <el-table-column prop="createTime" label="减免时间" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="freeAmount" label="减免金额" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="freeCauses" label="减免原因">
      </el-table-column>
      <el-table-column prop="approveResult" label="审批结果" min-width="100" align="center">
        <template scope="scope">
          {{approveResult[scope.row.approveResult]}}
        </template>
      </el-table-column>
      <el-table-column prop="creatorName" label="操作人" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="updaterName" label="审批人" min-width="100" align="center">
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-if="false">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { selectRepaiedPenaltyBill } from "@/api/queryAccount";
export default {
  props:['query'],
  data() {
    return {
      currentPage: 1,
      tableData:[],
      total:0,
      listLoading: true,
      listQuery: Object.assign({
        page: 1,
        pageSize: 10
      },this.query),
      approveResult: {
        1: '审核通过',
        0: '审核不通过'
      }
    };
  },
  created() {
    console.log(1);
    this.getList();
  },
  methods: {
    //获取列表
    getList() {
      selectRepaiedPenaltyBill(this.listQuery).then((res) => {
        this.tableData = res.data;
        this.listLoading = false;
			}).catch((err) => {
        this.listLoading = false;
			})
    },
    //翻页
    handleSizeChange(value) {
      this.listQuery.page = value;
      this.getList();
    },
    //页数
    handleCurrentChange() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.repayPlan-container {
  .rehisDialog-wrapper {
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>