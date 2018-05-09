<template>
  <div class="order-loans-form">
    <el-form class="form-container" :model="customerInfo" ref="orderLoansForm" v-loading="loadLoading" label-position="right" align="bottom">

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="申请金额（元）" prop="applyAmount"
               :rules="[{required: !customer.isView, message: '申请金额不能为空'}, { type: 'number', message: '申请金额为数字值'}]">
            <el-input v-model.number.trim="customerInfo.applyAmount" placeholder="申请金额（元）" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="借款用途" prop="loanPurpose" :rules="[{required: !customer.isView, message: '借款用途不能为空'}]">
            <el-select clearable v-model="customerInfo.loanPurpose" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in loanPurposeOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="产品类型" prop="financeProduct" :rules="[{required: !customer.isView, message: '产品类型不能为空'}]">
            <el-select clearable v-model="customerInfo.financeProduct" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in pruductOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="申请期限" prop="deadline" :rules="[{required: !customer.isView, message: '申请期限不能为空'}]">
            <el-select clearable v-model="customerInfo.deadline" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in deadlineOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="还款方式" prop="applyRepayType" :rules="[{required: !customer.isView, message: '还款方式不能为空'}]">
            <el-select clearable v-model="customerInfo.applyRepayType" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in paymentTypeOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="还款来源" prop="repaySource" :rules="[{required: !customer.isView, message: '还款来源不能为空'}]">
            <el-select clearable v-model="customerInfo.repaySource" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in repaySourceOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="发生方式" prop="creditWay" :rules="[{required: !customer.isView, message: '发生方式不能为空'}]">
            <el-select clearable v-model="customerInfo.creditWay" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in inWayOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="渠道来源" prop="creditSource" :rules="[{required: !customer.isView, message: '渠道来源不能为空'}]">
            <el-select clearable v-model="customerInfo.creditSource" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in channelSourceOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="!customer.isView" style="margin-top:10px;">
        <el-col :span="2" :md="customer.fullView ? {} : {offset: 2}" :lg="customer.fullView ? {} : {offset: 3}">
          <el-form-item>
            <el-button @click="toPrevious">上一步</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" :xs="{offset: 10}" :sm="{offset: 10}" :md="customer.fullView ? {} : {offset: 7}" :lg="customer.fullView ? {} : {offset: 6}">
          <el-form-item>
            <el-button type="primary" v-loading="submitLoading" @click="toNext"
                       :disabled="this.customer.customerId === '' || this.customer.orderId === '' || submitLoading">{{customer.itemStatusKey === '012' || !customer.itemStatusKey ? '下一步' : '保存'}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import { submitLoansInfo, loadLoanInfo } from '@/api/order'
  import Utils from '@/utils/common'

  export default {
    name: 'order-loans',
    props: ['customer'],
    data() {
      return {
        list: null,
        submitLoading: false,
        loadLoading: false,
        customerInfo: {
          applyAmount: '',
          loanPurpose: null,
          financeProduct: null,
          deadline: null,
          applyRepayType: null,
          repaySource: null,
          creditWay: null,
          creditSource: null
        },
        loanPurposeOptions: [],
        pruductOptions: [],
        channelSourceOptions: [],
        deadlineOptions: [],
        paymentTypeOptions: [],
        repaySourceOptions: [],
        inWayOptions: []
      }
    },
    computed: {
      customerRenew() {
        // 重新计算属性
        const c = this.customerInfo
        return Object.assign(c, {
          orderId: this.customer.orderId,
          customerId: this.customer.customerId,
          loanPurposeId: c.loanPurpose.id,
          loanPurposeValue: c.loanPurpose.dictDataValue,
          financeProductId: c.financeProduct.id,
          financeProductKey: c.financeProduct.dictDataKey,
          financeProductValue: c.financeProduct.dictDataValue,
          deadlineId: c.deadline.id,
          deadlineValue: c.deadline.dictDataValue,
          applyRepayTypeId: c.applyRepayType.id,
          applyRepayTypeKey: c.applyRepayType.dictDataKey,
          applyRepayTypeValue: c.applyRepayType.dictDataValue,
          repaySourceId: c.repaySource.id,
          repaySourceValue: c.repaySource.dictDataValue,
          creditWayId: c.creditWay.id,
          creditWayValue: c.creditWay.dictDataValue,
          creditSourceId: c.creditSource.id,
          creditSourceValue: c.creditSource.dictDataValue,
        })
      }
    },
    created() {
      Utils.getDictData('LOAN_PURPOSE', data => {
        this.loanPurposeOptions = data
      })
      Utils.getDictData('LOAN_PRODUCT', data => {
        this.pruductOptions = data
      })
      Utils.getDictData('DEADLINE', data => {
        this.deadlineOptions = data
      })
      Utils.getDictData('REPAY_WAY', data => {
        this.paymentTypeOptions = data
      })
      Utils.getDictData('REPAY_SOURCE', data => {
        this.repaySourceOptions = data
      })
      Utils.getDictData('IN_WAY', data => {
        this.inWayOptions = data
      })
      Utils.getDictData('SOURCE_CHANNEL', data => {
        this.channelSourceOptions = data
      })

      if (this.customer.orderId) {
        this.getLoan()
      }
    },
    methods: {
      validateApplyAmount(rule, value, callback) {
        if (value < 20000 || value > 150000) {
          return callback(new Error('申请金额在20000~150000之间'))
        } else {
          callback()
        }
      },
      toPrevious() {
        this.$emit('switchTab', 'basic')
      },
      getLoan() {
        this.loadLoading = true
        loadLoanInfo({
          orderId: this.customer.orderId,
          customerId: this.customer.customerId
        }).then(response => {
          const data = response.data
          if (data) {
            Object.assign(this.customerInfo, data)
            Object.assign(this.customerInfo, {
              loanPurpose: data.loanPurposeId && data.loanPurposeValue ? {
                id: data.loanPurposeId,
                dictDataValue: data.loanPurposeValue
              } : null,
              financeProduct: data.financeProductId && data.financeProductValue ? {
                id: data.financeProductId,
                dictDataKey: data.financeProductKey,
                dictDataValue: data.financeProductValue
              } : null,
              deadline: data.deadlineId && data.deadlineValue ? {
                id: data.deadlineId,
                dictDataValue: data.deadlineValue
              } : null,
              applyRepayType: data.applyRepayTypeId && data.applyRepayTypeValue ? {
                id: data.applyRepayTypeId,
                dictDataKey: data.applyRepayTypeKey,
                dictDataValue: data.applyRepayTypeValue
              } : null,
              repaySource: data.repaySourceId && data.repaySourceValue ? {
                id: data.repaySourceId,
                dictDataValue: data.repaySourceValue
              } : null,
              creditWay: data.creditWayId && data.creditWayValue ? {
                id: data.creditWayId,
                dictDataValue: data.creditWayValue
              } : null,
              creditSource: data.creditSourceId && data.creditSourceValue ? {
                id: data.creditSourceId,
                dictDataValue: data.creditSourceValue
              } : null
            })
          }
          this.loadLoading = false
        }).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      },
      toNext() {
        this.$refs['orderLoansForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            submitLoansInfo(this.customerRenew).then(response => {
              this.submitLoading = false
              this.customer.loans = Object.assign({}, response.data)
              this.customer.proType = response.data.processType
              this.$emit('update:customer', this.customer)
              this.$emit('switchTab', 'contacts')
              Utils.success('提交成功！')
            }).catch(error => {
              console.log(error)
              this.submitLoading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .order-entering-container .el-select {
    width: 100%;
  }

  .order-entering-container .el-date-editor.el-input {
    width: 100%;
  }
</style>
