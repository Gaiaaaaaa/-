<template>
  <div>
    <el-dialog title="费用免除" :visible.sync="feewaiverDialogVisible" size="small" @close="close">
      <el-form :model="feewaiverForm" ref="feewaiverForm" label-width="120px" class="normalDialog-wrapper">
        <el-row>
          <el-form-item label="剩余应还罚息">
            <el-input v-model="feewaiverForm.restfine" size="small" readonly="readonly"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="减免金额" prop="freeAmount" :rules="[{ required: true, message: '请输入减免金额'}]">
            <el-input v-model="feewaiverForm.freeAmount" size="small"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="减免原因" prop="freeCauses" :rules="[{ required: true, message: '减免原因不能为空'}]">
            <el-input type="textarea" v-model="feewaiverForm.freeCauses"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
        <el-button @click="close" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { coastExempt } from '@/api/queryAccount';
  import Utils from '@/utils/common';
  export default {
    props: ['query'],
    data() {
      return {
        feewaiverDialogVisible: true,
        feewaiverForm: Object.assign({
          freeAmount: '',
          restfine: this.query.row.surplusResidueAmt,
          freeCauses: '',
          repayPeriod:this.query.row.termNo
        }, this.query)
      }
    },
    methods: {
      getFeewaiverData() {
        var formData = {
          'borrowNo':this.feewaiverForm.borrowNo,        //借款编号
          'repayPeriod':this.feewaiverForm.repayPeriod, //期数
          'freeAmount':this.feewaiverForm.freeAmount,   //减免金额
          'freeCauses':this.feewaiverForm.freeCauses    //减免原因
        };
        coastExempt(formData).then((res) => {
          Utils.success(res.data);
          this.$emit('refresh');
          this.close();
        }).catch((err) => {
          Utils.error(err.data);
        })
      },
      close: function() {
        this.feewaiverDialogVisible = false
        this.$emit('close');
      },
      submitForm: function() {
        this.postFreePanal();
      },
      postFreePanal: function(){
        let restfine = this.feewaiverForm.restfine;//罚息金额
        let freeAmount = this.feewaiverForm.freeAmount;//减免金额
        let freeCauses = this.feewaiverForm.freeCauses;//减免原因

        if(!freeAmount || freeAmount == '' || freeAmount == null) {
          this.$message({
            message: "请输入减免金额！",
            type: "error"
          });
          return;
        }
        if(freeAmount > restfine) {
          this.$message({
            message: "减免金额不能大于剩余罚息金额！",
            type: "error"
          });
          return;
        }
        if(!freeCauses || freeCauses == '' || freeCauses == null) {
          this.$message({
            message: "减免原因不能为空！",
            type: "error"
          })
          return;
        }
        this.getFeewaiverData();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .repayPlan-container {
    .normalDialog-wrapper {
      width: 45%;
      margin: 0 auto;
    }
  }
</style>
