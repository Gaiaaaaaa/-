<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 1000px;height: 500px">
          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">还款计划表</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

                <el-table-column align="center" label="期数">
                  <template scope="scope">
                    <span>{{scope.row.termNo}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="还款日">
                  <template scope="scope">
                    <span>{{scope.row.repayDate}}</span>
                  </template>
                </el-table-column>


                <el-table-column align="center" width="120" label="还款金额">
                  <template scope="scope">
                    <span>{{scope.row.currRepay}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" width="170" label="当期一次性还款金额">
                  <template scope="scope">
                    <span>{{scope.row.earlyReturnFee}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" width="170" label="当期一次性还款退费">
                  <template scope="scope">
                    <span>{{scope.row.returnFee}}</span>
                  </template>
                </el-table-column>

                <el-table-column  align="center" width="200" label="当期一次性实际应还金额">
                  <template scope="scope">
                    <span>{{(scope.row.earlyReturnFee - scope.row.returnFee).toFixed(2)}}</span>
                  </template>
                </el-table-column>

              </el-table>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import Utils from '@/utils/common'
  import { getReplaymentList } from '@/api/contract'

  export default {
    props: {
      agreementNo: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        submitLoading: false,
        validOptions: [],
        listLoading: false,
        validOptionproduct: [],
        list: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getReplaymentList(this.agreementNo).then(response => {
          this.list = response.data
          this.total = response.count
          this.listLoading = false
          this.searchLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
          this.searchLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.el-cascader, .el-select {*/
  /*width: 100%;*/
  /*}*/
</style>
