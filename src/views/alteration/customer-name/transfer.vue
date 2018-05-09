<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 800px; height: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">客户姓名变更记录</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-table  tooltip-effect="dark"  :data="list"
                v-loading.body="listLoading" border stripe fit style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column align="center" label="原客户姓名" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.oldName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="现客户姓名" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.newName}}</span>
                  </template>
                </el-table-column>    
                <el-table-column align="center" label="变更时间" min-width="220px"  >
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.updateTime}}</span>
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
  import {
    updateCustomerNameRecord
  } from '@/api/alteraction'

  export default {
    props: {
        custId: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        listLoading : false,
        list:[],
        dataQuery: {
          custId:'',
        }
      };
    },
    created() {
      this.getHisData();
    },
    methods: {
      getHisData() {
        var _this = this;
        _this.listLoading = true
        _this.getDataLoading = true;
        _this.dataQuery.custId = _this.custId;
        updateCustomerNameRecord(_this.dataQuery).then(response => {
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
