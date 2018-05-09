<template>
  <div class="customer-info-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">基本信息</span>
      </div>
      <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;margin: 0;">
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tr>
              <th width="100">
                <div class="cell">客户姓名</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.custName}}</div>
              </td>
              <th width="100">
                <div class="cell">证件类型</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.certificateTypeValue}}</div>
              </td>
              <th width="100">
                <div class="cell">证件号</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.certificateNo}}</div>
              </td>
              <th>
                <div class="cell">手机号</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.telephone}}</div>
              </td>
              <th>
                <div class="cell">客户经理</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.creatorName}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">性别</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.gender | genderFilter}} </div>
              </td>
              <th>
                <div class="cell">出生日期</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.birthday}}</div>
              </td>
              <th>
                <div class="cell">民族</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.nationValue}}</div>
              </td>
              <th>
                <div class="cell">学历</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.educationValue}}</div>
              </td>
              <th>
                <div class="cell">学位</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.degreeValue}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">婚姻状态</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.marryValue}}</div>
              </td>
              <th>
                <div class="cell">职业</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.professionValue}}</div>
              </td>
              <th>
                <div class="cell">户籍地址</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.provinceValue + customerForm.basic.cityValue + customerForm.basic.countryValue}}</div>
              </td>
              <th>
                <div class="cell">户籍详细地址</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.registeredPermanentResidence}}</div>
              </td>
              <th>
                <div class="cell">户籍邮编</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.residencePostcode}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">国籍</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.nationalityValue}}</div>
              </td>
              <th>
                <div class="cell">客户渠道</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.custChannelValue}}</div>
              </td>
              <th>
                <div class="cell">现居住地</div>
              </th>
              <td>
                <div class="cell">
                  {{customerForm.basic.resideProvinceValue + customerForm.basic.resideCityValue + customerForm.basic.resideCountryValue}}
                </div>
              </td>
              <th>
                <div class="cell">居住地详细地址</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.mailingAddress}}</div>
              </td>
              <th>
                <div class="cell">居住地邮编</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.mailingAddressPostcode}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">电子邮箱</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.email}}</div>
              </td>
              <th>
                <div class="cell">固定电话</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.fixedTelephone}}</div>
              </td>
              <th>
                <div class="cell">户籍情况</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.householdRegister | householdRegisterFilter}}</div>
              </td>
              <th>
                <div class="cell">个人收入（元）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.personalAnnualIncome}}</div>
              </td>
              <th>
                <div class="cell">是否有子女</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.childrenValue}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">支付宝</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.alipayAcct}}</div>
              </td>
              <th>
                <div class="cell">QQ</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.qq}}</div>
              </td>
              <th>
                <div class="cell">微信账号</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.wechat}}</div>
              </td>
              <th>
                <div class="cell">本地房产</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.localHouseProperty | localHousePropertyFilter}}</div>
              </td>
              <th>
                <div class="cell">居住情况</div>
              </th>
              <td>
                <div class="cell">{{customerForm.basic.resideStatusValue}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">备注</div>
              </th>
              <td colspan="9">
                <div class="cell">{{customerForm.basic.remark}}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">贷款信息</span>
      </div>
      <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;margin: 0;">
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tr>
              <th>
                <div class="cell">产品类型</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.financeProductValue}}</div>
              </td>
              <th>
                <div class="cell">申请期限</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.deadlineValue}}</div>
              </td>
              <th>
                <div class="cell">申请金额</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.applyAmount}}</div>
              </td>
              <th>
                <div class="cell">还款方式</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.applyRepayTypeValue}}</div>
              </td>
              <th>
                <div class="cell">还款来源</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.repaySourceValue}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">渠道来源</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.creditSourceValue}}</div>
              </td>
              <th>
                <div class="cell">发生方式</div>
              </th>
              <td>
                <div class="cell">{{customerForm.loan.applyRepayTypeValue}}</div>
              </td>
              <td colspan="6">
                <div class="cell"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">联系人信息</span>
      </div>
      <el-table :data="customerForm.contacts" v-loading="listLoading" border stripe fit style="width: 100%">

        <el-table-column align="center" label="关系" min-width="80px">
          <template scope="scope">
            {{scope.row.relationshipValue}}
          </template>
        </el-table-column>

        <el-table-column label="姓名" min-width="150px">
          <template scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column label="证件类型" min-width="100px">
          <template scope="scope">
            <span>{{scope.row.idTypeValue}}</span>
          </template>
        </el-table-column>

        <el-table-column label="证件号码" min-width="160px">
          <template scope="scope">
            <span>{{scope.row.idNo}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="手机" min-width="150px">
          <template scope="scope">
            {{scope.row.telephone}}
          </template>
        </el-table-column>

        <el-table-column min-width="130px" label="固定电话">
          <template scope="scope">
            <span>{{scope.row.fixedTelephone}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="120px" label="联系地址">
          <template scope="scope">
            <span>{{scope.row.mailingAddress}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="120px" label="工作单位">
          <template scope="scope">
            <span>{{scope.row.companyName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="单位电话" min-width="100px">
          <template scope="scope">
            <span>{{scope.row.businessPhoneNo}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" label="职务">
          <template scope="scope">
            <span>{{scope.row.dutyValue}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="下属人数" min-width="100px">
          <template scope="scope">
            <span>{{scope.row.subordinateNo}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="单位性质" min-width="110px">
          <template scope="scope">
            <span>{{scope.row.businessPropertyValue }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="130px" label="是否知晓借款">
          <template scope="scope">
            <span>{{scope.row.isKnowLoad | isKnowLoadOptions}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">职业信息</span>
      </div>
      <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;margin: 0;">
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tr>
              <th>
                <div class="cell">企业名称</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.companyName}}</div>
              </td>
              <th>
                <div class="cell">企业地址</div>
              </th>
              <td>
                <div class="cell">
                  {{customerForm.company.provinceValue}}{{customerForm.company.cityValue}}{{customerForm.company.countryValue}}
                </div>
              </td>
              <th>
                <div class="cell">企业详细地址</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.mailingAddress}}</div>
              </td>
              <th>
                <div class="cell">公司关键词</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.companyKeyWord}}</div>
              </td>
              <th>
                <div class="cell">企业性质</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.businessPropertyValue}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">成立时间</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.registerDate}}</div>
              </td>
              <th>
                <div class="cell">经营场所</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.businessPlaceValue}}</div>
              </td>
              <th>
                <div class="cell">企业类型</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.businessTypeValue}}</div>
              </td>
              <th>
                <div class="cell">企业电话</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.businessPhoneNo}}</div>
              </td>
              <th>
                <div class="cell">月净利润（元）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.monthNetProfit}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">员工人数（人）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.staffsNo}}</div>
              </td>
              <th>
                <div class="cell">企业净利润率（%）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.netProfitRate}}</div>
              </td>
              <th>
                <div class="cell">进入本单位时间</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.workStartTime | dateFilter}}</div>
              </td>
              <th>
                <div class="cell">职称</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.jobTitleValue}}</div>
              </td>
              <th>
                <div class="cell">服务年限</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.serviceYear}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">职位</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.positionValue}}</div>
              </td>
              <th>
                <div class="cell">职务</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.dutyValue}}</div>
              </td>
              <th>
                <div class="cell">一级行业</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.professionFirstValue}}</div>
              </td>
              <th>
                <div class="cell">二级行业</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.professionSecondValue}}</div>
              </td>
              <th>
                <div class="cell">三级行业</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.professionThirdValue}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">占股比例（%）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.shareRate}}</div>
              </td>
              <th>
                <div class="cell">发薪方式</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.salaryTypeValue}}</div>
              </td>
              <th>
                <div class="cell">开户银行</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.bankName}}</div>
              </td>
              <th>
                <div class="cell">工资卡号</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.salaryBankAcct}}</div>
              </td>
              <th>
                <div class="cell">月发薪日</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.salaryDay}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">月基本工资（元）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.monthBasicSalary}}</div>
              </td>
              <th>
                <div class="cell">其他收入（元）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.monthOtherSalary}}</div>
              </td>
              <th>
                <div class="cell">月总收入（元）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.company.monthTotalSalary}}</div>
              </td>
              <td colspan="4">
                <div class="cell"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">征信信息</span>
      </div>
      <div class="el-table el-table--fit el-table--border el-table--enable-row-transition" style="width: 100%;margin: 0;">
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
            <tr>
              <th>
                <div class="cell">年龄</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.age}}</div>
              </td>
              <th>
                <div class="cell">授薪分类</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.salariedType | salariedTypeOptions}}</div>
              </td>
              <th>
                <div class="cell">工作年限（年）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.workYear}}</div>
              </td>
              <th>
                <div class="cell">占股比例（%）</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.stockRatio}}</div>
              </td>
              <th style="width:165px;">
                <div class="cell">客户公司工商网信息</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.custCompanyInfo | hasOrNoOptions}}</div>
              </td>
            </tr>
            <tr>
              <th>
                <div class="cell">综合征信记录</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.cprhsiveCreditRecord | hasOrNoOptions}}</div>
              </td>
              <th>
                <div class="cell">征信获取时间</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.creditTime | dateFilter}}</div>
              </td>
              <th>
                <div class="cell">征信记录类型</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.recordType | recordTypeOptions}}</div>
              </td>
              <th>
                <div class="cell">逾期信息</div>
              </th>
              <td>
                <div class="cell">{{customerForm.credit.overdueInfo | overdueInfoOptions}}</div>
              </td>
              <td colspan="2">
                <div class="cell"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" v-if="customer.isHandle && customer.order && customer.order.basicLoanTypeKey === 'new_credit_loan'" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">审批意见</span>
      </div>
      <el-row>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入审批意见" v-model="activitiData.opinion">
        </el-input>
      </el-row>
      <el-row :gutter="10" v-loading="completeLoading" style='margin-bottom:15px; margin-top:20px;'>
        <!-- 质检客服操作按钮 -->
        <el-col v-if="customer.order && customer.order.itemStatusKey === '015' && customer.order.customerServiceId !== userId && $store.getters.roles.includes('busi_depart_support')">
          <el-button type="success" @click="doQualityComplete">通过</el-button>
          <el-button type="info" @click="doQualityBack">退回申请人</el-button>
          <el-button type="danger" @click="doQualityRefuse">拒绝</el-button>
        </el-col>

        <!-- 录单客服操作按钮 -->
        <el-col v-if="customer.order && customer.order.itemStatusKey === '013' && $store.getters.roles.includes('busi_depart_support')">
          <el-button type="success" @click="doServiceAdjust">调整申请通过</el-button>
          <el-button type="danger" @click="doServiceRefuse">调整申请拒绝</el-button>
        </el-col>

        <!-- 签约客服操作按钮 -->
        <el-col v-if="customer.order && customer.order.itemStatusKey === '004' && $store.getters.roles.includes('busi_depart_support')">
          <el-button type="success" @click="doSignComplete">通过</el-button>
        </el-col>

        <!-- 风控经理操作按钮 -->
        <el-col v-if="customer.order && customer.order.itemStatusKey === '005' && $store.getters.roles.includes('riskctrl_manager')">
          <el-button type="success" @click="doRiskComplete" v-if="customer.order && customer.order.itemStatusKey === '005'">通过</el-button>
          <el-button type="info" @click="doRiskBack" v-if="customer.order && customer.order.itemStatusKey === '005'">退回申请人</el-button>
        </el-col>

        <!-- 签约客服操作按钮，补齐资料 -->
        <el-col v-if="customer.order && (customer.order.itemStatusKey === '005' || customer.order.itemStatusKey === '011') && $store.getters.roles.includes('busi_depart_support')">
          <el-button type="success" @click="doServiceAdjust">补齐资料</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card" v-else-if="customer.isHandle" style="margin-top: 20px;">
      <el-row>
        <el-col>
          <el-button type="success" @click="endOldProcess">归档</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  loadBasicInfoById,
  loadLoanInfo,
  loadContactsInfo,
  loadCompanyInfo,
  loadCreditInfo,
  selectContractIsNo
} from "@/api/order";
import {
  qualityCompleteTask,
  qualityRefuseTask,
  qualityBackTask,
  serviceAdjustTask,
  serviceRefuseTask,
  signCompleteTask,
  doRiskBack,
  doRiskComplete,
  endOldProcess
} from "@/api/task";
import dateFormat from "dateformat";
import Utils from "@/utils/common";
import { mapGetters } from "vuex";

export default {
  name: "customer-info",
  props: ["customer"],
  data() {
    return {
      activitiData: {
        taskId: this.customer.taskId,
        orderId: this.customer.orderId,
        businessKey: this.customer.businessKey,
        procInstId: this.customer.procInstId,
        opinion: ""
      },
      contractList: null,
      completeLoading: false,
      getDataLoading: false,
      listLoading: false,
      customerForm: {
        basic: {
          nowAddress: [],
          custName: "",
          certificateTypeValue: "",
          certificateNo: "",
          telephone: "",
          gender: "",
          birthday: "",
          nationValue: "",
          educationValue: "",
          degreeValue: "",
          marryValue: "",
          professionValue: "",
          provinceValue: "",
          cityValue: "",
          countryValue: "",
          registeredPermanentResidence: "",
          residencePostcode: "",
          nationalityValue: "",
          custChannelValue: "",
          resideProvinceValue: "",
          resideCityValue: "",
          resideCountryValue: "",
          mailingAddress: "",
          companyKeyWord: "",
          businessPropertyValue: "",
          registerDate: "",
          businessPlaceValue: "",
          businessTypeValue: "",
          businessPhoneNo: "",
          monthNetProfit: "",
          staffsNo: null,
          netProfitRate: "",
          workStartTime: null,
          serviceYear: null,
          positionValue: null,
          dutyValue: null,
          jobTitleValue: "",
          professionFirstValue: "",
          professionSecondValue: "",
          shareRate: null,
          salaryTypeValue: "",
          bankName: "",
          salaryBankAcct: "",
          salaryDay: "",
          monthBasicSalary: "",
          monthOtherSalary: null,
          monthTotalSalary: null
        },
        loan: {
          applyAmount: "",
          loanPurpose: null,
          financeProduct: null,
          deadline: null,
          applyRepayType: null,
          repaySource: null,
          creditWay: null,
          creditSource: null
        },
        contacts: [],
        company: {
          businessProperty: {},
          registerDateObj: "",
          registerdate: "",
          businessPlace: {},
          businessType: {},
          monthNetProfit: "",
          staffsNo: "",
          netProfitRate: "",
          workStartTimeObj: "",
          workStartTime: "",
          profession: {},
          serviceYear: "",
          position: {},
          duty: {},
          jobTitle: "",
          professionFirst: {},
          professionSecond: {},
          salaryType: {},
          bank: {},
          salaryBankAcct: "",
          salaryDay: "",
          monthBasicSalary: "",
          monthOtherSalary: "",
          monthTotalSalary: ""
        },
        credit: {
          age: "",
          salariedType: null,
          recordType: 1,
          workYear: "",
          stockRatio: "",
          custCompanyInfo: "",
          cprhsiveCreditRecord: "",
          creditTime: "",
          overdueInfo: ""
        }
      }
    };
  },
  filters: {
    dateFilter(date) {
      if (date) {
        return dateFormat(date, "yyyy-mm-dd");
      }
      return "-";
    },
    localHousePropertyFilter(val) {
      const status = {
        "0": "本地有房产",
        "1": "本地无房产"
      };
      return status[val];
    },
    householdRegisterFilter(val) {
      const status = {
        "0": "本地户籍",
        "1": "非本地户籍"
      };
      return status[val];
    },
    genderFilter(val) {
      const status = {
        "0": "女",
        "1": "男"
      };
      return status[val];
    },
    salariedTypeOptions(val) {
      const status = {
        "00": "受薪人士",
        "01": "私营业主或股东"
      };
      return status[val];
    },
    hasOrNoOptions(val) {
      const status = {
        "1": "有",
        "0": "无"
      };
      return status[val];
    },
    recordTypeOptions(val) {
      const status = {
        "1": "详",
        "0": "简"
      };
      return status[val];
    },
    overdueInfoOptions(val) {
      const status = {
        "00": "贷记卡有逾期",
        "01": "贷款有逾期"
      };
      return status[val];
    },
    isKnowLoadOptions(val) {
      const status = {
        "1": "是",
        "0": "否"
      };
      return status[val];
    }
  },
  created() {
    this.loadDataById();
    this.getLoan();
    this.getContacts();
    this.getOccupation();
    this.getCredit();
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    loadDataById() {
      this.getDataLoading = true;
      loadBasicInfoById(this.customer.customerId)
        .then(response => {
          this.customerForm.basic = response.data;
          this.getDataLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.getDataLoading = false;
        });
    },
    getLoan() {
      this.loadLoading = true;
      loadLoanInfo({
        orderId: this.customer.orderId,
        customerId: this.customer.customerId
      })
        .then(response => {
          this.customerForm.loan = response.data;
          this.loadLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.loadLoading = false;
        });
    },
    getContacts() {
      this.listLoading = true;
      return loadContactsInfo({
        customerId: this.customer.customerId,
        orderId: this.customer.orderId
      })
        .then(response => {
          this.customerForm.contacts = response.data.list;
          this.listLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    getOccupation() {
      this.loadLoading = true;
      loadCompanyInfo({
        customerId: this.customer.customerId
      })
        .then(response => {
          this.customerForm.company = response.data;
          this.loadLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.loadLoading = false;
        });
    },
    getCredit() {
      this.loadLoading = true;
      loadCreditInfo({
        orderId: this.customer.orderId,
        customerId: this.customer.customerId
      })
        .then(response => {
          this.customerForm.credit = response.data;
          this.loadLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.loadLoading = false;
        });
    },
    confirm(title, callback) {
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.completeLoading = true;
        callback();
      });
    },
    response(response) {
      Utils.success("操作成功");
      this.completeLoading = false;
      this.$router.push({ path: "/workflow-task/pending" });
    },
    error(error) {
      console.log(error);
      this.completeLoading = false;
    },
    doQualityComplete() {
      this.confirm("确认通过?", () => {
        qualityCompleteTask(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    doQualityRefuse() {
      if (this.activitiData.opinion === "") {
        Utils.warning("请填写拒绝原因！");
        return;
      }
      this.confirm("确认拒绝?", () => {
        qualityRefuseTask(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    doQualityBack() {
      this.confirm("确认退回至申请人?", () => {
        qualityBackTask(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    doServiceAdjust() {
      this.confirm("确认调整申请通过?", () => {
        serviceAdjustTask(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    doServiceRefuse() {
      if (this.activitiData.opinion === "") {
        Utils.warning("请填写拒绝原因！");
        return;
      }
      this.confirm("确认调整申请拒绝?", () => {
        serviceRefuseTask(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    doSignComplete() {
      // 判断是否已生成合同
      selectContractIsNo(this.customerForm.loan.loanNo).then(res => {
        if (res.data === true) {
          this.confirm("确认通过?", () => {
            signCompleteTask(this.activitiData)
              .then(this.response)
              .catch(this.error);
          });
        } else {
          Utils.warning('请先生成合同信息!')
        }
      })
    },
    doRiskComplete() {
      this.confirm("确认通过?", () => {
        doRiskComplete(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    doRiskBack() {
      this.confirm("确认退回?", () => {
        doRiskBack(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    },
    endOldProcess() {
      this.confirm("确认归档?", () => {
        endOldProcess(this.activitiData)
          .then(this.response)
          .catch(this.error);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.customer-info-container .el-card__header {
  padding: 0 20px !important;
}
.el-table .cell {
  white-space: normal;
  word-break: break-word;
}
</style>
