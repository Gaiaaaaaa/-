<template>
  <div class="calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card" style="padding-bottom:43px;">
          <div slot="header" class="clearfix">
            <span>开户绑卡</span>
          </div>
          <el-form :model="openAnAccountInfo" ref="AccountInfo" label-width="120px" class="demo-dynamic">
            <el-col :span="24">
              <el-form-item label="客户姓名">
                {{customer.basicInfo.custName}}
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="证件类型">
                {{customer.basicInfo.certificateTypeValue}}
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="证件号码">
                {{customer.basicInfo.certificateNo}}
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="bankCardNo" label="银行卡号" :rules="[{required: !isView, message: '银行卡号必填', trigger: 'blur'}]">
                <el-input v-model="openAnAccountInfo.bankCardNo" placeholder="请输入 I 类银行卡号" :disabled="isView"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="bank" label="开户银行" :rules="[{required: !isView, message: '开户银行必填'}]">
                <el-select @change="changgeBank" value-key="id"  :disabled="isView" filterable clearable v-model="openAnAccountInfo.bank" placeholder="请选择">
                  <el-option
                    v-for="item in bankOptions"
                    :key="item.dictDataValue"
                    :label="item.dictDataValue"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="bankBranchName" label="开户支行" :rules="[{required: !isView, message: '开户支行必填', trigger: 'blur'}]">
                <el-input :disabled="isView" v-model="openAnAccountInfo.bankBranchName"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="provinceCityArr" label="开户地区" :rules="[{required: !isView, message: '开户地区必填'}]">
                <el-cascader clearable
                             :options="cityOptions"
                             :props="props"
                             v-model="openAnAccountInfo.provinceCityArr"
                             :disabled="isView"
                ></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="thirdType" label="开户机构" :rules="[{required: !isView, message: '开户机构必填'}]">
                <el-select :disabled="isView"  @change="changgeThirdType" value-key="id" clearable v-model="openAnAccountInfo.thirdType" placeholder="请选择">
                  <el-option
                    v-for="item in thirdTypeOptions"
                    :key="item.id"
                    :label="item.dictDataValue"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="telephone" label="银行预留手机号" :rules="[{required: true, message: '银行预留手机号必填', trigger: 'blur'}]">
                <el-input :disabled="isView" v-model="openAnAccountInfo.telephone"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item v-if="codeShow" prop="identifyingCode" label="验证码" :rules="[{required: true, message: '验证码必填', trigger: 'blur'}]">
                <div style="display: flex;">
                  <el-input v-model="openAnAccountInfo.identifyingCode"></el-input>
                  <el-button  @click="sendMessage"  :loading="sendSmsLoading" :disabled="btnSendSmsDisabled" type="primary">{{btnSendSmsText}}</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="openAnAccount"
                           v-show="showOpenAccount"
                           v-if="$store.getters.buttons.includes('btnWorkflowOpenAccount') && !isView" >开户</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合同信息查看</span>
          </div>
          <el-form :model="customer" ref="dynamicValidateForm" label-width="110px" class="demo-dynamic">
            <el-col :span="24">
              <el-form-item prop="email" label="申请编号">
                {{orderDetailInfo.loanNo || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="申请日期">
                {{orderDetailInfo.createTime | dateFilter}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="产品类型">
                {{orderDetailInfo.financeProductValue || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="客户名称">
                {{orderDetailInfo.custName || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="证件号码">
                {{orderDetailInfo.certNo || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="客户类型">
                {{orderDetailInfo.custTypeValue || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="申请金额">
                {{orderDetailInfo.applyAmount || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="综合费率">
                {{orderDetailInfo.lastRiskRateValue || '-'}}
              </el-form-item>
            </el-col>
            <!--:rules="[{ required: true, message: '请选择活动区域', trigger: 'change'}]"-->
            <el-col :span="12">
              <el-form-item prop="email" label="期限" >
                <el-select :disabled="isView" value-key="id" @change="changgeDeadlineValue" v-model="orderDetailInfo.lastDeadlineValue" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in lineOptions"
                    :key="item.dictDataKey"
                    :label="item.dictDataValue"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="还款方式">
                {{orderDetailInfo.applyRepayTypeValue || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="借款用途">
                {{orderDetailInfo.loanPurposeValue || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="还款来源">
               {{orderDetailInfo.repaySourceValue || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="email" label="放款账户">
                {{this.bankAcct}}
              </el-form-item>
            </el-col>



            <el-col :span="12">
              <el-form-item prop="email" label="合同编号" >
                <el-input :disabled="true" v-model="orderDetailInfo.contractNo"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="loanInfo.lastApproveAmt" label="最终审批金额"
                            :rules="[{required: !isView, message: '最终审批金额不能为空'}, { type: 'number', message: '最终审批金额为数字值'}, {validator: validateLastApproveAmt}]">
                <el-input :disabled="isView" v-model.number="orderDetailInfo.lastApproveAmt"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="协议编号">
                  {{orderDetailInfo.agreementNo || '-'}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="合同金额(元)">
                {{orderDetailInfo.contractAmount}}
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="放款金额(元)">
                <span v-show="this.showLoanAmount">{{orderDetailInfo.loanAmount}}</span>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item>
                <el-button @click="updateContractInfo" type="primary"
                           v-show="showButtonContr"
                           v-if="$store.getters.buttons.includes('btnWorkflowSaveContractInfo') && !isView">保存</el-button>
              </el-form-item>
            </el-col>

          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合同生成和打印</span>
            <el-button style="float: right" v-show="showButtonContr" v-loading="generateLoading" @click="getGenerateContract" type="info"
                       v-if="$store.getters.buttons.includes('btnWorkflowGenerateContract') && !isView">生成合同</el-button>
          </div>
          <el-table :data="contractlist" v-loading.body="listLoading" border stripe fit style="width: 100%">

            <el-table-column align="left" label="合同名称">
              <template scope="scope">
                <span>{{scope.row.dictDataValue}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="生成时间">
              <template scope="scope">
                <span> {{customer.loanInfo.contractDate }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="操作"
                              v-if="$store.getters.buttons.includes('btnWorkflowPreviewContract')">
              <template scope="scope">
                <el-button   @click="getPreviewContract(scope.row)" type="text">预览</el-button>
              </template>
            </el-table-column>




          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {sendSms, getOrder, getOpenAnAccount, selectPreviewlist, selectBankAcct, previewContract, ContractOfGeneration, selectContractInfo, updateContractLoanInfo, selectFycitys, selectContractIsNo } from '@/api/order'
  import Utils from '@/utils/common'
  import dateFormat from 'dateformat'
  import { mapGetters } from 'vuex'

  var isSave = '0'

  export default {
    name: 'contract-info',
    props: ['customer'],
    data() {
      return {
        isView: this.$route.params.type === 'view',
        lastApproveAmtConst: this.customer.loanInfo.lastApproveAmt,
        isEdit: false, // 是否为编辑状态
        dataId: null, // 编辑时需要传递的主键
        showModal: true,
        orderDetailInfo: {},
        showLoanAmount: false,
        showButtonContr: true,
        showOpenAccount: true,
        contractlist: null,
        isOpenAccount: '0',
        list: null,
        btnSendSmsDisabled: false,
        btnSendSmsText: '获取验证码',
        codeShow: false,
        listLoading: true,
        sendSmsLoading: false,
        searchLoading: false,
        generateLoading: false,
        currentPage: 1,
        total: 0,
        statusOptions: [],
        thirdTypeOptions: [],
        cityOptions: [],
        lineOptions: [],
        bankOptions: [],
        statusMap: {},
        thirdId: '',
        bankAcct: '',
        contractDisable: null,
        updateContractQuery: {
          id: '',
          lastDeadlineId: this.customer.loanInfo.deadlineId,
          lastDeadlineValue: this.customer.loanInfo.deadlineValue,
          lastApproveAmt: ''
        },
        contractInfo: {},
        contractQuery: {
          orderId: this.customer.orderId,
          customerId: this.customer.customerId,
          custName: this.customer.basicInfo.custName,
          certificateNo: this.customer.basicInfo.certificateNo
        },
        props: {
          value: 'value',
          label: 'label',
          children: 'children'
        },
        contractPreview: {
          orderId: this.customer.orderId,
          LoanNo: this.customer.loanInfo.loanNo  /*'CLA20171107091521000874390940'*/,
          fileDictDataId: '',
          fileDictDataKey: ''
        },
        openAnAccountInfo: {
          loanNo: this.customer.loanInfo.loanNo,
          basicCustId: this.customer.basicInfo.customerId,
          custName: this.customer.basicInfo.custName,
          cardId: this.customer.basicInfo.certificateNo,
          cardType: null,
          telephone: this.customer.basicInfo.telephone,
          birthday: this.customer.basicInfo.birthday,
          slBankCode: '',
          fyBankCode: '',
          bankCardNo: '',
          areaCode: '',
          identifyingCode: '',
          bankAreaCode: '',
          thirdTypeId: '',
          bankId: '',
          bank: null,
          bankName: null,
          bankBranchName: '',
          provinceCityArr: [],
          thirdType: null,
          gender: this.customer.basicInfo.gender,
          provinceId: null,
          cityId: null
        },
        contractVo: {
          loanNo: this.customer.loanInfo.loanNo,
          ipiecesNo: this.customer.businessKey
        },
        listQuery: {
          certNo: '',
          custName: '',
          provinceCityArr: null,
          kfbank: '',
          agreementNo: '',
          deadlineValue: '',
          creatorName: '',
          dptName: '',
          itemStatusKey: this.$route.query.status || '',
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
      dateFilter(date) {
        return dateFormat(date, 'yyyy-mm-dd HH:MM')
      }
    },
    computed: {
      ...mapGetters([
        'buttons'
      ])
    },
    created() {
      console.log('hhhh',this.customer.loanInfo)
      console.log(this.$route.params.type === 'view', '111')
      this.getContractInfo()
      this.getPreviewlist()
      this.getBankAcct()
      this.getFycitys()
      this.getContractIsNo(this.customer.loanInfo.loanNo)
      this.getOrderDetail()
      this.listQuery.deadlineValue = this.customer.loanInfo.deadlineValue

      Utils.getDictData('ITEM_STATUS', data => {
        this.statusOptions = data
      })

      Utils.getDictData('THIRD_TYPE', data => {
        this.thirdTypeOptions = data
      })

      Utils.getDictData('DEADLINE', data => {
        this.lineOptions = data
      })

      Utils.getDictData('THIRD_CARD_TYPE', data => {
        this.bankOptions = data
      })

      Utils.getDictDataById(this.customer.basicInfo.certificateTypeId, data => {
        this.openAnAccountInfo.cardType = data.dictDataKey
      })

    },
    updated() {
    },
    methods: {
      validateLastApproveAmt(rule, value, callback) {
        console.log(value, this.orderDetailInfo.lastApproveAmt)
        if (value < this.orderDetailInfo.lastApproveAmt) {
          return callback(new Error('最终审批金额不能大于' + this.lastApproveAmtConst))
        } else {
          callback()
        }
      },
      getOrderDetail() {
        getOrder(this.customer.orderId).then(response => {
          this.orderDetailInfo = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      getFycitys() {
        selectFycitys().then(response => {
          if (response.data) {
            this.cityOptions = response.data
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getContractIsNo(loanNo) {
        selectContractIsNo(loanNo).then(response => {
          if (response.data === true) {
            this.showLoanAmount = true
            this.showButtonContr = false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getContractInfo() {
        this.listLoading = true
        selectContractInfo(this.contractQuery).then(response => {
          this.total = response.count
          this.contractInfo = response.data
          this.listLoading = false
          this.searchLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
          this.searchLoading = false
        })
      },
      updateContractInfo() {
        this.updateContractQuery.id = this.contractInfo.orderId
        this.updateContractQuery.lastApproveAmt = this.orderDetailInfo.lastApproveAmt
        if (this.isOpenAccount === '0') {
          Utils.warning('该用户没有开户')
          return
        }
        updateContractLoanInfo(this.updateContractQuery).then(response => {
          isSave = '1'
          Utils.success('保存成功.')
          this.getOrderDetail()
        }).catch(error => {
          console.log(error)
        })
      },
      getGenerateContract() {
        if (isSave === '0') {
          Utils.warning('请先保存合同信息内容.')
          return
        }
        this.generateLoading = true
        ContractOfGeneration(this.contractVo).then(response => {
          this.generateLoading = false
          Utils.success('生成成功')
          this.getBankAcct()
          this.getContractIsNo(this.customer.loanInfo.loanNo)
          this.getOrderDetail()
        }).catch(error => {
          this.generateLoading = false
          console.log(error)
        })
      },
      getPreviewContract(val) {
        this.contractPreview.fileDictDataId = val.dictTypeId
        this.contractPreview.fileDictDataKey = val.dictDataKey
        previewContract(this.contractPreview).then(response => {
          window.open(response.data)
        }).catch(error => {
          console.log(error)
        })
      },
      getBankAcct() {
        selectBankAcct(this.customer.customerId).then(response => {
          if(response.data) {
            // 判断是否开过户 存管以isBind为准
            if (Utils.isNotEmpty(response.data.isBind) && response.data.isBind === '1') {
              this.showOpenAccount = false
              this.isOpenAccount = '1'
              //this.isView = true
            }
            // 判断是否开过户 富有以子账户号为准
            if (Utils.isNotEmpty(response.data.subAccount)) {
              this.showOpenAccount = false
              this.isOpenAccount = '1'
              //this.isView = true
            }

            this.bankAcct = response.data.bankAcct
            this.thirdId = response.data.thirdTypeId
            if (response.data.thirdTypeId !== null && response.data.thirdTypeId !== 380000) {
              this.contractDisable = true
            }
            this.openAnAccountInfo.bankCardNo = response.data.bankAcct
            this.openAnAccountInfo.bank = response.data.bankName
            this.openAnAccountInfo.bankBranchName = response.data.bankBranchName
            this.openAnAccountInfo.provinceCityArr[0] = response.data.provinceId
            this.openAnAccountInfo.provinceCityArr[1] = response.data.cityId
            this.openAnAccountInfo.thirdType = {
              id: response.data.thirdTypeId,
              dictDataValue: response.data.thirdTypeValue
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getPreviewlist() {
        selectPreviewlist(this.customer.customerId, this.customer.loanInfo.loanNo).then(response => {
          this.contractlist = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      openAnAccount() {

        this.$refs['AccountInfo'].validate((valid) => {
          if (valid) {
            this.openAnAccountInfo.areaCode = this.openAnAccountInfo.provinceCityArr[1]
            this.openAnAccountInfo.provinceId = this.openAnAccountInfo.provinceCityArr[0]
            this.openAnAccountInfo.cityId = this.openAnAccountInfo.provinceCityArr[1]
            getOpenAnAccount(this.openAnAccountInfo).then(response => {
              Utils.success(response.msg)
              this.getBankAcct()
              this.this.getOrderDetail()
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      },
      sendMessage() {
        if(!this.openAnAccountInfo.telephone) {
          Utils.error('请输入手机号！');
          return;
        }
        this.countdown()
        this.sendSmsLoading = true
        sendSms(this.openAnAccountInfo).then(response => {
          this.sendSmsLoading = false
          this.countdown()
          Utils.success('发送成功')
        }).catch(error => {
          console.log(error)
          this.sendSmsLoading = false
        })
      },
      changgeBank(val) {
        this.openAnAccountInfo.bankAreaCode = val.dictDataKey
        this.openAnAccountInfo.fyBankCode = val.dictDataKey
        this.openAnAccountInfo.bankName = val.dictDataValue
      },
      changgeThirdType(val) {
        if (val.dictDataKey === '006' || val.dictDataKey === '008') {
          this.codeShow = true
        } else {
          this.codeShow = false
        }
        console.log(val)
        console.log(this.openAnAccountInfo.thirdtype)
        this.openAnAccountInfo.thirdTypeId = val.id
      },
      changgeDeadlineValue(val) {
        this.updateContractQuery.lastDeadlineId = val.id
        this.updateContractQuery.lastDeadlineValue = val.dictDataValue
      },
      handleSizeChange(n) {
        this.listQuery.pageSize = n
        this.getList()
      },
      handleCurrentChange(n) {
        this.listQuery.page = n
        this.getList()
      },
      search() {
        this.searchLoading = true
        this.currentPage = 1
        this.getList()
      },
      showAddDialog() {
        this.isEdit = false
        this.showModal = true
      },
      showEditDialog(item) {
        this.dataId = item.id
        this.isEdit = true
        this.showModal = true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select {
    width: 100%;
  }

  .el-cascader {
    width: 100%;
  }
  .calendar-list-container .el-form-item{
    margin-bottom: 20px;
  }
</style>
