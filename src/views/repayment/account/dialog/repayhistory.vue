<template>
  <div>
    <el-table :data="tableData" class="rehisDialog-wrapper" v-loading="listLoading" style="width:100%">
      <el-table-column prop="reportDate" label="还款时间" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="amount" label="还款金额" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="applyType" label="交易类型"  min-width="100" align="center">
        <template scope="scope">
          {{APPLY_TYPE[scope.row.applyType]}}
        </template>
      </el-table-column>
      <el-table-column prop="capitalChannel" label="渠道" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="transferInfo" label="交易结果" min-width="100" align="center">
        <template scope="scope">
          {{transferStatus(scope.row.transferStatus)}}
        </template>
      </el-table-column>
      <el-table-column prop="transferInfo" label="交易描述" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="creatorName" label="操作人" min-width="100" align="center">
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10, 20, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/common'
import { selectRepaiedBill } from "@/api/queryAccount";
export default {
  props:['query'],
  data() {
    return {
      tableData: [],
      total: 0,
      listLoading: true,
      APPLY_TYPE: {},
      listQuery: Object.assign({
        page: 1,
        pageSize: 10
      },this.query)
    };
  },
  created() {
    Utils.getDictMap('APPLY_TYPE', data => {
      this.APPLY_TYPE = data;
      this.getList()
    })

  },
  methods: {
    //获取列表
    getList() {
      selectRepaiedBill(this.listQuery).then((res) => {
        this.tableData = res.data;
        this.total = res.count;
        this.listLoading = false;
			}).catch((err) => {
			})
    },
    //状态
    transferStatus(status){
      switch (status){
        case '000':
          return '成功';
          break;
        case '003':
          return '处理中';
          break;
        default:
          return '失败';
      }
    },
    //翻页
    handleSizeChange(value) {
      this.listQuery.pageSize = value;
      this.getList()
    },
    //条目数
    handleCurrentChange(value) {
      this.listQuery.page = value;
      this.getList()
    }
  }
};
</script>
<style lang="scss" scoped>
.repayPlan-container {
  .rehisDialog-wrapper {
    max-height: 400px;
    overflow-y: auto
  }
}
</style>
