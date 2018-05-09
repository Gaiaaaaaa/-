<template>
  <el-dialog title="提前结清申请" :visible.sync="applyDialogVisible" size="small" @close="close">
    <el-form :model="applyForm" inline label-width="120px" class="applyDialog-wrapper">
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="剩余本金">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="减免本金">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剩余利息">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="减免利息">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剩余罚息">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="减免罚息">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提前结清合计">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="减免合计">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提前结清违约金">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请扣款金额">
            <el-input v-model="applyForm.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="扣款渠道">
            <el-select v-model="applyForm.region" placeholder="请选择活动区域" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>温馨提示：</h4>
      <p>1、富友当月扣款失败次数：0</p>
      <p>2、先锋当日扣款失败-余额不足总次数3次，剩余次数：3</p>
      <p>3、查看先锋渠道扣款限额</p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" @click="confirm" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    applyVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      applyForm: {
        name: "",
        region: ""
      },
      applyDialogVisible: this.applyVisible
    };
  },
  methods: {
    close() {
      this.applyDialogVisible = false;
      this.$emit("close");
    },
    confirm() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.repayPlan-container {
  .applyDialog-wrapper {
    width: 75%;
    margin: 0 auto;
  }
}
</style>