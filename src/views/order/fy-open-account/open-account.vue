<template>
  <transition name= "modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 500px;" v-loading="getDataLoading">
          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isFuYou ? '富友开户' : '添加银行卡'}}</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>
          <div class="modal-body" style="min-height: 310px;" >
            <slot name="body">
              <el-form :model="accountForm" label-position="top">
                <el-form-item label="客户姓名" prop="custName">
                  <el-input v-model="accountForm.custName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="cardId">
                  <el-input v-model="accountForm.cardId" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankCardNo">
                  <el-input v-model="accountForm.bankCardNo" auto-complete="off" placeholder="银行卡号"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" prop="bank">
                  <el-select @change="changgeBank" filterable value-key="id" clearable v-model="accountForm.bank" placeholder="请选择">
                    <el-option
                      v-for="item in bankOptions"
                      :key="item.dictDataValue"
                      :label="item.dictDataValue"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="bankBranchName" label="开户支行">
                  <el-input v-model="accountForm.bankBranchName"></el-input>
                </el-form-item>
                <el-form-item label="开户地区" prop="provinceCityArr">
                  <el-cascader clearable
                               :options="cityOptions"
                               :props="props"
                               v-model="accountForm.provinceCityArr"
                  ></el-cascader>
                </el-form-item>
                <el-form-item prop="telephone" label="银行预留手机号">
                  <el-input v-model="accountForm.telephone"></el-input>
                </el-form-item>
                <el-form-item v-show="!isFuYou" prop="identifyingCode" label="验证码">
                  <div style="display: flex;">
                    <el-input v-model="accountForm.identifyingCode"></el-input>
                    <el-button @click="sendMessage" :loading="sendSmsLoading" :disabled="btnSendSmsDisabled" type="primary">{{btnSendSmsText}}</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">确认开户</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common'
  import { sendSms, getOpenAnAccount } from '@/api/order'

  export default {
    props: {
      data: {
        type: Object,
        default: {}
      },
      isFuYou: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        sendSmsLoading: false,
        btnSendSmsDisabled: false,
        bankOptions: [],
        cityOptions: [],
        btnSendSmsText: '获取验证码',
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        accountForm: {
          basicCustId: '',
          custName: this.data.custName,
          cardId: this.data.custName,
          cardType: '',
          bank: null,
          provinceCityArr: [],
          bankCardNo: '',
          telephone: '',
          bankAreaCode: '',
          identifyingCode: '',
          gender: this.data.gender || '',
          thirdTypeId: this.isFuYou ? '380000' : '380004'
        }
      }
    },
    created() {
      if (this.isFuYou) {
        this.accountForm.basicCustId = this.data.custId
        this.accountForm.cardId = this.data.certNo
      } else {
        this.accountForm.basicCustId = this.data.basicCustId
        this.accountForm.cardId = this.data.certificateNo
      }
      Utils.getDictData('THIRD_CARD_TYPE', data => {
        this.bankOptions = data
      })

      Utils.getDictProvinceCities(data => {
        this.cityOptions = data
      })

      Utils.getDictDataById(this.data.certTypeId, data => {
        this.accountForm.cardType = data.dictDataKey
      })
    },
    methods: {
      submit() {
        this.getDataLoading = true
        this.accountForm.cityId = this.accountForm.provinceCityArr[1] || ''
        getOpenAnAccount(this.accountForm).then(response => {
          Utils.success(response.msg)
          this.getDataLoading = false
          this.$emit('refresh')
          this.$emit('close')
        }).catch(error => {
          console.log(error)
          this.getDataLoading = false
        })
      },
      changgeBank(val) {
        this.accountForm.bankAreaCode = val.dictDataKey
        this.accountForm.bankAreaCode = val.dictDataKey
        this.accountForm.fyBankCode = val.dictDataKey
        this.accountForm.bankName = val.dictDataValue
      },
      sendMessage() {
        this.countdown()
        this.sendSmsLoading = true
        sendSms(this.accountForm).then(response => {
          this.sendSmsLoading = false
          this.countdown()
          Utils.success('发送成功')
        }).catch(error => {
          console.log(error)
          this.sendSmsLoading = false
        })
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
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader {
    width: 100%;
  }
  .modal-container{
    width: 30%;
    height: auto;
  }
  .el-select {
    width: 100%;
  }
</style>
