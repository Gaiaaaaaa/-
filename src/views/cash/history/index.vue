<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="105px" :inline="true" style="margin-bottom:15px">
      <el-form-item label="客户姓名:" prop="custName">
        <el-input v-model.trim="listQuery.custName" size="small" placeholder="客户姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="certNo">
        <el-input v-model.trim="listQuery.certNo" size="small" placeholder="身份证号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="借款协议编号:" prop="borrowNo">
        <el-input v-model.trim="listQuery.borrowNo" size="small" placeholder="借款协议编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="提现结果:" prop="operateType">
        <el-select size="small" v-model="listQuery.operateType" placeholder="请选择提现结果">
          <el-option label="提现成功" value="1"></el-option>
          <el-option label="提现失败" value="2"></el-option>
          <el-option label="提现退票" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请人:" prop="applicant">
        <el-input v-model.trim="listQuery.applicant" size="small" placeholder="申请人" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="申请时间:">
        <el-form-item prop="applyStartTime">
          <DatePicker :model.sync="listQuery.applyStartTime" placeholder="选择开始日期" :max-date="listQuery.applyStartTime" style="width: 174px"></DatePicker>
        </el-form-item>
        <span style="margin:0 5px">至</span>
        <el-form-item prop="approvalStartTime">
          <DatePicker :model.sync="listQuery.applyEndTime" placeholder="选择结束日期" :min-date="listQuery.applyEndTime" style="width: 174px" @keyup.enter.native="search"></DatePicker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="审批时间:">
        <el-form-item prop="repayDateStart">
          <DatePicker :model.sync="listQuery.approvalStartTime" placeholder="选择开始日期" :max-date="listQuery.approvalStartTime" style="width: 174px"></DatePicker>
        </el-form-item>
        <span style="margin:0 5px">至</span>
        <el-form-item prop="repayDateEnd">
          <DatePicker :model.sync="listQuery.approvalEndTime" placeholder="选择结束日期" :min-date="listQuery.approvalEndTime" style="width: 174px" @keyup.enter.native="search"></DatePicker>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" v-loading="searchLoading" @click="search" size="small" @keyup.enter.native="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading.body="listLoading" :data="list" border stripe fit style="width: 100%;margin-bottom:15px">
      <el-table-column label="协议编号" width="260" align="center">
        <template scope="scope">
          <span>{{ scope.row.borrowNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" width="120" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" width="230" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现金额" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.extracteAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现手续费" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.extracteFee}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现原因" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.extracteReason}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现结果" width="150" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.extracteResult}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现结果说明" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.extracteInfo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.applicant}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.applyTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批人" width="120" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.approver}}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核完成时间" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.approvalTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现到账时间" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.paymentTime | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="repayDate" label="入账账号" width="180">
        <template scope="scope">
          <span>{{scope.row.accountNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="repayDate" label="开户行" width="180">
        <template scope="scope">
          <span>{{scope.row.openBank}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"  :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import dateFormat from 'dateformat'
import { queryCashRecordListByPage } from "@/api/extracteCash";
export default {
  data() {
    return {
      searchLoading: false,
      listLoading: false,
      list: null,
      total: 0,
      currentPage: 1,
      currentRows: 10,
      listQuery: {
        custName: "",
        certNo: "",
        borrowNo: "",
        operateType: "",
        applicant: "",
        applyStartTime: "",
        applyEndTime: "",
        approvalStartTime: "",
        approvalEndTime: "",
        page: 1,
        pageSize:10
      }
    };
  },
  created() {
    this.getenquiryList();
  },
  filters: {
    dateFilter(date) {
      if (date) {
        return dateFormat(date, 'yyyy-mm-dd HH:MM:ss')
      }
      return '-'
    }
  },
  methods: {
    getenquiryList() {
      this.listLoading = true;
      var _this = this;
      queryCashRecordListByPage(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          this.currentPage = this.listQuery.page;
          this.currentRows = this.listQuery.pageSize;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
    },

    search() {
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.getenquiryList();
    },

    handleSizeChange(n) {
      this.listQuery.pageSize = n;
      this.getenquiryList();
    },
    handleCurrentChange(n) {
      this.listQuery.page = n;
      this.getenquiryList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
