<template>
  <div class="app-container bind-container">
    <el-form :inline="true" ref="searchFrom" :model="searchFrom" class="demo-form-inline">
      <el-form-item label="证件号码" prop="num">
        <el-input v-model="searchFrom.num" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="user">
        <el-input v-model="searchFrom.user" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="phone">
        <el-input v-model="searchFrom.phone" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="客户名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="id"
        label="证件号码"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="是否授权通讯录"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop=""
        label="获取时间"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="客户渠道"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="所属门店"
        align="center">
      </el-table-column>
      <el-table-column fixed="right"  align="center" width="100" label="操作">
        <template scope="scope">
          <el-button  @click="showHistoryDialog(scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix pagination-wrapper">
      <el-pagination
        @size-change=""
        @current-change=""
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
        style="float:right">
      </el-pagination>
    </div>
    <el-dialog title="" :visible.sync="dialogshow" size="small">
      <el-table
        border
        style="width: 80%;margin:0 auto;">
        <el-table-column
          prop="name"
          label="客户名称"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="id"
          label="手机号码"
          align="center">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchFrom: {
          user: '',
          num: '',
          phone: ''
        },
        tjsj: '',
        currentPage: 1,
        list: [
          {
            name: 'tom1',
            id: '42068319920202544',
            phone: '15618204561'
          },
          {
            name: 'tom2',
            id: '42068319920202544',
            phone: '15618204561'
          },
          {
            name: 'tom3',
            id: '42068319920202544',
            phone: '15618204561'
          },
          {
            name: 'tom4',
            id: '42068319920202544',
            phone: '15618204561'
          }
        ],
        dialogshow: false,
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      showHistoryDialog(row) {
        this.dialogshow = true
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
