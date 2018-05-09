<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 800px; height: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">银行卡变更记录</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-table  tooltip-effect="dark"  :data="list"
                v-loading.body="listLoading" border stripe fit style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column align="center" label="客户姓名" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.newName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="身份证号" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.newCertno}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="原开户银行账号" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.oldBankacct}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="原还款银行账号" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.oldBankacct}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="现开户银行账号" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.newBankacct}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="现还款银行账号" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.newBankacct}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="修改时间" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.updateTime}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="修改人员" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.userName}}</span>
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
  import { getBankcdChangeRecord } from '@/api/bank-card'

  export default {
    props: {
      custId: {
        type: Number,
        default: ''
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        listLoading : false,
        list: null
      };
    },
    created() {
      this.getHisData();
    },
    methods: {
      getHisData() {
        var _this = this;
        _this.listLoading = true
        console.log(this.custId, '---')
        getBankcdChangeRecord(this.custId).then(response => {
          this.list = response.data;
          _this.listLoading = false
          _this.getDataLoading = false;
        }).catch(function (error) {
          console.log(error);
          _this.getDataLoading = false;
        })
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader,
  .el-select {
    width: 100%;
  }

</style>
