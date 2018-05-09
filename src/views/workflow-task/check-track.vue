<template>
  <div class="check-track-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进件信息</span>
      </div>
      <el-form label-width="100px" v-loading="dataLoading">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="申请编号">
              {{data.loanNo }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :md="{span: 8}" :sm="{span: 12}" :xs="{span: 24}">
            <el-form-item label="客户名称">
              {{data.custName }}
            </el-form-item>
          </el-col>
          <el-col :md="{span: 8}" :sm="{span: 12}" :xs="{span: 24}">
            <el-form-item label="流程名称">
              {{data.flowNameValue }}
            </el-form-item>
          </el-col>
          <el-col :md="{span: 8}" :sm="{span: 12}" :xs="{span: 24}">
            <el-form-item label="提交人">
              {{data.creater }}
            </el-form-item> 
          </el-col>
          <el-col :md="{span: 8}" :sm="{span: 12}" :xs="{span: 24}">
            <el-form-item label="提交人部门">
              {{data.dptName}}
            </el-form-item>
          </el-col>
          <el-col :md="{span: 8}" :sm="{span: 12}" :xs="{span: 24}">
            <el-form-item label="提交人时间">
              {{data.createTime | dateFilter  }}
            </el-form-item>
          </el-col>
          <el-col :md="{span: 8}" :sm="{span: 12}" :xs="{span: 24}">
            <el-form-item label="最后处理时间">
              {{data.updateTime | dateFilter  }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span>流程各个阶段意见</span>
      </div>
      <el-table :data="list" v-loading.body="listLoading" border stripe fit style="width: 100%">
        <el-table-column align="center" label="处理阶段" min-width="120px">
          <template scope="scope">
            <span>{{scope.row.currPhase}}</span>
          </template>
        </el-table-column>

        <el-table-column label="处理人" min-width="80px">
          <template scope="scope">
            <span>{{ "**" || scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所在部门" min-width="180px">
          <template scope="scope">
            <span>{{scope.row.dptName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="开始时间" min-width="180px">
          <template scope="scope">
            <span>{{scope.row.startDate}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="结束时间" min-width="180px">
          <template scope="scope">
            <span>{{scope.row.endDate}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="预审结果" min-width="320px">
          <template scope="scope">
            <span :style="{ color: scope.row.examinStr && scope.row.examinStr.indexOf('拒绝') > 0 ? 'red' : '' }">{{scope.row.examinStr}}</span>
          </template>
        </el-table-column>

        <el-table-column  label="表决意见" min-width="350px">
          <template scope="scope">
            <span>{{scope.row.currPhaseRes}}</span>
          </template>
        </el-table-column>

        <el-table-column label="意见详情" min-width="180px">
          <template scope="scope">
            <span>{{scope.row.opinionDetail}}</span>
          </template>
        </el-table-column>

        <el-table-column label="拒绝原因" min-width="300px">
          <template scope="scope">
            <span>{{scope.row.refuseReasonVlaue}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { getLoanByIpiecesNo, getApprByIpiecesNo } from '@/api/intopiece'
  import Utils from '@/utils/common'
  import dateFormat from 'dateformat'

  export default {
    name: 'check-track',
    props: ['customer'],
    data() {
      return {
        data: {},
        list: null,
        dataLoading: false,
        listLoading: false
      }
    },
    filters: {
      dateFilter(date) {
        return dateFormat(date, 'yyyy-mm-dd HH:MM:ss')
      },
    },
    created() {
      Utils.getDictData('ITEM_STATUS', data => {
        this.statusOptions = data
      })
      this.getData()
    },
    methods: {
      getData() {
        if (this.customer.businessKey) {
          this.listLoading = true
          this.dataLoading = true
          getLoanByIpiecesNo(this.customer.businessKey).then(response => {
            this.data = response.data
            this.dataLoading = false
          })
          getApprByIpiecesNo(this.customer.businessKey).then(response => {
            this.list = response.data
            this.listLoading = false
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select {
    width: 100px;
  }
</style>
