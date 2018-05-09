<template>
  <div class="app-container bind-container">
    <el-form :inline="true" ref="searchFrom" :model="searchFrom" class="demo-form-inline">
      <el-form-item label="客户名称" prop="user">
        <el-input v-model="searchFrom.user" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="num">
        <el-input v-model="searchFrom.num" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="num">
        <el-input v-model="searchFrom.num" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="num">
        <el-input v-model="searchFrom.num" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="客户状态" prop="num">
        <el-input v-model="searchFrom.num" size="small" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="创建日期" prop="tjsj">
        <div class="block">
          <el-date-picker
            v-model="tjsj"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" size="small" @click="">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button @click="editClick" icon="edit" type="primary" size="small" :disabled="isEditDisabled">操作</el-button>
        <el-button @click="downloadClick" type="primary" size="small" :disabled="isDownloadDisabled">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户姓名"
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
        label="手机号"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop=""
        label="客户渠道"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="预申请金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="发起时间"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop=""
        label="客户经理工号"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="所属门店"
        align="center">
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
    <el-dialog title="更改客户状态" :visible.sync="dialogshow" size="small">
      <el-form :model="form" label-width="30%" style="width:50%;margin:0 auto">
        <el-form-item label="请选择客户状态" prop="managerId">
          <el-select v-model="managerId" size="small">
            <el-option size="small" v-for="item in managerList" :key="item.userName" :label="item.userName+' ('+(item.teamName?item.teamName:'无')+')'"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="dialogshow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isEditDisabled: true,
        isDownloadDisabled: true,
        multipleSelection: [],
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
          }
        ],
        dialogshow: false,
        form: []
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSubmit() {
        this.dialogshow = false
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      },
      editClick() {
        this.dialogshow = true
      },
      downloadClick() {
        this.dialogshow = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        if (this.multipleSelection.length >= 1) {
          this.isEditDisabled = false
          this.isDownloadDisabled = false
        } else {
          this.isEditDisabled = true
          this.isDownloadDisabled = true
        }
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
