<template>
  <div class="app-container bind-container" v-loading="fullLoading">
    <el-form :inline="true" ref="searchFrom" :model="searchFrom" class="demo-form-inline" label-width="100px">
      <el-form-item label="客户姓名" prop="custName">
        <el-input v-model="searchFrom.custName" size="small" placeholder="客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件号" prop="certNo">
        <el-input v-model="searchFrom.certNo" size="small" placeholder="证件号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="custMoblie">
        <el-input v-model="searchFrom.custMoblie" size="small" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" size="small" @click="getList">查询</el-button>
        <el-button size="small" @click="resetForm('searchFrom')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border stripe fit
      style="width: 100%">
      <el-table-column
        prop="custName"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        prop="certTypeValue"
        align="center"
        label="证件类型">
      </el-table-column>
      <el-table-column
        prop="certNo"
        label="证件号">
      </el-table-column>
      <el-table-column
        prop="telePhone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="操作人">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
        v-if="$store.getters.buttons.includes('btnAccountFyOpen')">
        <template scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
                     v-if="$store.getters.buttons.includes('btnAccountFyOpen')">富友开户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right">
      </el-pagination>
    </div>

    <open-account v-if="dialogShow" @close="dialogShow = false" @refresh="getList" :data="data" :isFuYou="true"></open-account>
  </div>
</template>
<script>
  import { getFyBankLogs } from '@/api/depository'
  import OpenAccount from './open-account'

  export default {
    components: { OpenAccount },
    data() {
      return {
        searchFrom: {
          custName: '',
          certNo: '',
          custMoblie: '',
          page: 1,
          pageSize: 10
        },
        fullLoading: false,
        dialogShow: false,
        currentPage: 1,
        total: 0,
        list: [],
        data: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.fullLoading = true
        getFyBankLogs(this.searchFrom).then(response => {
          this.list = response.data
          this.total = response.count
          this.fullLoading = false
        }).catch(() => {
          this.fullLoading = false
        })
      },
      handleSizeChange(n) {
        this.searchFrom.pageSize = n
        this.getList()
      },
      handleCurrentChange(n) {
        this.searchFrom.page = n
        this.getList()
      },
      handleClick(row) {
        this.data = row
        this.dialogShow = true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
