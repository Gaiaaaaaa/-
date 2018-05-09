<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 1000px; height: 550px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">客户经理变更记录</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-table  tooltip-effect="dark"  :data="list"
                v-loading.body="listLoading" border stripe fit style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column align="center" label="原客户经理" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.firstUserName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="原所属门店" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.firstBelongName}}</span>
                  </template>
                </el-table-column>    
                <el-table-column align="center" label="现客户经理" min-width="120px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.lastUserName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="现所属门店" min-width="180px">
                  <template scope="scope">
                    <span type="text" size="small">{{scope.row.lastBelongName}}</span>
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
import { managerUpdateHis } from "@/api/alteraction";

export default {
  props: {
    certNo: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      submitLoading: false,
      getDataLoading: false,
      listLoading: false,
      list: [],
      dataQuery: {
        certNo: ""
      }
    };
  },
  created() {
    this.getHisData();
  },
  methods: {
    getHisData() {
      var _this = this;
      _this.listLoading = true;
      _this.getDataLoading = true;
      _this.dataQuery.certNo = _this.certNo;
      managerUpdateHis(_this.dataQuery)
        .then(response => {
          this.list = response.data;
          _this.listLoading = false;
          _this.getDataLoading = false;
        })
        .catch(function(error) {
          console.log(error);
          _this.getDataLoading = false;
        });
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
