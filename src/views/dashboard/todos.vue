<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="dashboard-title">待签收任务</span>
            <span class="dashboard-count">+{{claimTasks.count}}</span>
          </div>
          <el-table :data="claimTasks.data" v-loading.body="claimTasks.loading" border stripe fit style="width: 100%;min-height: 241px;">

            <el-table-column label="流程名称">
              <template scope="scope">
                <span>{{ scope.row.procdefName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="客户姓名">
              <template scope="scope">
                <span>{{scope.row.custName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="录单客服">
              <template scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="dashboard-more">
            <span @click="toMore('/workbench/tasks')">更多&gt;&gt;</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="dashboard-title">待处理任务</span>
            <span class="dashboard-count">+{{completeTasks.count}}</span>
          </div>
          <el-table :data="completeTasks.data" v-loading.body="completeTasks.loading" border stripe fit style="width: 100%;min-height: 241px;">

            <el-table-column label="流程名称">
              <template scope="scope">
                <span>{{ scope.row.procdefName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="客户姓名">
              <template scope="scope">
                <span>{{scope.row.custName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="录单客服">
              <template scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="dashboard-more">
            <span @click="toMore('/workflow-task/pending')">更多&gt;&gt;</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" style="margin-top: 20px;">
          <div slot="header" class="clearfix">
            <span class="dashboard-title">待进件任务</span>
            <span class="dashboard-count">+{{busiBasicLoans.count}}</span>
          </div>
          <el-table :data="busiBasicLoans.data" v-loading.body="busiBasicLoans.loading" border stripe fit style="width: 100%;min-height: 241px;">

            <el-table-column label="流程名称">
              <template scope="scope">
                <span>{{ scope.row.basicLoanTypeValue }}</span>
              </template>
            </el-table-column>

            <el-table-column label="金额">
              <template scope="scope">
                <span>{{scope.row.applyAmount}}</span>
              </template>
            </el-table-column>

            <el-table-column label="申请时间">
              <template scope="scope">
                <span>{{scope.row.applyTime}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="dashboard-more">
            <span @click="toMore('/order/list?status=' + itemStatus)">更多&gt;&gt;</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getClaimTasks, getCompleteTasks } from '@/api/task'
import { getBusiBasicLoan } from '@/api/order'

export default {
  name: 'dashboard',
  data() {
    const status = '001'

    return {
      itemStatus: status,
      query: {
        page: 1,
        pageSize: 5
      },
      claimTasks: {
        loading: false,
        data: [],
        count: 0
      },
      completeTasks: {
        loading: false,
        data: [],
        count: 0
      },
      busiBasicLoans: {
        loading: false,
        data: [],
        count: 0
      }
    }
  },
  created() {
    this.getClaimTasks()
    this.getCompleteTasks()
    this.getBusiBasicLoans()
  },
  methods: {
    getClaimTasks() {
      this.claimTasks.loading = true
      getClaimTasks(this.query).then(response => {
        this.claimTasks = response
        this.claimTasks.loading = false
      }).catch(error => {
        console.log(error)
        this.claimTasks.loading = false
      })
    },
    getCompleteTasks() {
      this.completeTasks.loading = true
      getCompleteTasks(this.query).then(response => {
        this.completeTasks = response
        this.completeTasks.loading = false
      }).catch(error => {
        console.log(error)
        this.completeTasks.loading = false
      })
    },
    getBusiBasicLoans() {
      this.busiBasicLoans.loading = true
      this.query.itemStatusKey = this.itemStatus
      getBusiBasicLoan(this.query).then(response => {
        this.busiBasicLoans = response
        this.busiBasicLoans.loading = false
      }).catch(error => {
        console.log(error)
        this.busiBasicLoans.loading = false
      })
    },
    toMore(path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-more {
    width: 100%;
    text-align: right;
    line-height: 35px;
  }
  &-more > span {
    cursor: pointer;
    color: #58B7FF;
  }
  &-title {
    line-height: 24px;
  }
  &-count {
    float: right;
    padding: 3px 6px;
    background-color: #58B7FF;
    border-radius: 5px;
    color: white;
  }
}
</style>
