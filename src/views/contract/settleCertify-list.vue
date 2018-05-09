<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="客户名称:" prop="custName">
        <el-input v-model="listQuery.custName" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="证件号码:" prop="certNo">
        <el-input v-model="listQuery.certNo" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="协议编号:" prop="agreementNo">
        <el-input v-model="listQuery.agreementNo" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column align="center" width="180" label="协议编号">
        <template scope="scope">
          <span>{{scope.row.agreementNo}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" label="客户名称">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="证件类型">
        <template scope="scope">
          <span>{{scope.row.certTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="证件号码">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="借款金额(元)">
        <template scope="scope">
          <span>{{scope.row.contractAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="应扣金额(元)">
        <template scope="scope">
          <span>{{scope.row.payAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  width="100" label="实扣金额(元)">
        <template scope="scope">
          <span>{{scope.row.currRepay}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" label="实际还款本金(元)">
        <template scope="scope">
          <span>{{scope.row.principalAmt}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="还款日">
        <template scope="scope">
          <span>{{scope.row.repayDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="放款渠道">
        <template scope="scope">
          <span>{{scope.row.thirdTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="客户电话">
        <template scope="scope">
          <span>{{scope.row.telephone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="扣款日">
        <template scope="scope">
          <span>{{scope.row.reportDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="合同状态">
        <template scope="scope">
          <span>{{scope.row.itemStatusValue }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作人">
        <template scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="操作时间">
        <template scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="状态">
        <template scope="scope">
          <span>{{scope.row.applyStatus | validFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" width="120" label="附件">
        <template scope="scope">
          <el-button  @click="viewSettle(scope.row)" type="text" v-if="scope.row.attachUrl != '' && scope.row.attachUrl != null && scope.row.attachUrl != undefined ">
            结清证明
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" width="120" label="操作">
        <template scope="scope">
          <el-button :disabled="disabledApply"  @click="applySettle(scope.row)" type="text" v-if="scope.row.applyStatus != '1' ">
            申请结清
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="block pagination-container" style="text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <edit-modal v-if="showModal" :agreementNo="agreementNo" :reportDate="reportDate" @close="showModal = false"></edit-modal>
  </div>
</template>

<script>
  import { getsettleCertifyList, applySettleCertify } from '@/api/contract'
  import Utils from '@/utils/common'
  // import EditModal from './replayment-list.vue'

  export default {
    name: 'role-list',
    components: {
      // EditModal
    },
    data() {
      return {
        showModal: false,
        list: null,
        agreementNo: '',  // 协议编号
        reportDate: '',  // 扣款日
        listLoading: false,
        searchLoading: false,
        validOptions: [],
        currentPage: 1,
        disabledApply: false,
        total: 0,
        listQuery: {
          custName: '',
          certNo: '',
          agreementNo: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    created() {
      this.getList()
    },
    filters: {
      validFilter(status) {
        const statusMap = {
          '1': '已申请 '
        }
        return statusMap[status]
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        getsettleCertifyList(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.count
          this.listLoading = false
          this.searchLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
          this.searchLoading = false
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
        this.searchLoading = true
        this.currentPage = 1
        this.getList()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      applySettle(row) {
        this.disabledApply = true
        this.agreementNo = row.agreementNo
        this.reportDate = row.reportDate
        // this.showModal = true
        applySettleCertify(this.agreementNo, this.reportDate).then(response => {
          Utils.success('申请成功')
          this.getList()
          this.disabledApply = false
        }).catch(error => {
          console.log(error)
        })
      },
      viewSettle(row) {
        window.open(row.attachUrl)
      }
    }
  }
</script>
<style scoped>
  .form-static{
    padding:0 10px
  }
</style>

