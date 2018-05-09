<template>
  <div class="app-container account-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="100px" :inline="true">
      <el-form-item label="客户姓名" prop="custName">
        <el-input v-model="listQuery.custName" size="small" placeholder="客户姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="证件号" prop="cardID">
        <el-input v-model="listQuery.cardID" size="small" placeholder="证件号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="bankAcct">
        <el-input v-model="listQuery.bankAcct" size="small" placeholder="银行账号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="开户日期:">
        <el-form-item prop="startDate">
          <DatePicker :model.sync="listQuery.startDate" placeholder="请选择时间" style="width: 174px" :max-date="listQuery.end"></DatePicker>
        </el-form-item>
        <span style="margin:0 5px">至</span>
        <el-form-item prop="endDate">
          <DatePicker :model.sync="listQuery.endDate" placeholder="请选择时间" style="width: 174px" :min-date="listQuery.start"></DatePicker>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">

      <el-table-column align="center" prop="custName" label="客户名称" min-width="100px"></el-table-column>
      <!-- <el-table-column
        prop="custValue"
        label="客户类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="certificateValue"
        label="证件类型"
        width="120">
      </el-table-column> -->
      <el-table-column align="center"
        prop="certificateNo"
        label="证件号"
        width="180">
      </el-table-column>
      <el-table-column align="center"
        prop="bankAcct"
        label="银行卡号"
        width="170">
      </el-table-column>
      <el-table-column align="center"
        prop="bankPhone"
        label="预留手机号"
        width="130">
      </el-table-column>
      <el-table-column align="center"
        prop="cgCardNo"
        label="银行存管账号"
        width="170">
      </el-table-column>
      <!--<el-table-column
        prop="bankPhone"
        label="手机号"
        width="150">
      </el-table-column>-->
      <el-table-column align="center"
        prop="bankBranchName"
        label="开户银行"
        width="170">
      </el-table-column>
      <el-table-column align="center"
        prop="thirdTypeValue"
        label="资金方"
        width="180">
      </el-table-column>
      <!--<el-table-column
        prop="bankAcct"
        label="银行账号"
        width="120">
      </el-table-column>-->
      <!--<el-table-column
        prop="third"
        label="第三方机构"
        width="120">
      </el-table-column>-->
      <!-- <el-table-column
        prop="sonNum"
        label="子账户号"
        width="120">
      </el-table-column> -->
      <el-table-column align="center"
        label="开户日期"
        width="170">
        <template scope="scope">
          {{scope.row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="creatorName"
        label="操作人"
        width="80">
      </el-table-column>
      <el-table-column align="center"
        prop="belongName"
        label="放款营业部"
        width="170">
      </el-table-column>
      <el-table-column align="center"
        prop="isBind"
        label="绑卡状态"
        width="100">
        <template scope="scope">
          {{scope.row.isBind==1?'是':'否'}}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="120">
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="180"
        fixed="right"
        align="center"
        v-if="$store.getters.buttons.includes('btnAccountunbind') || $store.getters.buttons.includes('btnAccountBind') || $store.getters.buttons.includes('btnAccountChangeRecord')">
        <template scope="scope">
          <el-button @click="unBindBankcard(scope.row)" type="text" size="small" :disabled="scope.row.isBind !== '1'"
                     v-if="$store.getters.buttons.includes('btnAccountunbind')">解绑</el-button>
          <el-button @click="bindBankcard(scope.row)" type="text" size="small" :disabled="scope.row.isBind == '1'"
                     v-if="$store.getters.buttons.includes('btnAccountBind')">绑卡</el-button>
          <el-button type="text" size="small" @click="handleHis(scope.row)"
                     v-if="$store.getters.buttons.includes('btnAccountChangeRecord')">变更记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right">
      </el-pagination>
    </div>
    <History v-if="showHistory" @close="showHistory = false" :certNo="certificateNo"></History>

    <open-account v-if="dialogShow" @close="dialogShow = false" @refresh="getList" :data="data" :isFuYou="false"></open-account>

  </div>
</template>
<script>
  import { getAccountList, unBindBankcard } from '@/api/depository'
  import History from './history'
  import OpenAccount from '../fy-open-account/open-account'
  import Utils from '@/utils/common'

  export default {
    components: {
      History,
      OpenAccount
    },
    data() {
      return {
        showHistory: false,
        listLoading: true,
        searchLoading: false,
        dialogShow: false,
        list: [],
        listQuery: {
          custName: '',
          cardID: '',
          bankAcct: '',
          startDate: null,
          endDate: null,
          page: 1,
          pageSize: 10
        },
        currentPage: 1,
        total: 0,
        certificateNo: '',
        custName: '',
        cardId: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 获取列表
      getList() {
        this.listLoading = true
        var _this = this
        getAccountList(this.listQuery).then((response) => {
          console.log(response)
          this.total = response.count
          this.list = response.data
          this.listLoading = false
          this.searchLoading = false
        }).catch((err) => {
          console.log(err)
          _this.listLoading = false
          _this.searchLoading = false
        })
      },
      // 查询
      search() {
        this.searchLoading = true
        this.currentPage = 1
        this.getList()
      },
      // 重置
      reset() {
        this.$refs.listQuery.resetFields()
      },
      handleSizeChange(n) {
        this.listQuery.pageSize = n
        this.getList()
      },
      handleCurrentChange(n) {
        this.listQuery.page = n
        this.getList()
      },
      // 解绑
      unBindBankcard(row) {
        console.log(row)
        this.$confirm('确认解绑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          unBindBankcard({
            basicCustId: row.basicCustId
          }).then(response => {
            this.listLoading = false
            Utils.success('解绑成功')
            this.getList()
          }).catch(error => {
            console.log(error)
            this.listLoading = false
          })
        }).catch(() => {
        })
      },
      // 绑卡
      bindBankcard(row) {
        this.data = row
        this.dialogShow = true
      },
      // 记录
      handleHis(row) {
        this.certificateNo = row.certificateNo
        this.custName = row.custName
        this.card = row.cardId
        this.showHistory = true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style lang="scss" scoped>
.account-container {
  .pagination-wrapper {
    margin-top: 20px;
  }
  .inline-text {
    line-height: 36px;
    display: inline-block;
    margin-right: 10px;
  }
}

</style>
