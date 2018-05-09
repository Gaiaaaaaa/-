<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="105px" :inline="true" style="margin-bottom:15px">
      <el-form-item label="客户姓名:" prop="custName">
        <el-input v-model.trim="listQuery.custName" size="small" placeholder="客户姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="certNo">
        <el-input v-model.trim="listQuery.certNo" size="small" placeholder="身份证号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="借款协议编号:" prop="agreementNo">
        <el-input v-model.trim="listQuery.agreementNo" size="small" placeholder="借款协议编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="订单状态:" prop="isSettle">
        <el-select clearable  v-model.trim="listQuery.isSettle" placeholder="请选择" size="small" style="width: 174px">
          <el-option v-for="item in Settles" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="还款日:" prop="repayDay" :rules="[{pattern:/^((0?[1-9])|((1|2)[0-9])|30|31)$/,message:'请输入1~31之间的数值', trigger:'blur'}]">
        <el-input v-model.trim="listQuery.repayDay" size="small" placeholder="还款日" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="账户状态:" prop="status">
        <el-select clearable  v-model.trim="listQuery.status" placeholder="请选择" size="small" style="width: 174px">
          <el-option v-for="item in accountStatus" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="search">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到期还款日:">
        <el-form-item prop="repayDateStart">
          <DatePicker :model.sync="listQuery.repayDateStart" placeholder="选择开始日期" style="width: 174px"></DatePicker>
        </el-form-item>
        <span style="margin:0 5px">至</span>
        <el-form-item prop="repayDateEnd">
          <DatePicker :model.sync="listQuery.repayDateEnd" placeholder="选择结束日期" style="width: 174px" @keyup.enter.native="search"></DatePicker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="还款状态:" prop="currStatus">
        <el-select clearable  v-model.trim="listQuery.currStatus" placeholder="请选择" size="small" style="width: 174px">
          <el-option v-for="item in currStatus" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="search">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" v-loading="searchLoading" @click="search" size="small" @keyup.enter.native="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading.body="listLoading" :data="list" border stripe fit style="width: 100%;margin-bottom:15px">
      <el-table-column label="#" width="70" align="center">
        <template scope="scope">
          {{indexMethod(scope.$index)}}
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="协议编号" width="260" align="center">
        <template scope="scope">
          <span>{{ scope.row.agreementNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" width="120" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" width="230" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行存管账号" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.cgAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="存管账户余额" width="180" height="35" align="center">
        <template scope="scope">
          <span v-if="scope.row.cg_balance_none">{{scope.row.cgBalance}}</span>
          <el-button v-if="scope.row.cg_btn_hide" @click="queryCGBalance(scope.row)" type="text">查询余额</el-button>
        </template>
      </el-table-column>
      <el-table-column label="富友账户" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.fyAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="富友账户余额" width="150" height="35" align="center">
        <template scope="scope">
          <span v-if="scope.row.fy_balance_none">{{scope.row.fyBalance}}</span>
          <el-button v-if="scope.row.fy_btn_hide" @click="queryFYBalance(scope.row)" type="text">查询余额</el-button>
        </template>
      </el-table-column>
      <el-table-column label="还款日" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.repayDay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本期还款日" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.repayDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本期还款状态" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{repayStatusOption[scope.row.repayStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户状态" width="120" height="35" align="center">
        <template scope="scope">
          <span>{{ACCOUNT_STATUS[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="120" height="35" align="center">
        <template scope="scope">
          <span>{{ORDER_STATUS[scope.row.isSettle]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款计划表" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.replayPlan}}</span>
          <el-button @click="toView(scope.row)" type="text">还款计划</el-button>
        </template>
      </el-table-column>
      <el-table-column label="充值记录" width="180" height="35" align="center">
        <template scope="scope">
          <el-button type="text" @click="show_record(scope.row)">充值记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="存管充值记录查询" :visible.sync="dialogShow">
      <el-table :data="gridData" border>
        <el-table-column label="充值时间" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.opTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值金额" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.amt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易渠道" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.channalDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易结果" min-width="100" align="center">
          <template scope="scope">
            <span>{{scope.row.statusDesc}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChangeOne" @current-change="handleCurrentChangeOne" :current-page.sync="pageOne" :page-size="pageSizeAmtOne" layout="total, prev, pager, next" :total="totalAmtOne">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { getList, getCGBalance,getFYBalance, getrecharge } from "@/api/queryAccount";
export default {
  data() {
    return {
      Settles: [
        {
          value: 0,
          label: "未结清"
        },
        {
          value: 1,
          label: "已结清"
        }
      ],
      accountStatus: [
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "逾期"
        }
      ],
      ACCOUNT_STATUS: {
        0: "正常",
        1: "逾期"
      },
      ORDER_STATUS: {
        0: "未结清",
        1: "已结清"
      },
      currStatus: [
        {
          value: 1,
          label: "本期未还清"
        }, {
          value: 2,
          label: "未到期"
        }, {
          value: 3,
          label: "逾期本息未还清"
        }, {
          value: 4,
          label: "罚息未还清"
        }
      ],
      repayStatusOption: {
        "1": '未到期',
        "2": '本期未还清',
        "3": '本期已还清',
        "4": '本息未还清',
        "5": '本期本息已还清',
        "6": '本期已还清'
      },
      dialogShow: false,
      searchLoading: false,
      listLoading: false,
      list: null,
      gridData: null,
      totalAmtOne: 0,
      pageOne: 1,
      pageSizeAmtOne: 10,
      currentPageOne: 1,
      currentRowsOne: 10,
      total: 0,
      currentPage: 1,
      currentRows: 10,
      listQuery: {
        custName: null,
        certNo: null,
        agreementNo: null,
        isSettle: null,
        repayDate: null,
        status: null,
        repayDateStart: null,
        repayDateEnd: null,
        currStatus: null,
        page: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getenquiryList();
    // this.show_record()
  },
  methods: {
    getenquiryList() {
      this.listLoading = true;
      getList(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          this.list.forEach((item, index) => {
            if(item.fyAccount!=null){
                Vue.set(item, "fy_btn_hide", true);
                Vue.set(item, "fy_balance_none", false);
            }
            if(item.cgAccount!=null){
                Vue.set(item, "cg_btn_hide", true);
                Vue.set(item, "cg_balance_none", false);
            }
          });
          this.currentPage = this.listQuery.page;
          this.currentRows = this.listQuery.pageSize;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
    },

    search() {
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.getenquiryList();
    },

    handleSizeChange(n) {
      this.listQuery.rows = n;
      this.getenquiryList();
    },
    handleCurrentChange(n) {
      this.listQuery.page = n;
      this.getenquiryList();
    },
    handleSizeChangeOne(n) {
      this.gridData.rows = n;
      this.show_record();
    },
    handleCurrentChangeOne(n) {
      this.gridData.pageOne = n;
      this.show_record();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    indexMethod(index) {
      return index + this.currentRows * (this.currentPage - 1) + 1;
    },
    //富友余额查询
    queryFYBalance(row) {
      if (row != null) {
        var subAccount = row.subAccount;
        row.fy_balance_none = true;
        getFYBalance(subAccount)
          .then(response => {
            if (response.count == 0) {
              row.fy_btn_hide = false;
              row.fyBalance = response.data;

            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    //存管余额查询
    queryCGBalance(row) {
      if (row != null) {
        var custCode = row.custCode;
        row.cg_balance_none = true;
        getCGBalance(custCode)
          .then(response => {
            if (response.count == 0) {
              row.cg_btn_hide = false;
              row.cgBalance = response.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //充值记录查询
    show_record(row) {
      if (row != null) {
        var agreementNo = row.agreementNo;
        getrecharge(agreementNo)
          .then(response => {
            if ((response.data == null)) {
              this.dialogShow = false;
            } else {
              this.dialogShow = true;
            }
            // this.totalAmtOne = response.count;
            this.gridData = response.data;
            // this.currentPageOne = this.gridData.pageOne;
            // this.currentRowsOne = this.gridData.pageSizeAmtOne;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    toView(row) {
      this.$router.push({
        path: `/repayment/repaymentPlan/${row.agreementNo}`
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
