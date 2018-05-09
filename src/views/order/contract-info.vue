<template>
  <div class="calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" body-style="height: 500px;">
          <div slot="header" class="clearfix">
            <span>开户绑卡</span>
          </div>
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="110px" class="demo-dynamic">
            <el-form-item prop="email" label="客户姓名">
              {{this.customer.basic.custName}}
            </el-form-item>
            <el-form-item prop="email" label="证件类型">
              {{this.customer.basic.certificateTypeValue}}
            </el-form-item>
            <el-form-item prop="email" label="证件号码">
              {{this.customer.basic.certificateNo}}
            </el-form-item>
            <el-form-item prop="email" label="银行卡号">
              {{this.openAnAccountInfo.bankAcct}}
            </el-form-item>
            <el-form-item prop="email" label="开户银行">
              {{this.openAnAccountInfo.bankName}}
            </el-form-item>
            <el-form-item prop="email" label="开户支行">
              {{this.openAnAccountInfo.bankBranchName}}
            </el-form-item>
            <el-form-item prop="email" label="开户地区">
            </el-form-item>
            <el-form-item prop="email" label="开户机构">
              {{this.openAnAccountInfo.thirdTypeValue}}
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合同信息查看</span>
          </div>
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item prop="email" label="申请编号">
              {{this.loaninfo.loanNo}}
            </el-form-item>
            <el-form-item prop="email" label="申请日期">
              {{this.loaninfo.createTime | dateFilter}}
            </el-form-item>
            <el-form-item prop="email" label="产品类型">
              {{this.loaninfo.financeProductValue }}
            </el-form-item>
            <el-form-item prop="email" label="客户名称">
              {{this.customer.basic.custName}}
            </el-form-item>
            <el-form-item prop="email" label="证件号码">
              {{this.customer.basic.certificateNo}}
            </el-form-item>
            <el-form-item prop="email" label="客户类型">
              {{this.loaninfo.custTypeValue }}
            </el-form-item>
            <el-form-item prop="email" label="申请金额">
             {{this.loaninfo.applyAmount}}
            </el-form-item>
            <el-form-item prop="email" label="综合费率">
              {{this.loaninfo.lastRiskRateValue}}
            </el-form-item>
            <el-form-item prop="email" label="期限">
              {{this.loaninfo.deadlineValue}}
            </el-form-item>
            <el-form-item prop="email" label="还款方式">
              {{this.loaninfo.applyRepayTypeValue}}
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>合同生成和打印</span>
          </div>
          <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">
            <el-table-column label="合同名称">
              <template scope="scope">
                <span>{{scope.row.dictDataValue}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="生成时间">
              <template scope="scope">
                <span> {{loaninfo.contractDate }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="操作">
              <template scope="scope">
                <el-button v-show="lookShow" @click="getPreviewContract(scope.row)"   type="text">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { selectContractInfo, selectBankAcct, selectPreviewlist, previewContract } from '@/api/order'
  import Utils from '@/utils/common'
  import dateFormat from 'dateformat'

  export default {
    name: 'contract-info',
    props: ['customer'],
    data() {
      return {
        list: null,
        listLoading: false,
        lookShow: false,
        currentPage: 1,
        total: 0,
        statusOptions: [],
        statusMap: {},
        dynamicValidateForm: {},
        contractCriteria: {
          orderId: this.customer.orderId,
          customerId: this.customer.customerId,
          custName: this.customer.basic.custName,
          certificateNo: this.customer.basic.certificateNo
        },
        loaninfo: {},
        contractPreview: {
          LoanNo: '',
          fileDictDataId: '',
          fileDictDataKey: ''
        },
        openAnAccountInfo: {
          bankAcct: '',
          bankName: '',
          bankBranchName: '',
          thirdTypeValue: ''
        },
        listQuery: {
          certNo: '',
          custName: '',
          agreementNo: '',
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
    created() {
      console.log(this.customer)
      this.getContractinfo()
      this.getOpenAnAccount()
      Utils.getDictData('ITEM_STATUS', data => {
        this.statusOptions = data
      })
    },
    methods: {
      getContractinfo() {
        selectContractInfo(this.contractCriteria).then(response => {
          this.loaninfo = response.data
          if (response.data.contractNo !== undefined) {
            this.lookShow = true
          }
          this.getPreviewlist()
        }).catch(error => {
          console.log(error)
        })
      },
      getOpenAnAccount() {
        selectBankAcct(this.customer.customerId).then(response => {
          if (response.data){
            this.openAnAccountInfo = response.data
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getPreviewlist() {
        this.listLoading = true
        selectPreviewlist(this.customer.customerId, this.loaninfo.loanNo).then(response => {
          this.list = response.data
          this.listLoading = false
        }).catch(error => {
          this.listLoading = false
          console.log(error)
        })
      },
      getPreviewContract(val) {
        console.log(val)
        this.contractPreview.fileDictDataId = val.dictTypeId
        this.contractPreview.fileDictDataKey = val.dictDataKey
        this.contractPreview.loanNo = this.loaninfo.loanNo
        previewContract(this.contractPreview).then(response => {
          window.open(response.data)
        }).catch(error => {
          console.log(error)
        })
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
    width: 100px;
  }
</style>
