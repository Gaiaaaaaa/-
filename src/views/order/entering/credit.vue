<template>
  <div class="order-credit-form">
    <el-form class="form-container" :rules="rules" :model="busiCustCreditinfo" ref="orderCreditForm" label-position="top" v-loading="loadLoading">

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model.trim="busiCustCreditinfo.age"  placeholder="年龄" :disabled="Boolean(busiCustCreditinfo.age || customer.isView)"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="受薪分类" prop="salariedType" :rules="[{required: !customer.isView, message: '受薪分类不能为空'}]">
            <el-select clearable v-model="busiCustCreditinfo.salariedType" value-key="id" placeholder="请选择" :disabled="customer.isView" >
              <el-option
                v-for="item in salariedOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item.dictDataKey">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="工作年限" prop="workYear">
            <el-input type="number" v-model.number.trim="busiCustCreditinfo.workYear" placeholder="工作年限" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="占股比例（%）" prop="stockRatio">
            <el-input type="number" v-model.number.trim="busiCustCreditinfo.stockRatio" :maxlength="4" min="0" max="100" step="0.1" placeholder="占股比例" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10" type="flex" align="bottom" style="margin-top:10px;">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="客户公司工商网信息" prop="custCompanyInfo">
            <el-switch
              v-model="busiCustCreditinfo.custCompanyInfo"
              :disabled="customer.isView"
              on-text="有"
              off-text="无"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10" type="flex" align="bottom">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="综合征信记录" prop="cprhsiveCreditRecord">
            <el-switch
              v-model="busiCustCreditinfo.cprhsiveCreditRecord"
              :disabled="customer.isView"
              on-text="有"
              off-text="无"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="征信获取时间" prop="creditTime">
            <el-date-picker
              v-model="busiCustCreditinfo.creditTime"
              type="date"
              placeholder="选择征信获取时间"
              :readonly="customer.isView"
              :disabled="customer.isView"
              :picker-options="creditTimePickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10" type="flex" align="bottom" style="margin-top:10px;">
        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 2}" :lg="customer.fullView ? {} : {span: 6, offset: 3}">
          <el-form-item label="征信记录类型" prop="recordType">
            <el-radio class="radio" v-model="busiCustCreditinfo.recordType" label="1" :disabled="customer.isView">详版</el-radio>
            <el-radio class="radio" v-model="busiCustCreditinfo.recordType" label="0" :disabled="customer.isView">简版</el-radio>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="{span: 12}" :md="customer.fullView ? {} : {span: 8, offset: 1}" :lg="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="逾期信息" prop="overdueInfo">
            <el-select clearable v-model="busiCustCreditinfo.overdueInfo" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in overdueOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item.dictDataKey">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="!customer.isView">
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
  import { submitCredit, loadCreditInfo, loadCompanyInfo } from '@/api/order'
  import Utils from '@/utils/common'

  export default {
    name: 'order-credit',
    props: ['customer'],
    data() {
      return {
        loadLoading: false,
        submitLoading: false,
        overdueOptions: [],
        salariedOptions: [],
        busiCustCreditinfo: {
          customerId: '',
          orderId: '',
          companyId: '',
          age: NaN,
          salariedType: null,
          recordType: 1,
          workYear: '',
          stockRatio: '',
          custCompanyInfo: '',
          cprhsiveCreditRecord: '',
          creditTime: '',
          overdueInfo: ''
        },
        creditTimePickerOptions: {
          disabledDate(time) {
            const before = Utils.dateAdd('d', -15, new Date())
            return time.getTime() > Date.now() || time.getTime() < before.getTime()
          }
        },
        rules: {
          workYear: [
            { validator: this.checkWorkYear, trigger: 'blur' },
            { pattern: /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/, message: '工作年限不能小于0！' }
          ],
          stockRatio: [
            { validator: this.checkStockRatio, trigger: 'blur' },
            { pattern: /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/, message: '占股比必须符合规则！' }
          ],
          creditTime: [
            { validator: this.checkCreditTime, trigger: 'blur' }
          ]
        }
      }
    },
    updated() {
      if (this.customer) {
        this.busiCustCreditinfo.customerId = this.customer.customerId
        this.busiCustCreditinfo.orderId = this.customer.orderId
        if (this.customer.basic) {
          this.busiCustCreditinfo.age = Utils.getAgeByBirthday(this.customer.basic.birthday)
        }
        if (this.customer.occupation) {
          this.busiCustCreditinfo.stockRatio = this.customer.occupation.shareRate
        }
      }
    },
    created() {
      Utils.getDictData('OVERDUE_INFO', data => {
        this.overdueOptions = data
      })
      Utils.getDictData('SALARIED_TYPE', data => {
        this.salariedOptions = data
      })

      if (this.customer && this.customer.orderId) {
        this.getCredit()
      }
      if (this.customer && this.customer.customerId) {
        this.getCompanyId()
      }
    },
    methods: {
      getCompanyId() {
        this.loadLoading = true
        loadCompanyInfo({
          customerId: this.customer.customerId
        }).then(response => {
          const data = response.data
          if (data) {
            this.busiCustCreditinfo.companyId = data.companyId
          }
          this.loadLoading = false
        }).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      },
      toPrevious() {
        this.$emit('switchTab', 'occupation')
      },
      toNext() {
        this.$refs['orderCreditForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            submitCredit(this.busiCustCreditinfo).then(response => {
              this.customer.occupation = Object.assign(this.busiCustCreditinfo, response.data)
              this.customer.proType = response.data.processType
              this.$emit('update:customer', this.customer)
              this.$emit('switchTab', 'attachment')
              this.submitLoading = false
              Utils.success('提交成功！')
            }).catch(error => {
              if(error.code === '111111') {
                this.$alert(error.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push({ path: '/order/list'})
                  }
                })
              }
              this.submitLoading = false
            })
          } else {
            return false
          }
        })
      },
      getCredit() {
        this.loadLoading = true
        loadCreditInfo({
          orderId: this.customer.orderId,
          customerId: this.customer.customerId
        }).then(response => {
          const data = response.data
          if (data) {
            Object.assign(this.busiCustCreditinfo, data)
            // this.busiCustCreditinfo.deadline = { id: data.deadlineId }
          }
          this.loadLoading = false
        }).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      },
      checkWorkYear(rule, value, callback) {
        if (!Utils.isNotEmpty(value)) {
          callback(new Error('工作年限不能为空'))
        }
        if (value > 150 || value < 1) {
          callback(new Error('工作年限需符合规则'))
        } else {
          callback()
        }
        // if (this.busiCustCreditinfo.salariedType) {
        //   if (this.busiCustCreditinfo.salariedType === '00') {
        //     if (!Utils.isNotEmpty(value)) {
        //       callback(new Error('工作年限不能为空'))
        //     }
        //   }
        // }
      },
      checkStockRatio(rule, value, callback) {
        if (this.busiCustCreditinfo.salariedType) {
          if (this.busiCustCreditinfo.salariedType === '01') {
            if (!Utils.isNotEmpty(value)) {
              callback(new Error('占股比例不能为空'))
            }
          }
        }
        callback()
      },
      checkCreditTime(rule, value, callback) {
        if (this.busiCustCreditinfo.cprhsiveCreditRecord === '1') {
          if (!Utils.isNotEmpty(value)) {
            callback(new Error('征信获取时间不能为空'))
          }
        }
        callback()
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

  .el-form-item {
    margin-bottom: 20px;
  }
</style>
