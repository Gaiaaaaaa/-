<template>
  <div class="app-container workflow-task-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="100px" :inline="true">
      <el-form-item label="证件号" prop="certNo">
        <el-input v-model="listQuery.certNo" placeholder="证件号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="custName">
        <el-input v-model="listQuery.custName" placeholder="客户名称" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="开始日期" prop="pStartTimeStart">
        <DatePicker :model.sync="listQuery.pStartTimeStart" placeholder="选择开始日期" style="width: 174px" :max-date="listQuery.pStartTimeEnd"></DatePicker>
      </el-form-item>
      <el-form-item label="结束日期" prop="pStartTimeEnd">
        <DatePicker :model.sync="listQuery.pStartTimeEnd" placeholder="选择结束日期" style="width: 174px" :min-date="listQuery.pStartTimeStart"></DatePicker>
      </el-form-item>
      <el-form-item label="申请人" prop="userName">
        <el-input v-model="listQuery.userName" placeholder="申请人" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="进件编号" prop="businessKey">
        <el-input v-model="listQuery.businessKey" placeholder="进件编号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border stripe fit resizable>
      <el-table-column align="center" label="进件编号" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.businessKey}}</span>
        </template>
      </el-table-column>

      <el-table-column label="流程名称" min-width="180px" v-if="this.$route.meta.isCompleteHistory || this.$route.meta.isHistoryActiciti">
        <template scope="scope">
          <span>{{ scope.row.procdefName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户名称" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" align="center">
        <template scope="scope">
          <span>{{scope.row.certTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="证件号" min-width="180px">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品名称" min-width="100px" v-if="this.$route.meta.isComplete || this.$route.meta.isHistoryActiciti">
        <template scope="scope">
          <span>{{scope.row.productName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请金额" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.applyAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="期限">
        <template scope="scope">
          <span>{{scope.row.deadLine}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人" min-width="90px">
        <template scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请时间" min-width="170px">
        <template scope="scope">
          <span>{{scope.row.pStartTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="当前节点" min-width="100px">
        <template scope="scope">
          <el-button type="text" size="small" @click="toViewFlowChart(scope.row)">{{scope.row.actName}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="营业部名称" min-width="200px" v-if="this.$route.meta.isComplete || this.$route.meta.isHistoryActiciti">
        <template scope="scope">
          <span>{{scope.row.dptName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="任务创建时间" min-width="170px" v-if="this.$route.meta.isHistoryActiciti || this.$route.meta.isCompleteHistory">
        <template scope="scope">
          <span>{{scope.row.tCreateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="流程状态" min-width="400px">
        <template scope="scope">
          <span>{{statusMap[scope.row.processStatus]}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" :min-width="canOperate ? '140px' : '70px'">
        <template scope="scope">
          <el-button type="text" size="small" @click="toHandle(scope.row)"
                     v-if="canOperate && $store.getters.buttons.includes('btnPendingTaskHandle')">办理</el-button>
          <el-button type="text" size="small" @click="toView(scope.row)"
                     v-if="$store.getters.buttons.includes('btnPendingTaskView')">查看</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.row)"
                     v-if="canOperate && $store.getters.buttons.includes('btnOrderEdit')"
                     :disabled="scope.row.statusKey !== '013' && scope.row.statusKey !== '015'">修改</el-button>
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

    <!-- 流程图弹框区 -->
    <el-dialog title="工作流程图" :visible.sync="workFlowDialog" size="large">
      <img :src="processImageSrc" style="width: 100%; height: 100%;" />
    </el-dialog>

  </div>
</template>

<script>
  import { getWorkflowTasks } from '@/api/task'
  import Utils from '@/utils/common'
  import { mapGetters } from 'vuex'

  export default {
    name: 'workflow-task-list',
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        workFlowDialog: false,
        processImageSrc: '',
        type: '',
        statusMap: null,
        canOperate: this.$route.meta.isComplete,
        currentPage: 1,
        total: 0,
        queryDate: null,
        listQuery: {
          certNo: '',
          custName: '',
          queryDate: '',
          pStartTimeStart: '',
          pStartTimeEnd: '',
          userName: '',
          businessKey: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    filters: {
    },
    created() {
      this.listLoading = true
      Utils.getDictMap('NEW_CREDIT_LOAN_PROCESS', data => {
        this.statusMap = data
        if (this.$route.meta.isComplete) {
          this.type = 'complete-tasks'
        } else if (this.$route.meta.isCompleteHistory) {
          this.type = 'complete-history-tasks'
        } else if (this.$route.meta.isHistoryActiciti) {
          this.type = 'history-activitis'
        }
        this.getList()
      })
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true
        getWorkflowTasks(this.type, this.listQuery).then(response => {
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
      search() {
        this.searchLoading = true
        this.currentPage = 1
        this.getList()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      toHandle(row) {
        this.$router.push({ path: `/workflow-task/handle/${row.custId}/${row.orderId}/${row.businessKey}?taskId=${row.taskId}&procInstId=${row.procInstId}` })
      },
      toView(row) {
        this.$router.push({ path: `/workflow-task/view/${row.custId}/${row.orderId}/${row.businessKey}?taskId=${row.taskId}&procInstId=${row.procInstId}` })
      },
      toViewFlowChart(row) {
        this.processImageSrc = `${process.env.BASE_API}/activiti/flow-chart.png?processInstanceId=${row.procInstId}`
        this.workFlowDialog = true
      },
      toEdit(row) {
        this.$router.push({ path: `/order/edit/${row.custId}/${row.orderId}` })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select {
    width: 100px;
  }
</style>
