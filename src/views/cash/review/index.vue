<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="105px" :inline="true" style="margin-bottom:15px">
      <el-form-item label="客户姓名:" prop="custName">
        <el-input v-model.trim="listQuery.custName" size="small" placeholder="客户姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="certNo">
        <el-input v-model.trim="listQuery.certNo" size="small" placeholder="身份证号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="certNo">
        <el-input v-model.trim="listQuery.telephone" size="small" placeholder="身份证号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="借款编号:" prop="agreementNo">
        <el-input v-model.trim="listQuery.borrowNo" size="small" placeholder="借款协议编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="申请时间：">
        <el-form-item prop="repayDateStart">
          <DatePicker :model.sync="listQuery.applyStartTime" placeholder="选择开始日期" :max-date="listQuery.applyStartTime" style="width: 174px"></DatePicker>
        </el-form-item>
        <span style="margin:0 5px">至</span>
        <el-form-item prop="repayDateEnd">
          <DatePicker :model.sync="listQuery.applyEndTime" placeholder="选择结束日期" :min-date="listQuery.applyEndTime" style="width: 174px" @keyup.enter.native="search"></DatePicker>
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
          <span>{{ scope.row.borrowNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.applyTime}}</span>
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
      <el-table-column label="手机号码" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.telephone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="放款金额" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.loanAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="存管账户余额" width="150" height="35" align="center">
        <template scope="scope">
          <span v-if="scope.row.balance_none">{{scope.row.cgBalance}}</span>
          <el-button v-if="scope.row.btn_hide" @click="queryCGBalance(scope.row)" type="text">查询余额</el-button>
        </template>
      </el-table-column>
      <el-table-column label="申请提现金额" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.applyAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请原因" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.applyReason}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" height="35" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleAuditAction(scope.row,'agree')">通过</el-button>
          <el-button type="text" @click="openRefuseDialog(scope.row,'refuse')">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 提现拒绝弹出框 -->
    <el-dialog title="请输入拒绝原因" :visible.sync="refuseDialogVisible"  @close="close" style="width: 80%">
      <el-form :model="refuseForm" ref="refuseForm"  style="padding-left: 20%" >
          <el-form-item label="拒绝原因" prop="extracteReason">
            <el-input v-model="refuseForm.refuseReason" type="textarea" placeholder="请输入拒绝原因，必填！"  style="width:50%;min-height: 100%;"></el-input>
          </el-form-item>
        <div class="dialog-footer" style="margin-left: 20%">
          <el-button type="primary" @click="submitBtn"  size="middle">确 定</el-button>
          <el-button @click="close" size="middle" style="margin-right: 25%">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import dateFormat from 'dateformat'
import { queryExtrateAuditListByPage, getCGBalance, confirmAuditAction } from "@/api/extracteCash";
export default {
  data() {
    return {
      form: {
        textarea: ''
      },
      searchLoading: false,
      listLoading: false,
      refuseDialogVisible: false,
      list: null,
      total: 0,
      currentPage: 1,
      currentRows: 10,
      listQuery: {
        custName: "",
        certNo: "",
        borrowNo: "",
        applyStartTime: "",
        applyEndTime: "",
        page: 1,
        pageSize:10
      },
      refuseForm: {
        id: '',
        action: '',
        refuseReason: ''
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
      queryExtrateAuditListByPage(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          this.list.forEach((item, index) => {
              Vue.set(item, "btn_hide", true);
              Vue.set(item, "balance_none", false);
          });
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
    },

    //存管余额查询
    queryCGBalance(row) {
      var custCode = row.custCode;
      var custCode = '30002005830';
      if(typeof custCode =="undefined" || custCode =="undefined" || custCode ==''){
        this.$message.error('未查询到存管账号!');
        return false;
      }
      row.balance_none = true;
      getCGBalance(custCode)
        .then(response => {
          if (response.count == 0) {
            row.btn_hide = false;
            row.cgBalance = response.data | 0.00;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    handleAuditAction(row,action) {
      this.$confirm('审核操作确认', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        var query = {id: row.id, action, action, refuseReason: ''};
        this.postAuditAction(query);
      }).catch(error => {
        console.log(error);
        this.listLoading = false;
      });
    },

    postAuditAction(query) {
      confirmAuditAction(query).then(response => {
        this.$message({type: 'info',message: response.message});
        this.listLoading = false;
        getenquiryList();
      }).catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },

    openRefuseDialog(row,action) {
      this.refuseForm.refuseReason = '';
      this.refuseForm.id = row.id;
      this.refuseForm.action = action;
      this.refuseDialogVisible = true;
      this.resetForm('refuseForm');
    },

    search() {
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.getenquiryList();
    },

    submitBtn() {
//      this.$refs['refuseForm'].validate((valid) => {
//        if (valid) {
          this.postAuditAction(this.refuseForm);
          this.close();
//        }
//      });
    },

    close() {
      this.refuseDialogVisible = false;
      this.$emit('close');
    },

    handleSizeChange(n) {
      this.listQuery.rows = n;
      this.getenquiryList();
    },
    handleCurrentChange(n) {
      this.listQuery.page = n;
      this.getenquiryList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    indexMethod(index) {
      return index + this.currentRows * (this.currentPage - 1) + 1;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
