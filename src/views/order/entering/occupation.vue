<template>
  <div class="order-basic-form">
    <el-form class="form-container" :model="customerInfo" ref="orderOccupationForm" v-loading="loadLoading" label-position="right" align="bottom" :rules="rules2">
      <el-row>
        <el-col :span="24">
          <div class="order-entering-container-header">企业信息</div>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="企业名称" prop="companyName" :rules="[{required: !customer.isView, message: '企业名称不能为空'}]">
            <el-input v-model.trim="customerInfo.companyName" placeholder="企业名称" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="企业所在地" prop="mailingCity" :rules="[{required: !customer.isView, message: '企业所在地不能为空'}]">
            <el-cascader clearable
              :options="cityOptions"
              :props="props"
              :disabled="customer.isView"
              filterable
              v-model="customerInfo.mailingCity"
            ></el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="企业详细地址" prop="mailingAddress" :rules="[{required: !customer.isView, message: '企业详细地址不能为空'}]">
            <el-input v-model.trim="customerInfo.mailingAddress" placeholder="企业详细地址" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="公司关键词" prop="companyKeyWord" :rules="[{required: !customer.isView, message: '公司关键词不能为空'}]">
            <el-input v-model.trim="customerInfo.companyKeyWord" placeholder="公司关键词" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="企业性质" prop="businessProperty">
            <el-select clearable v-model="customerInfo.businessProperty" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in businessPropertyOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="成立时间" prop="registerDateObj">
            <el-date-picker
              :editable="false"
              v-model="customerInfo.registerDateObj"
              type="date"
              placeholder="选择日期"
              :disabled="customer.isView"
              @change="registerDateChange"
              :picker-options="datePickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="经营场所" prop="businessPlace">
            <el-select clearable v-model="customerInfo.businessPlace" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in businessPlaceOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="企业类型" prop="businessType">
            <el-select clearable v-model="customerInfo.businessType" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in businessTypeOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="企业电话" prop="businessPhoneNo" :rules="[{required: !customer.isView, message: '企业电话不能为空'}, {pattern:/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/, message: '电话格式不正确！', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.businessPhoneNo" placeholder="企业电话" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="月净利润（元）" prop="monthNetProfit">
            <el-input type="number" v-model.number.trim="customerInfo.monthNetProfit" placeholder="月净利润（元）" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="员工人数（人）" prop="staffsNo">
            <el-input type="number" v-model.number.trim="customerInfo.staffsNo" placeholder="员工人数" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="企业净利润率（%）" prop="netProfitRate">
            <el-input type="number" v-model.number.trim="customerInfo.netProfitRate" placeholder="企业净利润率（%）" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="order-entering-container-header">个人职业信息</div>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="进入本单位时间" prop="workStartTimeObj">
            <el-date-picker
              :editable="false"
              v-model="customerInfo.workStartTimeObj"
              type="date"
              placeholder="选择日期"
              :readonly="customer.isView"
              :disabled="customer.isView"
              @change="workStartTimeChange"
              :picker-options="datePickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="占股比例（%）" prop="shareRate" :rules="[{ pattern: /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/, message: '占股比必须符合规则！' }]">
            <el-input type="number" v-model.number.trim="customerInfo.shareRate" placeholder="占股比例（%）" min="0" max="100" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="服务年限（年）" prop="serviceYear" :rules="[{ pattern: /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/, message: '必须大于0！' }]">
            <el-input type="number" v-model.number.trim="customerInfo.serviceYear" placeholder="服务年限（年）" min="0"   :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="职位" prop="position">
            <el-select clearable v-model="customerInfo.position" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in positionOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="职务" prop="duty">
            <el-select clearable v-model="customerInfo.duty" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in dutyOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="职称" prop="jobTitleValue" :rules="[{required: !customer.isView, message: '职称不能为空'}]">
            <el-input v-model.trim="customerInfo.jobTitleValue" placeholder="职称" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="一级行业" prop="professionFirst" :rules="[{required: true, message: '一级行业不能为空'}]">
            <el-select clearable v-model="customerInfo.professionFirst"
                       value-key="dictDataKey"
                       placeholder="请选择"
                       :disabled="customer.isView"
                       @change="firstProfessionChange">
              <el-option
                v-for="item in professionFirstOptions"
                :key="item.dictDataKey"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="二级行业" prop="professionSecond" :rules="[{required: !customer.isView, message: '二级行业不能为空'}]">
            <el-select clearable v-model="customerInfo.professionSecond"
                       value-key="dictDataKey"
                       placeholder="请选择"
                       :disabled="customer.isView"
                       @change="secondProfessionChange">
              <el-option
                v-for="item in professionSecondOptions"
                :key="item.dictDataKey"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="三级行业" prop="professionThird" :rules="[{required: !customer.isView, message: '三级行业不能为空' }]">
            <el-select clearable v-model="customerInfo.professionThird" value-key="dictDataKey" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in professionThirdOptions"
                :key="item.dictDataKey"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="发薪方式" prop="salaryType">
            <el-select clearable v-model="customerInfo.salaryType" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in salaryTypeOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="开户银行" prop="bank" :rules="[{ validator: validateRequired, trigger: 'blur' }]">
            <el-select clearable v-model.number="customerInfo.bank" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in bankOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="工资卡号" prop="salaryBankAcct" :rules="[{ validator: validateRequired, trigger: 'blur' }]">
            <el-input v-model.trim="customerInfo.salaryBankAcct" placeholder="工资卡号" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="月发薪日" prop="salaryDay">
            <el-input type="number" v-model.number.trim="customerInfo.salaryDay" placeholder="月发薪日" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="月基本薪资（元）" prop="monthBasicSalary">
            <el-input type="number" v-model.number.trim="customerInfo.monthBasicSalary" placeholder="月基本薪资（元）" min="0" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="其他收入（元）" prop="monthOtherSalary"
                        >
            <el-input type="number" v-model.number.trim="customerInfo.monthOtherSalary" placeholder="其他收入（元）" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="月总收入（元）" prop="monthTotalSalary">
            <el-input type="number" v-model.number.trim="customerInfo.monthTotalSalary" placeholder="月总收入（元）" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="!customer.isView" class="formBtn-wrapper">
        <el-col :span="2" :md="customer.fullView ? {} : {offset: 2}" :lg="{offset: 2}">
          <el-form-item>
            <el-button @click="toPrevious">上一步</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" :xs="{offset: 8}" :sm="{offset: 6}" :md="customer.fullView ? {} : {offset: 5}" :lg="{offset: 5}">
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
  import { submitOccupation, loadCompanyInfo } from '@/api/order'
  import Utils from '@/utils/common'

  export default {
    name: 'order-occupation',
    props: ['customer'],
    data() {
      var checkalSaryDay = (rule, value, callback) => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('请输入符合规则的数字值'))
        } else {
          if (value > 31 || value < 1) {
            callback(new Error('发薪日需符合规则'))
          } else {
            callback()
          }
        }
      }
      var checkMonthBasicSalary = (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('薪资不能为负'))
        } else {
          callback()
        }
      }
      return {
        rules2: {
          salaryDay: [
            { required: !this.customer.isView, message: '发薪日不能为空' },
            { validator: checkalSaryDay, trigger: 'blur' }
          ],
          monthBasicSalary: [
            { required: !this.customer.isView, message: '月基本薪资不能为空' },
            { validator: checkMonthBasicSalary, trigger: 'blur' }]
        },
        loadLoading: false,
        submitLoading: false,
        customerInfo: {
          businessProperty: {},
          registerDateObj: '',
          registerdate: '',
          businessPlace: {},
          businessType: {},
          monthNetProfit: '',
          staffsNo: '',
          netProfitRate: '',
          workStartTimeObj: '',
          workStartTime: '',
          serviceYear: '',
          mailingCity: [],
          position: {},
          duty: {},
          jobTitleValue: '',
          professionFirst: null,
          professionSecond: null,
          professionThird: null,
          salaryType: {},
          bank: {},
          salaryBankAcct: '',
          salaryDay: '',
          monthBasicSalary: '',
          monthOtherSalary: '',
          monthTotalSalary: ''
        },
        businessPropertyOptions: [],
        businessPlaceOptions: [],
        positionOptions: [],
        dutyOptions: [],
        businessTypeOptions: [],
        jobTitleOptions: [],
        salaryTypeOptions: [],
        bankOptions: [],
        professionFirstOptions: [],
        professionSecondOptions: [],
        professionThirdOptions: [],
        cityOptions: [],
        props: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        datePickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now()
          }
        }
      }
    },
    computed: {
      customerRenew() {
        // 重新计算属性
        const c = this.customerInfo
        return Object.assign(c, {
          provinceId: c.mailingCity[0],
          cityId: c.mailingCity[1],
          countryId: c.mailingCity[2],
          businessPropertyId: c.businessProperty.id || '',
          businessPropertyValue: c.businessProperty.dictDataValue || '',
          businessPlaceId: c.businessPlace.id || '',
          businessPlaceValue: c.businessPlace.dictDataValue || '',
          businessTypeId: c.businessType.id || '',
          businessTypeValue: c.businessType.dictDataValue || '',
          positionId: c.position.id || '',
          positionValue: c.position.dictDataValue || '',
          dutyId: c.duty.id || '',
          dutyValue: c.duty.dictDataValue || '',
          professionFirstId: c.professionFirst.dictDataKey || '',
          professionFirstValue: c.professionFirst.dictDataValue || '',
          professionSecondId: c.professionSecond.dictDataKey || '',
          professionSecondValue: c.professionSecond.dictDataValue || '',
          professionThirdId: c.professionThird.dictDataKey || '',
          professionThirdValue: c.professionThird.dictDataValue || '',
          salaryTypeId: c.salaryType.id || '',
          salaryTypeValue: c.salaryType.dictDataValue || '',
          bankId: c.bank.id || '',
          bankCode: c.bank.dictDataKey || '',
          bankName: c.bank.dictDataValue || '',
          customerId: this.customer.customerId,
          orderId: this.customer.orderId
        })
      }
    },
    created() {
      Utils.getDictData('BUSINESS_PROPERTY', data => {
        this.businessPropertyOptions = data
      })
      Utils.getDictData('BUSINESS_PLACE', data => {
        this.businessPlaceOptions = data
      })
      // Utils.getDictData('PROFESSION', data => {
      //   this.professionOptions = data
      // })
      Utils.getDictData('POSITION', data => {
        this.positionOptions = data
      })
      Utils.getDictData('DUTY', data => {
        this.dutyOptions = data
      })
      Utils.getDictData('JOB_TITLE', data => {
        this.jobTitleOptions = data
      })
      Utils.getDictData('SALARY_TYPE', data => {
        this.salaryTypeOptions = data
      })
      Utils.getDictData('BANK', data => {
        this.bankOptions = data
      })
      Utils.getDictData('PROFESSION_FIRST', data => {
        this.professionFirstOptions = data
        if (this.customer && this.customer.customerId) {
          this.getOccupation()
        }
      })
      Utils.getDictData('BUSINESS_TYPE', data => {
        this.businessTypeOptions = data
      })
      Utils.getCities(data => {
        this.cityOptions = data
      })
    },
    methods: {
      getOccupation() {
        this.loadLoading = true
        loadCompanyInfo({
          customerId: this.customer.customerId
        }).then(response => {
          const data = response.data
          if (data) {
            Object.assign(this.customerInfo, data)
            if (data.provinceId) {
              this.customerInfo.mailingCity = [data.provinceId, data.cityId, data.countryId]
            }
            this.customerInfo.businessProperty = { id: data.businessPropertyId }
            this.customerInfo.businessPlace = { id: data.businessPlaceId }
            this.customerInfo.businessType = { id: data.businessTypeId }
            this.customerInfo.position = { id: data.positionId }
            this.customerInfo.duty = { id: data.dutyId }
            this.customerInfo.professionFirst = data.professionFirstId ? { dictDataKey: data.professionFirstId } : null
            console.log(this.customerInfo.professionFirst)
            this.setSecondAndThird(data)
            this.customerInfo.salaryType = { id: data.salaryTypeId }
            this.customerInfo.bank = { id: data.bankId }
            this.customerInfo.workStartTimeObj = data.workStartTime ? new Date(data.workStartTime) : null
            this.customerInfo.registerDateObj = data.registerDate ? new Date(data.registerDate) : null
          }
          this.loadLoading = false
        }).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      },
      toPrevious() {
        this.$emit('switchTab', 'contacts')
      },
      toNext() {
        this.$refs['orderOccupationForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            submitOccupation(this.customerRenew).then(response => {
              this.customer.occupation = Object.assign(this.customerRenew, response.data)
              this.customer.proType = response.data.processType
              this.$emit('update:customer', this.customer)
              this.$emit('switchTab', 'credit')
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
      firstProfessionChange(item) {
        if (item && item.id) {
          Utils.getDictDataByPid(item.id, data => {
            this.professionSecondOptions = data
            this.customerInfo.professionSecond = null
          })
        }
      },
      secondProfessionChange(item) {
        if (item && item.id) {
          Utils.getDictDataByPid(item.id, data => {
            this.professionThirdOptions = data
            this.customerInfo.professionThird = null
          })
        }
      },
      validateRequired(rule, value, callback) {
        const salaryType = this.customerInfo.salaryType.dictDataKey
        if ((salaryType === 'SALARY_TYPE_0' || salaryType === 'SALARY_TYPE_2') && !value) {
          callback(new Error('请输入该值'))
        }
        callback()
      },
      workStartTimeChange(val) {
        this.customerInfo.workStartTime = val
      },
      registerDateChange(val) {
        this.customerInfo.registerdate = val
      },
      setSecondAndThird(data) {
        const dataList = this.professionFirstOptions
        if (dataList) {
          var firstId = this.getProfessionIdByKey(dataList, data.professionFirstId)
          Utils.getDictDataByPid(firstId, secondData => {
            this.professionSecondOptions = secondData
            var secondId = this.getProfessionIdByKey(secondData, data.professionSecondId)
            this.customerInfo.professionSecond = data.professionSecondId ? { dictDataKey: data.professionSecondId } : null
            Utils.getDictDataByPid(secondId, thirdData => {
              this.professionThirdOptions = thirdData
              this.customerInfo.professionThird =  data.professionThirdId ? { dictDataKey: data.professionThirdId } : null
            })
          })
        }
      },
      getProfessionIdByKey(dataList, key) {
        let id
        if (dataList) {
          dataList.forEach(profession => {
            if (profession.dictDataKey === key) {
              id = profession.id
            }
          })
        }
        return id
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .order-entering-container .el-cascader {
    width: 100%;
  }
  .order-entering-container .el-select {
    width: 100%;
  }
  .order-entering-container .el-date-editor.el-input {
    width: 100%;
  }
  .formBtn-wrapper {
    margin-top: 20px;
  }
</style>
