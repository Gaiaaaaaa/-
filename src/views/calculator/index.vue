<template>
  <div class="app-container calendar-list-container" v-loading="searchLoading">
    <el-form class="form-container" :model="listQuery" ref="searchForm" label-width="120px" :inline="true">
      <el-form-item label="借款金额" prop="creditAmt"
        :rules="[{ required: true, message: '借款金额不能为空'}, { type: 'number', message: '借款金额为数字值' }]">
        <el-input v-model.number="listQuery.creditAmt" placeholder="借款金额" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="借款期限" prop="totalTerm"
        :rules="[{ required: true, message: '借款期限不能为空' }]">
        <el-select v-model="listQuery.totalTerm" value-key="dictDataKey" size="small" style="width: 174px" clearable>
          <el-option
            v-for="item in deadlineOptions"
            :key="item.dictDataKey"
            :label="item.dictDataValue"
            :value="item.dictDataValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="还款方式" prop="paymentType"
        :rules="[{ required: true, message: '还款方式不能为空' }]">
        <el-select v-model="listQuery.paymentType" value-key="dictDataKey" size="small" style="width: 174px" clearable>
          <el-option
            v-for="item in paymentTypeOptions"
            :key="item.dictDataKey"
            :label="item.dictDataValue"
            :value="item.dictDataKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年利率（%）" prop="rate"
        :rules="[{ required: true, message: '年利率不能为空' }]">
        <el-select v-model="listQuery.rate" value-key="dictDataKey" size="small" style="width: 174px" clearable>
          <el-option
            v-for="item in rateTypeOptions"
            :key="item.dictDataKey"
            :label="item.dictDataValue"
            :value="item.dictDataKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="综合费率（%）" prop="fRate"
        :rules="[{ required: true, message: '综合费率不能为空' }, { validator: validateFrate }]">
        <el-input v-model="listQuery.fRate" placeholder="综合费率（%）" size="small" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border stripe fit style="width: 100%">

      <el-table-column align="center" label="期数" min-width="50px">
        <template scope="scope">
          <span>{{ scope.row.term_No }}</span>
        </template>
      </el-table-column>

      <el-table-column label="月还款额" min-width="100px">
        <template scope="scope">
          <span>{{scope.row.month_Repay}}</span>
        </template>
      </el-table-column>

      <el-table-column label="月还款本金" min-width="110px">
        <template scope="scope">
          <span>{{scope.row.principal_Amt}}</span>
        </template>
      </el-table-column>

      <el-table-column label="月还款利息" min-width="110px">
        <template scope="scope">
          <span>{{scope.row.interest_Amt}}</span>
        </template>
      </el-table-column>

      <el-table-column label="剩余未还本金" min-width="120px">
        <template scope="scope">
          <span>{{scope.row.residue_Principal}}</span>
        </template>
      </el-table-column>

      <el-table-column label="提前结清违约金" min-width="150px">
        <template scope="scope">
          <span>{{scope.row.early_Settlement}}</span>
        </template>
      </el-table-column>

      <el-table-column label="提前结清还款总金额" min-width="150px">
        <template scope="scope">
          <span>{{scope.row.early_Total}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { assetTool } from '@/api/cta'
  import Utils from '@/utils/common'

  export default {
    name: 'calculator',
    data() {
      return {
        list: null,
        searchLoading: false,
        deadlineOptions: {},
        paymentTypeOptions: [],
        rateTypeOptions: [],
        listQuery: {
          creditAmt: '',
          totalTerm: '',
          paymentType: '',
          rate: '',
          fRate: ''
        }
      }
    },
    created() {
      Utils.getDictData('DEADLINE', data => {
        this.deadlineOptions = data
      })
      Utils.getDictData('REPAY_WAY', data => {
        this.paymentTypeOptions = data
      })
      Utils.getDictData('ANNUAL_INTERESET_RATE', data => {
        this.rateTypeOptions = data
      })
    },
    methods: {
      search() {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            this.searchLoading = true
            assetTool(this.listQuery).then(response => {
              this.list = response.data.list
              this.searchLoading = false
            }).catch(error => {
              console.log(error)
              this.searchLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      validateFrate(rule, value, callback) {
        if (parseFloat(value) < 1) {
          return callback(new Error('参数有误 例: 2.5=0.025'))
        } else {
          callback()
        }
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
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
