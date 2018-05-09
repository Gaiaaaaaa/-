<template>
  <el-dialog :title="title" :visible.sync="repaymentDialogVisible" size="small" @close="close">
    <el-form :model="normalForm" ref="normalForm" inline label-width="120px" class="normalDialog-wrapper" style="width:100%;padding-left: 20%;">
      <el-row>
        <el-form-item label="申请扣款金额" prop="reportAmt" :rules="[
          { required: true, message: '金额不能为空'},
          { type: 'number', message: '金额必须为数字值'}
        ]">
          <!-- 判断 ： -->
          <el-input v-model.number="normalForm.reportAmt" size="small"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="扣款渠道"  prop="thirdType" :rules="[
          { required: true, message: '请选择扣款渠道', trigger: 'change' }
        ]">
          <el-select v-model="normalForm.thirdType" value-key="id" size="small" placeholder="请选择扣款渠道">
            <el-option v-for="item in repaymentChannels" :key="item.id" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <h4>温馨提示：</h4>
      <p>1、富友当月扣款失败（余额不足）总次数{{repaymentFieldAccount.fyCurplusCnt}}次</p>
      <p>2、先锋当日允许扣款失败（余额不足）总次数{{repaymentFieldAccount.xfCurplusCnt}}次剩余次数：{{repaymentFieldAccount.xfReportCntInDay}}次</p>
      <p>3、
        <el-button type="text" @click="routeXf" size="small">查看先锋渠道扣款限额</el-button>
      </p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm" size="small">确 定</el-button>
      <el-button @click="close" size="small">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  repaymentChannelFn,
  repaymentFieldAccountFn,
  repaymentFn
} from "@/api/queryAccount";
import Utils from '@/utils/common';
export default {
  props: {
    reportType: {
      type: Number,
      default: NaN
    },
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    termNo: {
      type: Number,
      default: ""
    },
    refundObj: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.agreementNo = this.$route.params.accountId;
    this.getRepaymentChannels();
    this.getFieldAccount();
    console.log(this.visible);
  },
  data() {
    return {
      repaymentDialogVisible: this.visible,
      normalForm: {
        agreementNo: this.$route.params.accountId,
        reportType: this.reportType,
        reportAmt: "",
        thirdType: "",
        termNo: this.termNo
      },
      repaymentChannels: {},
      repaymentFieldAccount: {}
      // rules: {
      //   reportAmt: [{ message: "输入金额不能大于本期剩余应还款额", trigger: "blur" }, {}]
      // }
    };
  },
  methods: {
    //获取还款渠道
    getRepaymentChannels() {
      repaymentChannelFn(this.agreementNo)
        .then(res => {
          this.repaymentChannels = res.data;
        })
        .catch(err => {
          Utils.error(err.msg)
        });
    },
    //获取扣款详情
    getFieldAccount() {
      repaymentFieldAccountFn(this.agreementNo)
        .then(res => {
          this.repaymentFieldAccount = res.data;
          console.log(this.repaymentFieldAccount);
        })
        .catch(err => {
          Utils.error(err.msg)
        });
    },
    //提交表单接口
    postRepayment() {
      let reportType = this.reportType; //判断点击的是哪一个dialog
      let reportAmt = this.normalForm.reportAmt; //默认v-module值
      let surplusAmt = this.refundObj.surplusAmt; //剩余应还款额
      let surplusResidueAmt = this.refundObj.surplusResidueAmt; //剩余应还罚息'
      switch (reportType) {
        case 1:
        case 2:
          if (reportAmt > surplusAmt) {
            Utils.error("输入金额不能大于本期剩余应还款额！");
            return;
          }
          break;
        case 4:
          if (reportAmt > surplusResidueAmt) {
            Utils.error("输入金额不能大于本期剩余应还罚息！");
            return;
          }
          break;
        default:
          Utils.error("未知还款类型！");
          return;
      }
      console.log(this.normalForm);
      repaymentFn(this.normalForm)
        .then(res => {
          Utils.success("还款申请成功！");
        })
        .catch(err => {
          Utils.success("还款申请失败！");
        });
    },
    //关闭
    close() {
      this.repaymentDialogVisible = false;
      this.$emit("close");
    },
    //确定
    confirm() {
      this.$refs['normalForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认申请扣款?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postRepayment();
            this.close();
          }).catch(() => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //路由事件
    routeXf() {
      window.open("#/xfReportLimit");
    }
    //逾期还款扣款校验
  }
};
</script>
<style lang="scss" scoped>
.repayPlan-container {
  .normalDialog-wrapper {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
