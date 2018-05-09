<template>
  <div class="order-contacts-form">
    <el-form class="form-container" :model="customerInfo" ref="orderContactsForm" label-position="right" align="bottom" v-loading="loadLoading">
      <el-row v-if="!customer.isView" class="head-container">
        <el-col :span="24">
          <el-button type="primary" @click="addContact">添加</el-button>
        </el-col>
      </el-row>
      <div v-for="(contact,index) in customerInfo.contacts" :key="contact.key">
        <el-row style="border-top: solid 1px #e0e6ed;padding: 20px 0;">
          <el-col :span="1" :offset="23" v-if="!customer.isView"><el-button type="text" @click="removeContact(contact)">删除</el-button></el-col>
        </el-row>

        <el-row :gutter="customer.fullView ? 5 : 10">
          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
            <el-form-item label="关系" :key="contact.key"
                          :prop="'contacts.' + index + '.relationship'"
                          :rules="[{required: !customer.isView, message: '关系不能为空'}]">
              <el-select clearable v-model="contact.relationship" value-key="id" placeholder="请选择" :disabled="customer.isView">
                <el-option
                  v-for="item in relationshipOptions"
                  :key="item.id"
                  :label="item.dictDataValue"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="姓名" :key="contact.key"
                          :prop="'contacts.' + index + '.name'"
                          :rules="[{required: !customer.isView, message: '姓名不能为空'}]">
              <el-input v-model.trim="contact.name" placeholder="姓名" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="证件类型" :key="contact.key" :prop="'contacts.' + index + '.idType'">
              <el-select clearable v-model="contact.idType" value-key="id" placeholder="请选择" :disabled="customer.isView">
                <el-option
                  v-for="item in IDTypeOptions"
                  :key="item.id"
                  :label="item.dictDataValue"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="customer.fullView ? 5 : 10">
          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
            <el-form-item label="证件号码" :key="contact.key" :prop="'contacts.' + index + '.idNo'" :rules="[{pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,message: '证件格式不正确！', trigger: 'blur' }]">
              <el-input v-model.trim="contact.idNo" placeholder="证件号码" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="手机" :key="contact.key"
                          :prop="'contacts.' + index + '.telephone'"
                          :rules="[{required: !customer.isView, message: '手机不能为空',trigger:'blur'},{ pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '手机格式不正确！', trigger:'blur'}]">
              <el-input v-model.trim="contact.telephone" placeholder="手机" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="固定电话"
                          :key="contact.key"
                          :prop="'contacts.' + index + '.fixedTelephone'"
                          :rules = "[{pattern:/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/, message: '电话格式不正确！', trigger: 'blur'}]">
              <el-input v-model.trim="contact.fixedTelephone" placeholder="固定电话" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="customer.fullView ? 5 : 10">
          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
            <el-form-item label="联系地址" :key="contact.key"
                          :prop="'contacts.' + index + '.mailingAddress'"
                          :rules="[{required: !customer.isView, message: '联系地址不能为空'}]">
              <el-input v-model.trim="contact.mailingAddress" placeholder="联系地址" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="工作单位" :key="contact.key" :prop="'contacts.' + index + '.companyName'">
              <el-input v-model.trim="contact.companyName" placeholder="工作单位" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="单位电话" :key="contact.key" :prop="'contacts.' + index + '.businessPhoneNo'"
              :rules = "[{pattern:/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/, message: '电话格式不正确！', trigger: 'blur'}]"
            >
              <el-input v-model.trim="contact.businessPhoneNo" placeholder="单位电话" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="customer.fullView ? 5 : 10">
          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
            <el-form-item label="职务" :key="contact.key" :prop="'contacts.' + index + '.duty'">
              <el-select clearable v-model="contact.duty" value-key="id" placeholder="请选择" :disabled="customer.isView">
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
            <el-form-item label="下属人数" :key="contact.key" :prop="'contacts.' + index + '.subordinateNo'"
                          :rules = "[{ validator: validateSubordinateNo }]">
              <el-input type="number" v-model.trim.number="contact.subordinateNo" placeholder="下属人数" :readonly="customer.isView" :disabled="customer.isView"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
            <el-form-item label="单位性质" :key="contact.key" :prop="'contacts.' + index + '.businessProperty'">
              <el-select clearable v-model="contact.businessProperty" value-key="id" placeholder="请选择" :disabled="customer.isView">
                <el-option
                  v-for="item in businessPropertyOptions"
                  :key="item.id"
                  :label="item.dictDataValue"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="customer.fullView ? 5 : 10">
          <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
            <el-form-item label="是否知晓借款" :key="contact.key" :prop="'contacts.' + index + '.isKnowLoad'">
              <el-select clearable v-model="contact.isKnowLoad" value-key="value" placeholder="请选择" :disabled="customer.isView">
                <el-option
                  v-for="item in knowOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-row v-if="!customer.isView">
        <el-col :span="2" :md="customer.fullView ? {} : {offset: 2}" :lg="{offset: 2}">
          <el-form-item>
            <el-button @click="toPrevious">上一步</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" :xs="{offset: 10}" :sm="{offset: 10}" :md="customer.fullView ? {} : {offset: 7}" :lg="{offset: 6}">
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
  import { submitContacts, loadContactsInfo } from '@/api/order'
  import Utils from '@/utils/common'

  const defaultContact = {
    relationship: null,
    idType: {},
    name: '',
    idNo: '',
    id: '',
    telephone: '',
    fixedTelephone: '',
    mailingAddress: '',
    companyName: '',
    businessPhoneNo: '',
    duty: {},
    subordinateNo: NaN,
    businessProperty: {},
    isKnowLoad: ''
  }
  export default {
    name: 'order-contacts',
    props: ['customer'],
    data() {
      return {
        list: null,
        submitLoading: false,
        loadLoading: false,
        customerInfo: {
          contacts: []
        },
        relationshipOptions: [],
        IDTypeOptions: [],
        dutyOptions: [],
        businessPropertyOptions: [],
        knowOptions: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }]
      }
    },
    computed: {
      customerRenew() {
        // 重新计算属性
        var obj = {}
        var list = []
        this.customerInfo.contacts.forEach(item => {
          list.push(Object.assign(item, {
            relationshipId: item.relationship.id,
            relationshipValue: item.relationship.dictDataValue,
            idTypeId: item.idType.id || '',
            idTypeValue: item.idType.dictDataValue || '',
            dutyId: item.duty.id || '',
            dutyValue: item.duty.dictDataValue || '',
            businessPropertyId: item.businessProperty.id || '',
            businessPropertyValue: item.businessProperty.dictDataValue || ''
          }))
        })
        obj.list = list
        obj.customerId = this.customer.customerId
        obj.orderId = this.customer.orderId
        return obj
      }
    },
    created() {
      Utils.getDictData('RELATIONSHIP', data => {
        this.relationshipOptions = data
      })
      Utils.getDictData('PC_CERTIFICATE_TYPE', data => {
        this.IDTypeOptions = data
      })
      Utils.getDictData('DUTY', data => {
        this.dutyOptions = data
      })
      Utils.getDictData('BUSINESS_PROPERTY', data => {
        this.businessPropertyOptions = data
      })

      if (this.customer && this.customer.customerId) {
        this.getContacts()
      } else {
        this.customerInfo.contacts = [{
          ...defaultContact,
          key: Date.now()
        }, {
          ...defaultContact,
          key: Date.now()
        }, {
          ...defaultContact,
          key: Date.now()
        }]
      }
    },
    methods: {
      validateSubordinateNo(rule, value, callback) {
        if (value) {
          var subordinateNo = /^([1-9]\d*|[0]{1,1})$/
          if (!subordinateNo.test(value)) {
            return callback(new Error('数据不正确！'))
          }
        }
        callback()
      },
      toPrevious() {
        this.$emit('switchTab', 'loans')
      },
      toNext() {
        this.$refs['orderContactsForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            submitContacts(this.customerRenew).then(response => {
              this.customer.contacts = Object.assign({}, response.data)
              this.customer.proType = response.data.processType
              this.$emit('update:customer', this.customer)
              this.$emit('switchTab', 'occupation')
              this.submitLoading = false
              Utils.success('提交成功！')
            }).catch(error => {
              console.log(error)
              this.submitLoading = false
            })
          } else {
            return false
          }
        })
      },
      removeContact(item) {
        this.$confirm('此操作将会丢失该项数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var index = this.customerInfo.contacts.indexOf(item)
          if (index !== -1) {
            this.customerInfo.contacts.splice(index, 1)
          }
        })
      },
      addContact() {
        this.customerInfo.contacts.push({
          ...defaultContact,
          key: Date.now()
        })
      },
      getContacts() {
        this.loadLoading = true
        loadContactsInfo({
          customerId: this.customer.customerId,
          orderId: this.customer.orderId
        }).then(response => {
          const dataList = response.data.list
          if (dataList) {
            dataList.forEach(data => {
              var contact = {}
              Object.assign(contact, data)
              contact.relationship = { id: data.relationshipId }
              contact.idType = { id: data.idTypeId }
              contact.duty = { id: data.dutyId }
              contact.businessProperty = { id: data.businessPropertyId }
              contact.isKnowLoad = contact.isKnowLoad || ''
              this.customerInfo.contacts.push({
                ...contact,
                key: Date.now()
              })
            })
          } else {
            this.customerInfo.contacts = [{
              ...defaultContact,
              key: Date.now()
            }, {
              ...defaultContact,
              key: Date.now()
            }, {
              ...defaultContact,
              key: Date.now()
            }]
          }
          this.loadLoading = false
        }).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .head-container{
    margin-bottom: 15px;
  }
  .order-entering-container .el-select {
    width: 100%;
  }

  .order-entering-container .el-date-editor.el-input {
    width: 100%;
  }
</style>
