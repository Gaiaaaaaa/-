<template>
  <transition name= "modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 700px;">
          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{bankName ? '更换开户银行卡' : '更换还款银行卡'}}</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>
          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！" style="min-height: 340px;line-height: 30px;" >
            <slot name="body">
              <el-form class="form-container" :model="changeBankCardQuery" :rules="rules"  ref="changeBankCardQuery" label-position="top">
                <el-form-item label="原生银行卡" prop="custName">
                  <el-input v-model="itemData.bankAcct" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新银行卡" prop="bankCard">
                  <el-input v-model="changeBankCardQuery.bankCard" placeholder="请输入卡号" size="small" ></el-input>
                </el-form-item>

                <el-form-item label="新手机号码" prop="mobile">
                  <el-input v-model="changeBankCardQuery.mobile" placeholder="请输入卡号" size="small" ></el-input>
                </el-form-item>

                <el-form-item prop="bankCode" label="开户银行">
                  <el-select filterable value-key="id" clearable v-model="changeBankCardQuery.bankCode" placeholder="请选择">
                    <el-option
                      v-for="item in bankOptions"
                      :key="item.dictDataValue"
                      :label="item.dictDataValue"
                      :value="item.dictDataKey">
                    </el-option>
                  </el-select>
                </el-form-item>

              </el-form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common';
  import { changeBankCard } from '@/api/bank-card'
  export default {
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        bankName:true,
        submitLoading: false,
        getDataLoading: false,
        managerId: '',
        managerList: [],
        bankOptions: [],
        changeBankCardQuery: {
          basicCustId: this.itemData.basicCustId,
          bankCard: '',
          bankCode: '',
          mobile: '',
          thirdTypeId: ''
        },
        rules: {
          bankCard: [
             { required: true, message: '请输入新的银行卡号', trigger: 'blur' }
           ],
          mobile: [
            { required: true, message: '请输入新的手机号码', trigger: 'blur' }
          ],
          bankCode: [
            { required: true, message: '请选择开户银行', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
      Utils.getDictData('THIRD_CARD_TYPE', data => {
        this.bankOptions = data
      })
    },
    methods: {
      submit() {
        this.$refs['changeBankCardQuery'].validate((valid) => {
          if (valid) {
            changeBankCard(this.changeBankCardQuery).then(response => {
              Utils.success(response.msg)
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .modal-container{
    width: 30%;
    height: auto;
  }

</style>
