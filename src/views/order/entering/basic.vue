<template>
  <div class="order-basic-form" v-loading="loadLoading">
    <el-form class="form-container" v-loading="certificateNoLoading" :model="customerInfo" ref="orderBasicForm" label-position="right" align="bottom">
      <el-row>
        <el-col :span="24">
          <div class="order-entering-container-header">三要素</div>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 2}">
          <el-form-item label="客户姓名" prop="custName" :rules="[{required: !customer.isView, message: '客户姓名不能为空'}]">
            <el-input v-model.trim="customerInfo.custName" placeholder="客户姓名"
                      :disabled="customer.isView || disableSth"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="证件类型" prop="certificateType" :rules="[{required: !customer.isView, message: '证件类型不能为空'}]">
            <el-select clearable v-model="customerInfo.certificateType" value-key="id"
                       :disabled="customer.isView || disableSth" placeholder="请选择">
              <el-option
                v-for="item in IDTypeOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}" :md="customer.fullView ? {} : {span: 6, offset: 1}">
          <el-form-item label="证件号" prop="certificateNo"
                        :rules="[{required: !customer.isView, message: '证件号不能为空'}, { validator: checkID, trigger: 'blur' }]">
            <el-input v-model.trim="customerInfo.certificateNo" placeholder="证件号"
                      :disabled="customer.isView || disableSth"
                      @blur="loadDataByNameAndNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10" type="flex" align="bottom">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="手机" prop="telephone"  :rules="[{required: !customer.isView, message: '手机号码不能为为空'},{pattern:/^1\d{10}$/, message: '输入正确的手机号', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.telephone" placeholder="手机" :disabled="customer.isView || disableSth"></el-input>
          </el-form-item>
        </el-col>

        <!--<el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" v-loading="searchLoading" @click="blacklistVerification">黑名单验证</el-button>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >-->
          <!--<el-form-item label="客户新增手机号">-->
            <!--<el-input v-model="customerInfo.user" placeholder="客户新增手机号"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="order-entering-container-header">基本信息</div>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="性别" prop="gender">
            <el-select clearable v-model="customerInfo.gender" placeholder="请选择" :disabled="hasBirthdayAndAge || customer.isView" value-key="value">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="出生日期" prop="birthdayDate">
            <el-date-picker
              v-model="customerInfo.birthdayDate"
              type="date"
              placeholder="选择日期"
              @change="birthdayChange"
              :disabled="hasBirthdayAndAge || customer.isView"
              :picker-options="birthdayPickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="民族" prop="nation">
            <el-select clearable v-model="customerInfo.nation" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in nationOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="学历" prop="education" :rules="[{required: !customer.isView, message: '学历不能为空'}]">
            <el-select clearable v-model="customerInfo.education" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in educationOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="学位" prop="degree">
            <el-select clearable v-model="customerInfo.degree" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in degreeOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="婚姻状态" prop="marry" :rules="[{required: !customer.isView, message: '婚姻状态不能为空'}]">
            <el-select clearable v-model="customerInfo.marry" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in marryOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="职业" prop="profession" :rules="[{required: !customer.isView, message: '职业不能为空'}]">
            <el-select clearable v-model="customerInfo.profession" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in professionOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="国籍" prop="nationality">
            <el-select clearable v-model="customerInfo.nationality" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in nationalityOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="户籍地址" prop="registeredPermanentCity" :rules="[{required: !customer.isView, message: '户籍地址不能为空'}]">
            <el-cascader clearable
              :options="cityOptions"
              :props="props"
              :disabled="customer.isView"
              filterable
              v-model="customerInfo.registeredPermanentCity"
            ></el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="户籍详细地址" prop="registeredPermanentResidence" :rules="[{required: !customer.isView, message: '户籍详细地址不能为空'}]">
            <el-input v-model.trim="customerInfo.registeredPermanentResidence" placeholder="户籍详细地址" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="户籍邮编" prop="residencePostcode"
                :rules="[
                  {required: !customer.isView, message: '户籍邮编不能为空'},
                  {pattern:/^[1-9][0-9]{5}$/, message: '请输入正确格式的邮编', trigger: 'blur' }
                 ]">
            <el-input v-model.trim="customerInfo.residencePostcode" placeholder="户籍邮编" :readonly="customer.isView"  :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="现居住地" prop="mailingAddressCity" :rules="[{required: !customer.isView, message: '现居住地不能为空'}]">
            <el-cascader clearable
              :options="cityOptions"
              :props="props"
              :disabled="customer.isView"
              filterable
              v-model="customerInfo.mailingAddressCity"
            ></el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="居住地详细地址" prop="mailingAddress" :rules="[{required: !customer.isView, message: '居住地详细地址不能为空'}]">
            <el-input v-model.trim="customerInfo.mailingAddress" placeholder="居住地详细地址" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="居住地邮编" prop="mailingAddressPostcode"
               :rules="[
                 {required: !customer.isView, message: '居住地邮编不能为空'},
                 {pattern:/^[1-9][0-9]{5}$/, message: '请输入正确格式的邮编', trigger: 'blur'}
                 ]">
            <el-input v-model.trim="customerInfo.mailingAddressPostcode" placeholder="居住地邮编" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="order-entering-container-header">附加信息</div>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="电子邮箱" prop="email"  :rules="[{pattern:/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/, message: '邮箱格式不正确', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.email" placeholder="电子邮箱" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="固定电话" prop="fixedTelephone"  :rules="[{pattern:/^(\d{3,4}\-?)?\d{7,8}$/, message: '电话格式不正确', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.fixedTelephone" placeholder="固定电话" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="户籍情况" prop="householdRegister">
            <el-select clearable v-model="customerInfo.householdRegister" value-key="dictDataKey" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in censusTypeOptions"
                :key="item.dictDataKey"
                :label="item.dictDataValue"
                :value="item.dictDataKey">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="每月家庭支出（元）" prop="monthlyFamilySpending"  :rules="[{pattern:/^[0-9]*$/, message: '请填写数字值', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.monthlyFamilySpending" placeholder="每月家庭支出" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="个人年收入（元）" prop="personalAnnualIncome"  :rules="[{pattern:/^[0-9]*$/, message: '请填写数字值', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.personalAnnualIncome" placeholder="个人年收入" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="子女数" prop="children">
            <el-select clearable v-model="customerInfo.children" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in childrenOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="支付宝" prop="alipayAcct"  :rules="[{pattern:/^[0-9A-Za-z][\.-_0-9A-Za-z]*/, message: '不能输入中文字符', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.alipayAcct" placeholder="支付宝" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="QQ" prop="qq"  :rules="[{pattern:/^[0-9]*$/, message: '只能输入数字', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.qq" placeholder="QQ" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="微信账号" prop="wechat"  :rules="[{pattern:/^[0-9A-Za-z][\.-_0-9A-Za-z]*/, message: '不能输入中文字符', trigger: 'blur'}]">
            <el-input v-model.trim="customerInfo.wechat" placeholder="微信账号" :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 2}"  >
          <el-form-item label="客户渠道" prop="custChannel" :rules="[{required: !customer.isView, message: '客户渠道不能为空'}]">
            <el-select clearable v-model="customerInfo.custChannel" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in custChannelOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="本地房产" prop="localHouseProperty">
            <el-select clearable v-model="customerInfo.localHouseProperty" value-key="dictDataKey" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in localPropertyOptions"
                :key="item.dictDataKey"
                :label="item.dictDataValue"
                :value="item.dictDataKey">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="{span: 8}"  :md="customer.fullView ? {} : {span: 6, offset: 1}"  >
          <el-form-item label="居住状况" prop="resideStatus">
            <el-select clearable v-model="customerInfo.resideStatus" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in resideStatusOptions"
                :key="item.id"
                :label="item.dictDataValue"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="order-entering-container-header">指定归属</div>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="20" :xs="{offset: 0}"
                :sm="customer.fullView ? { span: 24 } : {offset: 0}"
                :md="customer.fullView ? { span: 24 } : {offset: 2}"
                :lg="customer.fullView ? { span: 24 } : {offset: 2}">
          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="customerInfo.remark" type="textarea"
                      :autosize="{ minRows: 2, maxRows: 8}"
                      placeholder="备注"
                      :readonly="customer.isView" :disabled="customer.isView"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="customer.fullView ? 5 : 10">
        <el-col :span="8" :xs="{span: 8, offset: 0}"
                :sm="customer.fullView ? { span: 24 } : {offset: 0}"
                :md="customer.fullView ? { span: 24 } : {span: 6, offset: 2}"
                :lg="customer.fullView ? { span: 24 } : {offset: 2}">
          <el-form-item label="客户经理" prop="creatorObj" :rules="[{required: !customer.isView, message: '客户经理不能为空'}]">
            <el-select clearable v-model="customerInfo.creatorObj" value-key="id" placeholder="请选择" :disabled="customer.isView">
              <el-option
                v-for="item in customerManageOptions"
                :key="item.id"
                :label="item.userName + ' - ' + item.jobNumber"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="!customer.isView" style="margin-top:10px">
        <el-col :span="24" :offset="2">
          <el-form-item>
            <el-button v-if="!showSubmit" type="primary" v-loading="submitLoading" @click="toNext" :disabled="submitLoading">{{customer.itemStatusKey === '012' || !customer.itemStatusKey ? '下一步' : '保存'}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import { submitBasicInfo, getCustomerManage, loadBasicInfo, loadBasicInfoById, findOrderDuplicate } from '@/api/order'
  import Utils from '@/utils/common'
  import IDValidator from 'id-validator'

  export default {
    name: 'order-entering-basic',
    props: ['customer'],
    data() {
      return {
        blurFlag: false,
        showSubmit: false,
        loadLoading: false,
        certificateNoLoading: false,
        submitLoading: false,
        hasBirthdayAndAge: false,
        disableSth: false,
        props: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        customerInfo: {
          custName: '',
          certificateType: {
            id: 30000,
            dictDataValue: '身份证'
          },
          certificateNo: '',
          telephone: '',
          gender: '',
          birthday: '',
          birthdayDate: null,
          nation: {},
          education: null,
          degree: {},
          marry: null,
          profession: null,
          nationality: {
            id: 340001,
            dictDataValue: '中国'
          },
          registeredPermanentCity: [],
          registeredPermanentDetail: '',
          residencePostcode: '',
          mailingAddressCity: null,
          mailingAddressDetail: '',
          mailingAddressPostcode: '',
          email: '',
          fixedTelephone: '',
          householdRegister: '',
          monthlyFamilySpending: '',
          personalAnnualIncome: '',
          children: {},
          alipayAcct: '',
          qq: '',
          wechat: '',
          custChannel: null,
          localHouseProperty: '',
          resideStatus: {},
          remark: '',
          creatorObj: null
        },
        birthdayPickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now()
          }
        },
        cityOptions: [],
        IDTypeOptions: [],
        nationOptions: [],
        educationOptions: [],
        degreeOptions: [],
        marryOptions: [],
        professionOptions: [],
        nationalityOptions: [],
        censusTypeOptions: [],
        childrenOptions: [],
        custChannelOptions: [],
        localPropertyOptions: [],
        resideStatusOptions: [],
        customerManageOptions: [],
        genderOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '0',
          label: '女'
        }]
      }
    },
    computed: {
      customerRenew() {
        // 重新计算属性
        const c = this.customerInfo
        var orderId = this.customer.orderId || ''
        return Object.assign(c, {
          orderId: orderId,
          customerId: this.customer.customerId || '',
          provinceId: c.registeredPermanentCity[0] || '',
          cityId: c.registeredPermanentCity[1] || '',
          countryId: c.registeredPermanentCity[2] || '',
          resideProvinceId: c.mailingAddressCity[0] || '',
          resideCityId: c.mailingAddressCity[1] || '',
          resideCountryId: c.mailingAddressCity[2] || '',
          childrenId: c.children.id,
          childrenValue: c.children.dictDataValue,
          certificateTypeId: c.certificateType.id,
          certificateTypeValue: c.certificateType.dictDataValue,
          nationId: c.nation.id,
          nationValue: c.nation.dictDataValue,
          educationId: c.education.id,
          educationValue: c.education.dictDataValue,
          degreeId: c.degree.id,
          degreeValue: c.degree.dictDataValue,
          marryId: c.marry.id,
          marryValue: c.marry.dictDataValue,
          professionId: c.profession.id,
          professionValue: c.profession.dictDataValue,
          nationalityId: c.nationality.id,
          nationalityValue: c.nationality.dictDataValue,
          custChannelId: c.custChannel.id,
          custChannelValue: c.custChannel.dictDataValue,
          resideStatusId: c.resideStatus.id,
          resideStatusValue: c.resideStatus.dictDataValue,
          creator: c.creatorObj.id,
          creatorName: c.creatorObj.userName
        })
      }
    },
    created() {
      Utils.getDictData('PC_CERTIFICATE_TYPE', data => {
        this.IDTypeOptions = data
      })
      Utils.getDictData('NATION', data => {
        this.nationOptions = data
      })
      Utils.getDictData('EDUCATION', data => {
        this.educationOptions = data
      })
      Utils.getDictData('DEGREE', data => {
        this.degreeOptions = data
      })
      Utils.getDictData('MARRY', data => {
        this.marryOptions = data
      })
      Utils.getDictData('PROFESSION', data => {
        this.professionOptions = data
      })
      Utils.getDictData('NATIONALITY', data => {
        this.nationalityOptions = data
      })
      Utils.getDictData('CENSUS_TYPE', data => {
        this.censusTypeOptions = data
      })
      Utils.getDictData('CHILDREN', data => {
        this.childrenOptions = data
      })
      Utils.getDictData('CUST_CHANNEL', data => {
        this.custChannelOptions = data
      })
      Utils.getDictData('LOCAL_PROPERTY', data => {
        this.localPropertyOptions = data
      })
      Utils.getDictData('RESIDE_STATUS', data => {
        this.resideStatusOptions = data
      })
      Utils.getCities(data => {
        this.cityOptions = data
      })
      this.getCustomerManageData()

      if (this.customer.customerId !== '' && this.customer.orderId !== '') {
        this.loadDataById()
      }
    },
    methods: {
      birthdayChange(val) {
        this.customerInfo.birthday = val
      },
      checkID(rule, value, callback) {
        var Validator = new IDValidator()
        if (this.customerInfo.certificateType && this.customerInfo.certificateType.id === 30000) {
          if (Validator.isValid(value)) {
            const idInfo = Validator.getInfo(value)
            this.customerInfo.birthdayDate = idInfo.birth
            this.customerInfo.gender = `${idInfo.sex}`
            this.hasBirthdayAndAge = true
            callback()
          } else {
            callback(new Error('身份证输入有误'))
          }
        } else {
          this.hasBirthdayAndAge = false
          callback()
        }
      },
      getCustomerManageData() {
        getCustomerManage().then(response => {
          this.customerManageOptions = response.data
        })
      },
      toNext() {
        this.$refs['orderBasicForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            submitBasicInfo(this.customerRenew).then(response => {
              this.submitLoading = false
              this.customer.basic = this.customerInfo
              this.customer.customerId = response.data.customerId
              this.customer.orderId = response.data.orderId
              this.customer.proType = response.data.processType
              this.$emit('update:customer', this.customer)
              this.$emit('switchTab', 'loans')
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
      loadDataByNameAndNo() {
        if (this.blurFlag === false) {
          if (this.customerInfo.certificateNo) {
            this.blurFlag = true
            this.certificateNoLoading = true
            findOrderDuplicate({
              name: this.customerInfo.custName,
              idCard: this.customerInfo.certificateNo
            }).then(response => {
              this.certificateNoLoading = false
              this.idCardDuplicateInfo(response.msg, '提示')
            }).catch(error => {
              console.log(error)
              if (error.code) {
                if (error.code === '100013') {
                  this.idCardDuplicateInfo(error.msg, '提示')
                } else {
                  this.showSubmit = true
                  this.idCardDuplicateInfo(error.msg, '提示')
                }
              }
              this.certificateNoLoading = false
              this.blurFlag = false
            })
            this.loadLoading = true
            loadBasicInfo(this.customerInfo).then(this.showInfo).catch(error => {
              console.log(error)
              this.loadLoading = false
            })
          }
        }
      },
      loadDataById() {
        this.loadLoading = true
        loadBasicInfoById(this.customer.customerId).then(this.showInfo).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      },
      showInfo(response) {
        const data = response.data
        if (data) {
          if (this.customer.itemStatusKey !== '001' && this.customer.itemStatusKey !== '012') {
            this.disableSth = true
          }
          Object.assign(this.customerInfo, data)
          Object.assign(this.customerInfo, {
            certificateType: {
              id: data.certificateTypeId,
              dictDataValue:data.certificateTypeValue
            },
            creatorObj: {
              id: data.creator,
              userName:data.creatorName
            },
            custChannel: {
              id: data.custChannelId,
              dictDataValue:data.custChannelValue
            },
            nation: {
              id: data.nationId,
              dictDataValue:data.nationValue
            },
            education: {
              id: data.educationId,
              dictDataValue:data.educationValue
            },
            degree: {
              id: data.degreeId,
              dictDataValue:data.degreeValue
            },
            marry: {
              id: data.marryId,
              dictDataValue:data.marryValue
            },
            profession: {
              id: data.professionId,
              dictDataValue:data.professionValue
            },
            nationality: {
              id: data.nationalityId,
              dictDataValue:data.nationalityValue
            },
            children: {
              id: data.childrenId,
              dictDataValue:data.childrenValue
            },
            resideStatus: {
              id: data.resideStatusId,
              dictDataValue:data.resideStatusValue
            },
            householdRegister: `${data.householdRegister || ''}`,
            localHouseProperty: `${data.localHouseProperty || ''}`,
            birthdayDate: data.birthday,
            registeredPermanentCity: [data.provinceId, data.cityId, data.countryId],
            mailingAddressCity: [data.resideProvinceId, data.resideCityId, data.resideCountryId]
          })

          this.customer.basic = this.customerInfo
          this.customer.customerId = data.customerId
          if (this.customerInfo.gender && this.customerInfo.birthdayDate) {
            this.hasBirthdayAndAge = true
          }
          this.$emit('update:customer', this.customer)
        }
        this.loadLoading = false
      },
      idCardDuplicateInfo(msg, title) {
        this.$alert(msg, title, {
          confirmButtonText: '确定',
          callback: action => {
            this.blurFlag = false
          }
        })
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
</style>
