<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 700px; height: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">管理营业部变更记录</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-table  tooltip-effect="dark"  :data="list"
                v-loading.body="listLoading" border stripe fit style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column align="center" label="原管理营业部" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.oldBusinessName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="现管理营业部" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.newBusinessName}}</span>
                  </template>
                </el-table-column> 
                <el-table-column align="center" label="变更时间" min-width="220px"  >
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.createTime | dateFormat('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
    departmentUpdateHis
  } from '@/api/alteraction'

  export default {
    props: {
      ipiecesNo: {
        type: String,
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
          ipiecesNo: '',
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
        _this.dataQuery.ipiecesNo = _this.ipiecesNo;
        departmentUpdateHis(_this.dataQuery).then(response => {
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
