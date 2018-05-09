<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="105px" :inline="true" style="margin-bottom:15px">
      <el-form-item label="客户姓名:" prop="custName">
        <el-input v-model.trim="listQuery.custName" size="small" placeholder="客户姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="certNo" :rules="[{pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式错误', trigger: 'blur'}]">
        <el-input v-model.trim="listQuery.certNo" size="small" placeholder="身份证号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="telephone" :rules="[{pattern:/^1\d{10}$/, message: '手机号码格式错误', trigger: 'blur'}]">
        <el-input v-model.number.trim="listQuery.telephone" size="small" placeholder="借款协议编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="协议编号:" prop="borrowNo">
        <el-input v-model.trim="listQuery.borrowNo" size="small" placeholder="协议编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="放款时间:">
        <el-form-item prop="repayDateStart">
          <DatePicker :model.sync="listQuery.repayDateStart" placeholder="选择开始日期" :max-date="listQuery.repayDateStart" style="width: 174px"></DatePicker>
        </el-form-item>
        <span style="margin:0 5px">至</span>
        <el-form-item prop="repayDateEnd">
          <DatePicker :model.sync="listQuery.repayDateEnd" placeholder="选择结束日期" :min-date="listQuery.repayDateEnd" style="width: 174px" @keyup.enter.native="search"></DatePicker>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" v-loading="searchLoading" @click="search" size="small" @keyup.enter.native="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading.body="listLoading" :data="list" border stripe fit style="width: 100%;margin-bottom:15px">
      <el-table-column label="#" width="70" align="center">
        <template scope="scope">
          {{indexMethod(scope.$index)}}
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="协议编号" width="260" align="center">
        <template scope="scope">
          <span>{{ scope.row.borrowNo }}</span>
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
      <el-table-column label="合同金额" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.contractAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="放款金额" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.loanAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="放款时间" width="150" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.creditedDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="存管账户余额" width="180" height="35" align="center">
        <template scope="scope">
          <span v-if="scope.row.balance_none">{{scope.row.cgBalance}}</span>
          <el-button v-if="scope.row.btn_hide" @click="queryCGBalance(scope.row)" type="text">查询余额</el-button>
        </template>
      </el-table-column>
      <el-table-column label="月还款额" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.monthBalance}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提前结清合计" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.earlySettleSum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" height="35" align="center">
        <template scope="scope">
          <el-button @click="toExetracte(scope.row)" type="text">提现</el-button>
        </template>
      </el-table-column>
      <el-table-column label="提现记录查询" width="180" height="35" align="center">
        <template scope="scope">
          <el-button @click="showCashRecordList(scope.row)" type="text">提现记录查询</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 个人提现记录列表 -->
    <el-dialog title="提现记录查询"  :visible.sync="dialogShow" size="large" @close="close">
      <el-table :data="cashRecordData" border class="rehisDialog-wrapper"  style="width:100%">
        <el-table-column label="申请时间" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.applyTime | dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请提现金额" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.extracteAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现手续费" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.extracteFee}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现原因" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.extracteReason}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.applicant}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现结果" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.extracteResult}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现结果说明" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.extracteInfo}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批人" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.approver}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批完成时间" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.approvalTime | dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提现到账时间" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.paymentTime | dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="入户账户" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.accountNo}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开户行" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.openBank}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChangeOne" @current-change="handleCurrentChangeOne" :current-page="this.listQuery1.page" :page-sizes="[10,20,30,40,50,100]" :page-size="this.listQuery1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="cashRecordTotal">
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 提现申请弹出框-->
    <el-dialog title="提现申请" :visible.sync="applyDialogVisible" size="small" @close="close" style="width: 80%">
      <el-form :model="applyForm" status-icon :rules="rules2" ref="applyForm" inline label-width="120px" class="applyDialog-wrapper" style="width:100%;padding-left: 20%;">
        <el-row style="margin-bottom: 5px">
          <el-form-item label="存管账户余额" prop="cgAccountBalance">
            <el-input v-model.trim="applyForm.cgAccountBalance"  readonly="true"></el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-bottom: 5px">
          <el-form-item label="提现金额" prop="extracteAccount" >
            <el-input v-model.trim="applyForm.extracteAccount" ></el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-bottom: 5px">
          <el-form-item label="提现手续费" prop="extracteCharge">
            <el-input v-model.trim="applyForm.extracteCharge" size="small" readonly="true"></el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-bottom: 5px">
          <el-form-item label="手机号码" prop="telephoneNo">
            <el-input v-model.trim="applyForm.telephoneNo" size="small" readonly="true">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-bottom: 5px">
          <el-form-item label="短信验证码" prop="teleCode">
            <div style="display: flex;">
              <el-input v-model.trim="applyForm.teleCode" size="small" style="margin-right: 10px"></el-input>
              <el-button @click="sendMessage" :loading="sendSmsLoading" :disabled="btnSendSmsDisabled" type="primary">{{btnSendSmsText}}</el-button>
            </div>
          </el-form-item>
        </el-row>
        <el-row style="margin-bottom: 5px">
          <el-form-item label="提现原因" prop="extracteReason">
            <el-input v-model="applyForm.extracteReason" type="textarea" size="large"></el-input>
          </el-form-item>
        </el-row>
      <div class="dialog-footer" style="margin-left: 20%">
        <el-button type="primary" @click="submitBtn"  size="middle">确 定</el-button>
        <el-button @click="close" size="middle" style="margin-right: 20%">取 消</el-button>
      </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { getList, getCGBalance, sendSmsCode, submitExtracteApply, queryCashRecordListByCustId } from "@/api/extracteCash";
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
import Utils from '@/utils/common';
import dateFormat from 'dateformat'

export default {
  components: {ElButton},
  data() {
    var validateAmt = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      }else if (parseFloat(value) <= 0) {
        callback(new Error('提现金额必须大于0'));
      } else {
        callback();
      }
    };
    var validateSmsCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入短信验证码'));
      } else {
        callback();
      }
    };
    var checkRefuseReason = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入拒绝原因'));
      } else {
        callback();
      }
    };
    return {
      dialogShow: false,
      searchLoading: false,
      listLoading: false,
      sendSmsLoading: false,
      applyDialogVisible: false,
      btnSendSmsDisabled: false,
      list: null,
      cashRecordData: null,
      cashRecordTotal: 0,
      currentPage: 1,
      currentPageSize: 10,
      total: 0,
      btnSendSmsText: '获取验证码',
      listQuery: {
        custName: "",
        certNo: "",
        telephone: "",
        borrowNo: "",
        repayDateStart: "",
        repayDateEnd: "",
        page: 1,
        pageSize: 10
      },
      listQuery1: {
        basicCustId: "",
        page: 1,
        pageSize: 10
      },
      applyForm: {
        cgAccountBalance: 0,
        extracteAccount: 0,
        extracteCharge: 0 ,
        telephoneNo: "",
        teleCode: "",
        extracteReason: "",
        custCodeHidden:"",
        custIdHidden: ""
      },
      rules2: {
        extracteAccount: [
          { validator: validateAmt, trigger: 'blur' }
        ],
        teleCode: [
          { validator: validateSmsCode, trigger: 'blur' }
        ],
        extracteReason: [
          { validator: checkRefuseReason, trigger: 'blur' }
        ]
      }
    };
  },
  filters: {
    dateFilter(date) {
      if (date) {
        return dateFormat(date, 'yyyy-mm-dd HH:MM:ss')
      }
      return '-'
    }
  },
  created() {
    this.getenquiryList();
  },
  methods: {
    getenquiryList() {
      this.listLoading = true;
      var _this = this;
      getList(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          this.list.forEach((item, index) => {
             if(item.subAccount!=null){
                Vue.set(item, "btn_hide", true);
                Vue.set(item, "balance_none", false);
              }
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
    showCashRecordList(row) {
      var custId = row.custId;
      if(typeof custId =="undefined" || custId =="undefined" || custId ==''){
        this.$message.error('未查询到客户Id!');
        return false;
      }
      this.listQuery1.basicCustId = custId;
      queryCashRecordListByCustId(this.listQuery1)
        .then(response => {
          this.cashRecordTotal = response.count;
          this.cashRecordData = response.data;
          this.dialogShow = true;
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
    //提现记录查询
    show_record(query) {
      queryCashRecordListByCustId(query)
        .then(response => {
          this.cashRecordTotal = response.count;
          this.cashRecordData = response.data;
          this.dialogShow = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    toExetracte(row) {
      this.applyForm.extracteAccount = 0;
      this.applyForm.teleCode = '';
      this.applyForm.extracteReason = '';
      this.applyForm.telephoneNo = row.telephone;
      this.applyForm.extracteCharge = 0.00;
      this.applyForm.custIdHidden = row.custId;
//      this.applyForm.custCodeHidden = row.custCode;
      this.applyForm.custCodeHidden = '30002005830';

      var custCode = '30002005830';
      if (typeof custCode == "undefined" || custCode == "undefined" || custCode == '') {
        this.$message.info("未查询到存管账号");
        return false;
      }
      getCGBalance(custCode)
        .then(response => {
            if ((response.code == '000000')) {
              this.applyForm.cgAccountBalance = response.data | '0.00';
            }
        })
        .catch(error => {
          console.log(error);
        });
        this.applyDialogVisible = true;
      this.$refs['applyForm'].resetFields();
    },
    sendMessage() {
      var custId = this.applyForm.custIdHidden;
      if(typeof custId =="undefined" || custId =="undefined" || custId ==''){
        this.$message.error('未查询到客户Id!');
        return false;
      };
      this.countdown();
      this.sendSmsLoading = true;

      sendSmsCode(custId).then(response => {
          this.sendSmsLoading = false
          this.countdown()
//          Utils.success('发送成功');
          if (response.code == '000000') {
            this.$message.info("短信发送成功!");
            //定时器60s计时
            //
          } else {
              this.$message.error("短信发送失败!");
          }
        })
        .catch(error => {
          console.log(error)
          this.sendSmsLoading = false
        });
    },
    countdown() {
      var i = 60
      this.btnSendSmsDisabled = true
      const smsInterval = setInterval(() => {
        if (i === 0) {
          this.btnSendSmsDisabled = false
          this.btnSendSmsText = '获取验证码'
          clearInterval(smsInterval)
        } else {
          this.btnSendSmsText = `${i}s`
          i--
        }
      }, 1000)
    },
    submitBtn() {
      this.$refs['applyForm'].validate((valid) => {
        if (valid) {
          submitExtracteApply(this.applyForm)
            .then(response => {
              if ((response.code === '000000')) {
                this.$message.error(response.message);
              } else {
                this.$message.error(response.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
          this.applyDialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    close() {
      this.applyDialogVisible = false;
      this.$emit('close');
    },
    handleSizeChange(value) {
      this.listQuery.pageSize = value;
      this.getenquiryList();
    },
    handleCurrentChange(value) {
      this.listQuery.page = value;
      this.getenquiryList();
    },
    handleSizeChangeOne(value) {
      this.listQuery1.pageSize = value;
      this.show_record(this.listQuery1);
    },
    handleCurrentChangeOne(value) {
      this.listQuery1.page = value;
      this.show_record(this.listQuery1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    indexMethod(index) {
      return index + this.currentRows * (this.currentPage - 1) + 1;
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
