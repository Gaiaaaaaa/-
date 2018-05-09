<template>
<div>
  <div class="app-container calendar-list-container">
  <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="100px" :inline="true">
          <el-form-item label="身份证号" prop="certNo">
           <el-input v-model="listQuery.certNo" placeholder="身份证号" size="small" @keyup.enter.native="search"></el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="custName" class="custName">
             <el-input v-model="listQuery.custName" placeholder="姓名" size="small" @keyup.enter.native="search"></el-input>
         </el-form-item>

          <el-form-item label="协议编号" prop="agreementNo">
            <el-input v-model="listQuery.agreementNo" placeholder="协议编号" size="small" @keyup.enter.native="search"></el-input>
         </el-form-item>
         <el-form-item label="申请人" prop="creatorName">　
           <el-input v-model="listQuery.creatorName" placeholder="客户经理" size="small" @keyup.enter.native="search"></el-input>
         </el-form-item>

         <el-form-item label="放款营业部" prop="dptName">
           <el-input v-model="listQuery.dptName" placeholder="放款营业部" size="small" @keyup.enter.native="search"></el-input>
         </el-form-item>
        <el-form-item>
        <el-form-item label="订单状态" prop="itemStatusKey">
        <el-select v-model="listQuery.itemStatusKey" size="small" clearable>
          <el-option
          v-for="item in statusOptions"
          :key="item.dictDataKey"
          :label="item.dictDataValue"
          :value="item.dictDataKey">
        </el-option>
        </el-select>
      </el-form-item>  
          <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
          <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
    </el-form>
    <!-- <el-form>
      <el-form-item>
          <el-button size="small" type="primary" @click="handleEdit">客户姓名变更</el-button>
          <el-button size="small" type="primary" @click="showEditDialog">客户姓名变更记录</el-button>
      </el-form-item>
    </el-form> -->

    <el-table  ref="singleTable"  tooltip-effect="dark"  :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">

      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column align="center" label="协议编号" min-width="180px">
        <template scope="scope">
          <el-button type="text" size="medium" @click="toView(scope.row)">{{scope.row.agreementNo}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="进件编号" min-width="100px" align="center">
        <template scope="scope">
          <span>{{ scope.row.ipiecesNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户姓名" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份证号" min-width="180px" align="center">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户经理" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.founder}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.creatorName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="放款营业部" min-width="150px" align="center">
        <template scope="scope">
          <span>{{scope.row.dptName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="管理营业部" min-width="150px" align="center">
        <template scope="scope">
          <span>{{scope.row.businessName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期" min-width="120px" align="center">
        <template scope="scope">
          <span>{{scope.row.createTime|dateFormat('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品类型" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.financeProductValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请日期" min-width="120px" align="center">
        <template scope="scope">
          <span>{{scope.row.applyTime|dateFormat('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.itemStatusValue}}</span>
        </template>
      </el-table-column>

      <el-table-column label="渠道来源" min-width="100px" align="center">
        <template scope="scope">
          <span>{{scope.row.appChannelSourceValue}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"  align="center" min-width="180px" label="操作"
                       v-if="$store.getters.buttons.includes('btnAlterationCustomerNameChange') || $store.getters.buttons.includes('btnAlterationCustomerNameChangeRecord')">
        <template scope="scope">
          <el-button  @click="handleEdit(scope.row)" type="text"
                      v-if="$store.getters.buttons.includes('btnAlterationCustomerNameChange')" :disabled="scope.row.subAccountId || scope.row.itemStatusKey=='014'">变更</el-button>
          <el-button  @click="showEditDialog(scope.row)" type="text"
                      v-if="$store.getters.buttons.includes('btnAlterationCustomerNameChangeRecord')">记录</el-button>
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

     <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList"  @getList="getList" :dataId="dataId"></edit-modal>
    <transfer-modal v-if="showTransfer" @close="showTransfer = false" @getList="getList" :custId= "dataId.custId"></transfer-modal>

  </div>
</div>
</template>
<script>
  import EditModal from './edit'
  import TransferModal from './transfer'
  import { getselectChangeName, getOrderStatus } from '@/api/order'
  import Utils from '@/utils/common'

  export default {
    // name: 'order-list',
      components: {
      EditModal,
      TransferModal
    },
    data() {
      return {
        NoticeiShow:false,
        showModal: false,
        showTransfer: false,
        list: null,
        dataId: {},
        statusOptions:[],
        listLoading: true,
        searchLoading: false,
        currentPage: 1,
        total: 0,
        statusMap: {},
        multipleSelection: [],
        listQuery: {
          ipiecesNo: '',
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
          return date.substring(0, date.indexOf('.'))
        }
        return '-'
      }
    },
    created() {
      this.getList()
      Utils.getDictData('ITEM_STATUS', data => {
        this.statusOptions = data;
      })
    },
    methods: {
      getList() {
        this.listLoading = true
        getselectChangeName(this.listQuery).then(response => {
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
      toView(row) {
        this.$router.push({ path: `/order/view/${row.custId}/${row.orderId}?businessKey=${row.ipiecesNo || ''}` })
      },
      toEdit(row) {
        this.$router.push({ path: `/order/edit/${row.custId}/${row.orderId}` })
      },
      doDelete(row) {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      showAddManage(){
      if(this.multipleSelection != ''){
          this.showModal = true
      }
      else{
          this.showModal = false
       }
      },

      handleEdit(item) {
        this.dataId = item;
        this.showModal = true;
      },

      showEditDialog(item) {
        this.dataId = item;
        this.showTransfer = true;
      },

    // checkbox多选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleCurrentChange1(val) {
        this.dataId = val;
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select {
    width: 175px;
  }
  .el-row {
    padding:0 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .left{
      height:40px;
      width:150px;
      float: left;
      line-height: 40px;
      font-size: 18px;
    }
    .filtrate{
        font-size:14px;
        margin-left:5px;
    }
    .right{
      height:40px;
      float: right;
    }
    .el-button{
      width: 80px;
      height:35px;
      margin-top:5px;
    }
  }
  .bg-purple-dark{
    background: red;
  }

  .alteration{
    width: 100%;
    margin-bottom:20px;
    margin-top:5px;
  }
 .use{
   padding-left:40px;
 }
 .apply-for{
   padding-left: 14px;
 }
</style>
