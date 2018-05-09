<template>
  <div class="app-container repayPlan-container">
    <div class="detail">
      <el-form :inline="true" label-position="left">
        <el-form-item label="客户姓名：">
          {{accountInfo.custName}}
        </el-form-item>
        <el-form-item label="银行存管账号：">
          {{accountInfo.cgAccountNo}}
        </el-form-item>
        <el-form-item label="存管账户余额：">
          {{accountInfo.cgBalance}}
        </el-form-item>
        <el-form-item label="富友账号：">
          {{accountInfo.fyAccountNo}}
        </el-form-item>
        <el-form-item label="富友账户余额：">
          {{accountInfo.fyBalance}}
        </el-form-item>
        <el-form-item label="剩余本息：">
          {{accountInfo.surplusAmount}}
        </el-form-item>
        <el-form-item label="剩余罚息：">
          {{accountInfo.surplusResidueAmt}}
        </el-form-item>
        <el-form-item label="一次性结清金额：">
          {{accountInfo.onceSettleAmt}}
        </el-form-item>
        <el-form-item label="手机号码：">
          {{accountInfo.phoneNumber}}
        </el-form-item>
        <el-form-item label="已还清账单：">
          <el-tag class="tag" type="success" v-for="(item,index) in accountInfo.settledBill" :key="index">{{item}}</el-tag>
        </el-form-item>
        <el-form-item label="逾期账单：">
          <el-tag class="tag" type="danger" v-for="(item,index) in accountInfo.overdueBill" :key="index">{{item}}</el-tag>
        </el-form-item>
      </el-form>
      <el-button size="small" @click="applyDialogVisible = true" v-if="false">提前结清</el-button>
    </div>
    <el-table :data="tableData" border stripe fit style="width: 100%" height="450" v-loading="listLoading">
      <el-table-column fixed prop="termNo" label="账单期数" width="100">
      </el-table-column>
      <el-table-column prop="repayDate" label="到期还款日" width="120">
      </el-table-column>
      <el-table-column prop="currRepay" label="本期应还款额" width="130">
      </el-table-column>
      <el-table-column prop="payAmount" label="已还金额" width="100">
        <template scope="scope">
          <el-button type="text" @click="openHisDialog(scope.row.termNo,1)">{{scope.row.payAmount}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="surplusAmt" label="剩余应还款额" width="130">
        <template scope="scope">
          <span>{{scope.row.surplusAmt}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="overStatus" label="账单状态" width="120">
        <template scope="scope">
          {{BILL_STATUS[scope.row.overStatus]}}
        </template>
      </el-table-column>
      <el-table-column prop="overDays" label="逾期天数" width="100">
      </el-table-column>
      <el-table-column prop="repayStatus" label="还款状态" width="120">
        <template scope="scope">
          {{REPAY_STATUS[scope.row.repayStatus]}}
        </template>
      </el-table-column>
      <el-table-column prop="residueAmt" label="罚息金额" width="120">
      </el-table-column>
      <el-table-column prop="payResidueAmt" label="已还罚息" width="120">
        <template scope="scope">
          <el-button type="text" @click="openHisDialog(scope.row.termNo,4)">{{scope.row.payResidueAmt}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="defaRedueAmt" label="罚息减免金额" width="130">
        <template scope="scope">
          <el-button type="text" @click="openFineDialog(scope.row.termNo)">{{scope.row.defaRedueAmt}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="surplusResidueAmt" label="剩余应还罚息" width="130">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template scope="scope">
          <el-button type="text" size="small" :disabled="scope.row.isNormalRepay == '0'" @click="repaymentNormal(scope.row)">正常还款</el-button>
          <el-button type="text" size="small" :disabled="scope.row.isOverdueRepay == '0'" @click="repaymentOvertime(scope.row)">逾期还款</el-button>
          <el-button type="text" size="small" :disabled="scope.row.isPenalRepay == '0'" @click="repaymentFine(scope.row)">罚息还款</el-button>
          <el-button type="text" size="small" :disabled="scope.row.isPenalRepay == '0'" @click="feewaiver(scope.row)">费用免除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <apply-dialog v-if="applyDialogVisible" :applyVisible="applyDialogVisible" @close="applyDialogVisible = false" />
    <el-dialog :title="dialogTitle" :visible.sync="historyDialogVisible" size="large">
      <repay-history v-if="historyDialogVisible" :query="hisQuery" />
    </el-dialog>
    <el-dialog title="罚息减免记录" :visible.sync="fineDialogVisible" size="large">
      <fine-dialog v-if="fineDialogVisible" :query="hisQuery" />
    </el-dialog>
    <repayment-dialog v-if="repaymentDialogVisible" :report-type="reportType" :termNo="termNo" :refundObj="refundObj"  :title="repaymentType" :visible="repaymentDialogVisible" @close="repaymentDialogVisible = false" />
    <feewaiver-dialog v-if="feewaiverDialogVisible" :query="hisQuery" @close="feewaiverDialogVisible = false" @refresh="getRepayPlan"></feewaiver-dialog>
  </div>
</template>
<script>
import applyDialog from "./dialog/applyDialog";
import repayHistory from "./dialog/repayhistory";
import fineDialog from "./dialog/fineDialog";
import repaymentDialog from "./dialog/repaymentDialog";
import feewaiverDialog from "./dialog/feewaiverDialog";
import { mapGetters } from 'vuex'

import Utils from "@/utils/common";
import { getAccountInfo, getAccountRepayPlan } from "@/api/queryAccount";
export default {
  data() {
    return {
      applyDialogVisible: false,
      historyDialogVisible: false,
      fineDialogVisible: false,
      repaymentDialogVisible: false,
      feewaiverDialogVisible: false,
      dialogTitle: '还款记录查询',
      repaymentType: "",
      accountInfo: {},
      tableData: [],
      hisList: [],
      hisQuery: null,
      reportType: 1,
      termNo: "",
      refundObj:{
        surplusAmt:null,
        surplusResidueAmt:null,
      },
      listLoading: true,
      BILL_STATUS: {
        0: "逾期",
        1: "正常",
        2: "逾期"
      },
      REPAY_STATUS: {}
    };
  },
  created() {
    this.agreementNo = this.$route.params.accountId;
    Utils.getDictMap("REPAY_STATUS", data => {
      this.REPAY_STATUS = data;
      this.getRepayPlan();
    });
    this.getRepayAccountInfo();
    this.createConnection();//建立webSocket链接
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    // 获取查询还款账户明细信息
    getRepayAccountInfo() {
      getAccountInfo(this.agreementNo)
        .then(res => {
          this.accountInfo = res.data;
        })
        .catch(err => {});
    },
    // 查询还款账户计划表
    getRepayPlan() {
      getAccountRepayPlan(this.agreementNo)
        .then(res => {
          this.tableData = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 查询还款记录
    openHisDialog(no,applyType) {
      this.historyDialogVisible = true;
      this.hisQuery = {
        borrowNo: this.agreementNo,
        repayPeriod: no,
        applyType: applyType
      };
      if(applyType == '4') {
        this.dialogTitle = '罚息还款记录查询';
      } else {
        this.dialogTitle = '还款记录查询';
      }
    },
    // 查询罚息记录
    openFineDialog(no) {
      this.fineDialogVisible = true;
      this.hisQuery = {
        borrowNo: this.agreementNo,
        repayPeriod: no
      };
    },
    handleClick(row) {
      console.log(row);
    },
    repaymentNormal(row) {
      this.refundObj.surplusAmt = row.surplusAmt
      this.refundObj.surplusResidueAmt = row.surplusResidueAmt
      this.repaymentType = "正常还款";
      this.termNo = row.termNo;
      this.reportType = 1;
      this.repaymentDialogVisible = true;
    },
    repaymentOvertime(row) {
      this.refundObj.surplusAmt = row.surplusAmt
      this.refundObj.surplusResidueAmt = row.surplusResidueAmt
      this.repaymentType = "逾期还款";
      this.termNo = row.termNo;
      this.reportType = 2;
      this.repaymentDialogVisible = true;
    },
    repaymentFine(row) {
      this.refundObj.surplusResidueAmt = row.surplusResidueAmt
      this.repaymentType = "罚息还款";
      this.termNo = row.termNo;
      this.reportType = 4;
      this.repaymentDialogVisible = true;
    },
    feewaiver(row) {
      this.feewaiverDialogVisible = true;
      this.hisQuery = {
        borrowNo: this.agreementNo,
        row: row
      };
    },
    createConnection() {
      Utils.webSocketConnection(this.userId,result => {
        if (result.code === '000000') {
          this.getRepayAccountInfo();
          this.getAccountRepayPlan();
        }
      });
    }
  },
  components: {
    applyDialog,
    repayHistory,
    fineDialog,
    repaymentDialog,
    feewaiverDialog
  }
};
</script>
<style lang="scss" scoped>
.repayPlan-container {
  .detail {
    margin-bottom: 15px;
    .el-form-item {
      width: 33%;
      margin-right: 0;
    }
  }
  .tag {
    margin-right: 5px;
  }

  .cell-operate {
    text-overflow : initial !important;
  }
}

</style>
