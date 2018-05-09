<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="100px" :inline="true">
      <el-form-item label="证件号" prop="certNo">
        <el-input v-model="listQuery.certNo" placeholder="证件号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名" prop="custName">
        <el-input v-model="listQuery.custName" placeholder="客户姓名" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="申请人" prop="userName">
        <el-input v-model="listQuery.userName" placeholder="申请人" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="期限" prop="deadline">
        <el-select v-model="listQuery.deadline" size="small" style="width: 174px" clearable>
          <el-option
            v-for="item in deadlineOptions"
            :key="item.dictDataKey"
            :label="item.dictDataValue"
            :value="item.dictDataValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请开始时间" prop="pStartTimeStart">
        <DatePicker :model.sync="listQuery.pStartTimeStart" placeholder="选择开始日期" style="width: 174px" :max-date="listQuery.pStartTimeEnd"></DatePicker>
      </el-form-item>
      <el-form-item label="申请结束时间" prop="pStartTimeEnd">
        <DatePicker :model.sync="listQuery.pStartTimeEnd" placeholder="选择结束日期" style="width: 174px" :min-date="listQuery.pStartTimeStart"></DatePicker>
      </el-form-item>
      <el-form-item label="产品类型" prop="productName">
        <el-select v-model="listQuery.productName" size="small" style="width: 174px" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.dictDataKey"
            :label="item.dictDataValue"
            :value="item.dictDataValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button size="small" type="success" v-loading="claimLoading" @click="claimTask"
                   v-if="$store.getters.buttons.includes('btnClaim')"
                   :disabled="multipleSelection.length <= 0">签收</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="进件编号" min-width="100px">
        <template scope="scope">
          <span>{{ scope.row.businessKey }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="证件类型" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.certTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="证件号" min-width="180px">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品类型" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.productName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请金额" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.applyAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="期限" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.deadLine}}</span>
        </template>
      </el-table-column>

      <el-table-column label="还款方式" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.applyRepayTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请日期" min-width="180px" align="center">
        <template scope="scope">
          <span>{{scope.row.pStartTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="流程状态" min-width="400px">
        <template scope="scope">
          <span>{{statusMap[scope.row.processStatus]}}</span>
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

  </div>
</template>

<script>
  import { getClaimTasks, claimTask } from '@/api/task'
  import Utils from '@/utils/common'

  export default {
    name: 'tasks-list',
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        claimLoading: false,
        currentPage: 1,
        total: 0,
        deadlineOptions: [],
        statusOptions: [],
        multipleSelection: [],
        newCreditLoanProcess: [],
        statusMap: null,
        listQuery: {
          certNo: '',
          custName: '',
          userName: '',
          deadline: '',
          pStartTimeStart: null,
          pStartTimeEnd: null,
          productName: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
      dateFilter(date) {
        if (date) {
          return date.substring(0, date.indexOf('.'))
        }
        return '-'
      }
    },
    created() {
      this.listLoading = true
      Utils.getDictMap('NEW_CREDIT_LOAN_PROCESS', data => {
        this.statusMap = data
        this.getList()
      })
      Utils.getDictData('LOAN_PRODUCT', data => {
        this.statusOptions = data
      })
      Utils.getDictData('DEADLINE', data => {
        this.deadlineOptions = data
      })
      Utils.getDictData('NEW_CREDIT_LOAN_PROCESS', data => {
        if (data) {
          this.newCreditLoanProcess = data
        }
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        getClaimTasks(this.listQuery).then(response => {
          this.total = response.count
          this.list = response.data
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
      startDateChange(date) {
        this.listQuery.pStartTimeStart = date
      },
      endDateChange(date) {
        this.listQuery.pStartTimeEnd = date
      },
      search() {
        this.searchLoading = true
        this.currentPage = 1
        this.getList()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      claimTask() {
        if (this.multipleSelection.length <= 0) {
          Utils.warning(`请选择要签收的任务`)
          return
        }
        this.claimLoading = true
        claimTask({
          activitiComplteVos: this.multipleSelection
        }).then(response => {
          this.claimLoading = false
          Utils.success('签收成功')
          this.getList()
        }).catch(error => {
          console.log(error)
          this.claimLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
