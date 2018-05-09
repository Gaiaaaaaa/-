<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" ref="listQuery" :rules="rules" label-width="100px" :inline="true">
      <el-form-item label="客户姓名 :" prop="custName">
        <el-input v-model="listQuery.custName" size="small" placeholder="客户姓名" @keyup.enter.native="search"></el-input>

      </el-form-item>
      <el-form-item label="证件号 :" prop="certNo">
        <el-input v-model="listQuery.certNo" size="small" placeholder="身份证号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="银行账号 :" prop="bankAcct">
        <el-input v-model="listQuery.bankAcct" size="small" placeholder="银行账号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" v-loading="searchLoading" @click="search" size="small" @keyup.enter.native="search">查询</el-button>
        <el-button size="small" @click="resetForm('listQuery')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading.body="listLoading" :data="list" border stripe fit style="width: 100%;margin-bottom:15px;margin-top: 20px;">
      <el-table-column label="协议编号" width="260" align="center">
        <template scope="scope">
          <span>{{ scope.row.agreementNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" width="200" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.custName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户类型" width="150" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.custTypeValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件类型" width="100" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.certTypeValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号" width="100" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.certNo}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="100" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.telephone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户银行" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.bankName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户银行账号" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.bankAcct}}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款银行账号" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.bankAcct}}</span>
        </template>
      </el-table-column>
      <el-table-column label="第三方机构" width="210" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.custThirdTypeValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="子账户号" width="100" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.subAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户日期" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.dateOpened |dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="放款营业部" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.businessName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="180" height="35" align="center">
        <template scope="scope">
          <span>{{scope.row.itemStatusValue}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210" v-if="$store.getters.buttons.includes('btnAlterationBankCardChange') || $store.getters.buttons.includes('btnAlterationBankCardChangeRecord')">
        <template scope="scope">
          <el-button @click="changeTheBankCard(scope.row)" type="text" size="small" v-if="$store.getters.buttons.includes('btnAlterationBankCardChange')">变更开户银行卡</el-button>
          <el-button @click="changeTheBankCardRecord(scope.row)" type="text" size="small" v-if="$store.getters.buttons.includes('btnAlterationBankCardChangeRecord')">变更银行卡记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <edit-modal v-if="showModal" @close="showModal = false" @getList="getList" :itemData="itemData"></edit-modal>
    <updateHis-modal v-if="showTransfer" @close="showTransfer = false" @getList="getList" :custId="custId"></updateHis-modal>
  </div>
</template>

<script>
import EditModal from "./edit";
import UpdateHisModal from "./updateHis";
import Utils from "@/utils/common";
import { getInfo } from "@/api/bank-card";
import dateFormat from "dateformat";

export default {
  components: {
    EditModal,
    UpdateHisModal
  },
  data() {
    return {
      searchLoading: false,
      listLoading: false,
      showModal: false,
      showTransfer: false,
      list: null,
      total: 0,
      currentPage: 1,
      currentRows: 10,
      custId: {
        type: Number,
        default: null
      },
      itemData: {
        type: Object,
        default: {}
      },
      listQuery: {
        custName: null,
        bankAcct: null,
        certNo: null,
        page: 1,
        pageSize: 10
      }
    };
  },
  filters: {
    dateFilter(date) {
      return dateFormat(date, "yyyy-mm-dd HH:MM");
    }
  },
  created() {
    //  this.getList()
    Utils.getDictData("ITEM_STATUS", data => {
      this.statusOptions = data;
      for (var n = 0; n < this.statusOptions.length; n++) {
        if (this.statusOptions[n].dictDataKey == "001") {
          this.statusOptions[n].disabled = true;
        }
        if (this.statusOptions[n].dictDataKey == "012") {
          this.statusOptions[n].disabled = true;
        }
      }
    });
  },
  methods: {
    getList() {
      this.listLoading = true;
      var _this = this;
      getInfo(this.listQuery)
        .then(response => {
          this.total = response.count;
          this.list = response.data;
          console.log(this.list);
          this.currentPage = this.listQuery.page;
          this.currentRows = this.listQuery.rows;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(function(error) {
          console.log(error);
          _this.listLoading = false;
          _this.searchLoading = false;
        });
    },
    changeTheBankCard(row) {
      this.itemData = row;
      this.showModal = true;
    },
    changeTheBankCardRecord(row) {
      console.log(row);
      this.showTransfer = true;
      this.custId = row.basicCustId;
    },
    handleSizeChange(n) {
      this.listQuery.rows = n;
      this.getList();
    },
    handleCurrentChange(n) {
      this.listQuery.page = n;
      this.getList();
    },
    search() {
      this.$refs["listQuery"].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>

</style>
