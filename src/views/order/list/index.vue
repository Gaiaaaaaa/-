<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="100px" :inline="true">
      <el-form-item label="身份证号" prop="certNo">
        <el-input v-model="listQuery.certNo" placeholder="身份证号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="custName">
        <el-input v-model="listQuery.custName" placeholder="姓名" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="协议编号" prop="agreementNo">
        <el-input v-model="listQuery.agreementNo" placeholder="协议编号" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="申请客服" prop="creatorName">
        <el-input v-model="listQuery.creatorName" placeholder="申请客服" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="放款营业部" prop="dptName">
        <el-input v-model="listQuery.dptName" placeholder="放款营业部" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="itemStatusKey">
        <el-select v-model="listQuery.itemStatusKey" size="small" style="width: 174px" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.dictDataKey"
            :label="item.dictDataValue"
            :value="item.dictDataKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <!--<el-button size="small" type="primary" @click="applyConfirm" :disabled="disableApplyButton">申请</el-button>-->
        <el-button size="small" type="primary" @click="exportOrder" v-loading="exportLoading"
                   v-if="$store.getters.buttons.includes('btnOrderExport')">导出</el-button>
        <el-button size="small" type="warning" v-loading="cancelLoading" @click="cancel" :disabled="disableCancel"
                   v-if="$store.getters.buttons.includes('btnOrderCancel')">取消</el-button>
        <!--<el-button size="small" type="success" @click="">查看信审修改记录</el-button>-->
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" @selection-change="handleSelectionChange" @row-click="rowClickSelect" ref="multipleTable" border stripe fit style="width: 100%">

      <el-table-column
        type="selection" >
      </el-table-column>

      <el-table-column align="center" label="协议编号" min-width="180px">
        <template scope="scope">
          <span>{{scope.row.agreementNo}}</span>
        </template>
      </el-table-column>

      <el-table-column label="进件编号" min-width="100px">
        <template scope="scope">
          <span>{{ scope.row.ipiecesNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份证号" min-width="180px">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户经理" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.founder}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请客服" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.creatorName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="放款营业部" min-width="150px">
        <template scope="scope">
          <span>{{scope.row.dptName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="管理营业部" min-width="150px">
        <template scope="scope">
          <span>{{scope.row.businessName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期" min-width="110px" align="center">
        <template scope="scope">
          <span>{{scope.row.createTime | dateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品类型" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.financeProductValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品金额" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.applyAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品期限" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.deadlineValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请日期" min-width="110px" align="center">
        <template scope="scope">
          <span>{{scope.row.applyTime | dateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.itemStatusValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="渠道来源" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.appChannelSourceValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="签约时间" min-width="110px" align="center">
        <template scope="scope">
          <span>{{scope.row.contractDate | dateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="再次进件时间" min-width="130px" align="center">
        <template scope="scope">
          <span>{{scope.row.againIntoPieceTime | dateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="命中代码" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.hitCode}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="180px" align="center" fixed="right"
        v-if="$store.getters.buttons.includes('btnOrderApply') || $store.getters.buttons.includes('btnOrderEdit') || $store.getters.buttons.includes('btnOrderDelete')">
        <template scope="scope">
          <el-button type="text" size="small" @click="toView(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="applyConfirm(scope.row)" :disabled="scope.row.itemStatusKey !== '001'"
                     v-if="$store.getters.buttons.includes('btnOrderApply')">申请</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.row)"
                     :disabled="scope.row.itemStatusKey !== '012' && scope.row.itemStatusKey !== '001'
                     && scope.row.itemStatusKey !== '015' && scope.row.itemStatusKey !== '013'"
                     v-if="$store.getters.buttons.includes('btnOrderEdit')">编辑</el-button>
          <el-button type="text" size="small" @click="doDeleteConfirm(scope.row)" :disabled="scope.row.itemStatusKey !== '012'" class="text-danger"
                     v-if="$store.getters.buttons.includes('btnOrderDelete')">删除</el-button>
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
  import dateFormat from 'dateformat'
  import { getBusiBasicLoan, applyOrder, deleteOrder, cancelOrder, exportExcel } from '@/api/order'
  import Utils from '@/utils/common'

  export default {
    name: 'order-list',
    data() {
      return {
        list: null,
        listLoading: true,
        searchLoading: false,
        cancelLoading: false,
        exportLoading: false,
        currentPage: 1,
        total: 0,
        statusOptions: [],
        statusMap: {},
        disableApplyButton: true,
        disableCancel: true,
        multipleSelection: [],
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
        if (date) {
          return dateFormat(date, 'yyyy-mm-dd')
        }
        return '-'
      }
    },
    created() {
      this.getList()
      Utils.getDictData('ITEM_STATUS', data => {
        this.statusOptions = data
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        getBusiBasicLoan(this.listQuery).then(response => {
          this.total = response.count
          this.list = response.data
          this.listLoading = false
          this.searchLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
          this.searchLoading = false
        })
        if (this.multipleSelection) {
          this.multipleSelection = []
        }
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
      exportOrder() {
        this.$confirm('确认导出"有退回至客服记录"的所有订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.exportLoading = true;
          exportExcel(this.listQuery).then(response => {
            this.exportLoading = false;
          }).catch(error => {
            console.log(error)
            this.exportLoading = false
          })
        }).catch(() => {
        })
      },
      cancel() {
        if (this.multipleSelection.length <= 0) {
          Utils.warning(`请选择要取消的订单`)
          return
        }
        this.$confirm('确认取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cancelLoading = true
          this.multipleSelection.forEach(item => {
            item.businessKey = item.ipiecesNo
            item.procInstId = item.processInstanceId
          })
          cancelOrder({
            activitiComplteVos: this.multipleSelection
          }).then(response => {
            this.cancelLoading = false
            Utils.success('取消成功')
            this.getList()
          }).catch(error => {
            console.log(error)
            this.cancelLoading = false
          })
        }).catch(() => {
        })
      },
      toView(row) {
        this.$router.push({ path: `/order/view/${row.custId}/${row.orderId}?businessKey=${row.ipiecesNo || ''}` })
      },
      toEdit(row) {
        this.$router.push({ path: `/order/edit/${row.custId}/${row.orderId}?businessKey=${row.ipiecesNo || ''}` })
      },
      doDeleteConfirm(data) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteOrder(data.orderId).then(response => {
            Utils.success('删除成功')
            this.getList()
          }).catch(error => {
            console.log(error)
            this.listLoading = false
          })
        }).catch(() => {
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        if (this.multipleSelection.length > 0) {
          this.disableCancel = false
          this.multipleSelection.forEach(item => {
            // (申请中 013，质检中 015，待签约 004，已签约 005)可取消 新流程
            if (item.itemStatusKey !== '013' &&
              item.itemStatusKey !== '015' &&
              item.itemStatusKey !== '004' &&
              item.itemStatusKey !== '005') {
              this.disableCancel = true
            }
          })
        } else {
          this.disableCancel = true
        }
      },
      rowClickSelect(val) {
        this.$refs.multipleTable.toggleRowSelection(val)
      },
      applyConfirm(data) {
        this.$confirm('确认申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          applyOrder(data.orderId).then(response => {
            Utils.success('申请成功')
            this.getList()
          }).catch(error => {
            if(error.code === '111111') {
              this.$alert(error.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.getList()
                }
              })
            }
            this.listLoading = false
          })
        }).catch(() => {
        })
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
