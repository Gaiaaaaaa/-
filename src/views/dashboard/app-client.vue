<template>
  <div class="app-container bind-container">
    <el-form :inline="true" ref="searchForm" :model="listQuery" class="demo-form-inline">

      <el-form-item label="客户名称" prop="custName">
        <el-input v-model="listQuery.custName" size="small" placeholder="客户名称"></el-input>
      </el-form-item>

      <el-form-item label="证件号码" prop="custCertNo">
        <el-input v-model="listQuery.custCertNo" size="small" placeholder="证件号码"></el-input>
      </el-form-item>

      <el-form-item label="开始日期" prop="startTime">
        <el-date-picker v-model="listQuery.startTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束日期" prop="endTime">
        <el-date-picker v-model="listQuery.endTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button @click="allocatingManager" type="primary" size="small" :disabled="isDisabled">指派客户经理</el-button>
      </el-form-item>

    </el-form>
    <el-table
      :data="list"
      border
      v-loading="listLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="客户姓名" align="center" width="120">
        <template scope="scope">
          <span>{{ scope.row.custName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" align="center" width="200">
        <template scope="scope">
          <span>{{ scope.row.custCertNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="200">
        <template scope="scope">
          <span>{{ scope.row.custMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户渠道" align="center" width="180">
        <template scope="scope">
          <span>{{ scope.row.custSource }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预申请金额" align="center" width="200">
        <template scope="scope">
          <span>{{ scope.row.applyAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发起时间" align="center" width="200">
        <template scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户经理工号" align="center" width="180">
        <template scope="scope">
          <span>{{ scope.row.custManagerJobnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属门店" align="center">
        <template scope="scope">
          <span>{{ scope.row.storeName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right">
      </el-pagination>
    </div>
    <!--<el-dialog title="订单指派" :visible.sync="dialogshow" size="small">
      <el-form :model="editForm" label-width="30%" style="width:50%;margin:0 auto">
        <el-form-item label="客户经理" prop="custManager">
          <el-select v-model="editForm.custManager" size="small">
            <el-option size="small" v-for="item in custManager" :key="item.userName" :label="item.userName+' ('+(item.teamName?item.teamName:'无')+')'"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="dialogshow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>-->
  </div>
</template>
<script>
  import { appTaskSearch } from '@/api/task'

  export default {
    data() {
      return {
        listQuery: {
          custName: '',
          custCertNo: '',
          startTime: null,
          endTime: null,
          page: 1,
          pageSize: 10
        },
        currentPage: 1,
        total: 0,
        searchLoading: false,
        listLoading: false,
        isDisabled: true,
        dialogshow: false,
        multipleSelection: null,
        editForm: null,
        list: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      search() {
        this.searchLoading = true
        this.currentPage = 1
        this.getList()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      getList() {
        this.listLoading = true
        appTaskSearch(this.listQuery).then(response => {
          this.total = response.count
          this.list = response.data
          this.listLoading = false
          this.searchLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
          this.searchLoading = false
        })
      },
      handleSizeChange(n) {
        this.listQuery.pageSize = n
        this.getList()
      },
      handleCurrentChange(n) {
        this.listQuery.page = n
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        if (this.multipleSelection.length >= 1) {
          this.isDisabled = false
        } else {
          this.isDisabled = true
        }
      },
      allocatingManager() {
        this.dialogshow = true
      },
      onSubmit() {
        this.dialogshow = false
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.bind-container {
  .pagination-wrapper {
    margin-top: 20px;
  }
  .inline-text {
    line-height: 36px;
    display: inline-block;
    margin-right: 10px;
  }
}

</style>
