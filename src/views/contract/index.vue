<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="客户名称:" prop="custName">
        <el-input v-model="listQuery.custName" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="certNo">
        <el-input v-model="listQuery.certNo" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="合同编号:" prop="contractNo">
        <el-input v-model="listQuery.contractNo" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="协议编号:" prop="agreementNo">
        <el-input v-model="listQuery.agreementNo" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="放款营业部:" prop="telephone" >
        <el-input width="2000" v-model="listQuery.businessName" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="签约日期 : " prop="contractDateStart">
        <el-date-picker
          v-model="listQuery.contractDateStart"
          align="right"
          @change="contractStartChange"
          type="date"
          size="small"
          placeholder="选择日期"
          :picker-options="pickerOptions1" style="width:120px;">
        </el-date-picker>

        <span class="form-static">至</span>
        <el-date-picker
          v-model="listQuery.contractDateEnd"
          align="right"
          @change="contractEndChange"
          type="date"
          size="small"
          placeholder="选择日期"
          :picker-options="pickerOptions2" style="width:120px;">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="放款日期:" prop="creditedDateStart" >
        <el-date-picker
          v-model="listQuery.creditedDateStart"
          align="right"
          @change="creditedStartChange"
          type="date"
          size="small"
          placeholder="选择日期"
          :picker-options="pickerOptions3" style="width:120px;">
        </el-date-picker>
        <span class="form-static">至</span>
        <el-date-picker
          v-model="listQuery.creditedDateEnd"
          align="right"
          size="small"
          @change="creditedEndChange"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions4" style="width:120px;">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column width="100" label="客户名称">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="证件号码">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="合同编号">
        <template scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.contractNo}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="协议编号">
        <template scope="scope">
          <span>{{scope.row.agreementNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="产品名称">
        <template scope="scope">
          <span>{{scope.row.financeProductValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  width="100" label="借款期数">
        <template scope="scope">
          <span>{{scope.row.term}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="合同金额">
        <template scope="scope">
          <span>{{scope.row.contractAount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="放款金额">
        <template scope="scope">
          <span>{{scope.row.loanAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="签约日期">
        <template scope="scope">
          <span>{{scope.row.contractDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="放款日期">
        <template scope="scope">
          <span>{{scope.row.creditedDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="开始日期">
        <template scope="scope">
          <span>{{scope.row.repayStartDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="结束日期">
        <template scope="scope">
          <span>{{scope.row.repayEndDate }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="申请人">
        <template scope="scope">
          <span>{{scope.row.creatorName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="放款营业部">
        <template scope="scope">
          <span>{{scope.row.departName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="合同状态">
        <template scope="scope">
          <span>{{scope.row.itemStatusValue}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" width="120" label="还款计划表"
                       v-if="$store.getters.buttons.includes('btnContractViewPlan')">
        <template scope="scope">
          <el-button  @click="handleEdit(scope.row)" type="text">预览</el-button>
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

    <edit-modal v-if="showModal" :agreementNo="agreementNo" @close="showModal = false"></edit-modal>
  </div>
</template>

<script>
  import { getContractList } from '@/api/contract'
  import EditModal from './replayment-list.vue'

  export default {
    name: 'role-list',
    components: {
      EditModal
    },
    data() {
      return {
        showModal: false,
        list: null,
        agreementNo: '',  // 协议编号
        listLoading: false,
        searchLoading: false,
        validOptions: [],
        currentPage: 1,
        itemStatusKey: '',
        total: 0,
        listQuery: {
          custName: '',
          certNo: '',
          agreementNo: '',
          contractNo: '',
          contractDateStart: '',
          contractDateEnd: '',
          creditedDateStart: '',
          creditedDateEnd: '',
          businessName: '',
          itemStatusKey: '',
          page: 1,
          pageSize: 10
        },
        pickerOptions1: {
          shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }],
          disabledDate: (time) => {
            if (this.listQuery.contractDateEnd != "") {
              return time.getTime() > new Date(this.listQuery.contractDateEnd);
            }
          }
        },
        pickerOptions2: {
          shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }],
          disabledDate: (time) => {
            if (this.listQuery.contractDateStart != "") {
              return time.getTime() < new Date(this.listQuery.contractDateStart);
            }
          }
        },
        pickerOptions3: {
          shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }],
          disabledDate: (time) => {
            if (this.listQuery.creditedDateEnd != "") {
              return time.getTime() > new Date(this.listQuery.creditedDateEnd);
            }
          }
        },
        pickerOptions4: {
          shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }],
          disabledDate: (time) => {
            if (this.listQuery.creditedDateStart != "") {
              return time.getTime() < new Date(this.listQuery.creditedDateStart);
            }
          }
        },
      }
    },
    created() {
      this.getList()
    },
    filter: {
      formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf('.'))
        }
        return '-'
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        getContractList(this.listQuery).then(response => {
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
      contractStartChange(value) {
        this.listQuery.contractDateStart = value
      },
      contractEndChange(value) {
        this.contractDateEnd = value
      },
      creditedStartChange(value) {
        this.creditedDateStart = value
      },
      creditedEndChange(value) {
        this.creditedDateEnd = value
      },
      handleEdit(row) {
        this.agreementNo = row.agreementNo
        this.showModal = true
      },
      toView(row) {
        this.$router.push({ path: `/contract/view/${row.agreementNo}` })
      }
    }
  }
</script>
<style scoped>
  .form-static{
    padding:0 10px
  }
</style>

