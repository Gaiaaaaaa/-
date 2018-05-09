<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">客户姓名变更</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" >
                <el-form-item label="客户姓名" prop="oldCutName">
                  <el-input v-model="oldCutName" placeholder="客户名称" disabled></el-input>
                </el-form-item>
                <el-form-item label="新客户姓名" prop="newCusName">
                  <el-input v-model="newCusName" placeholder="新客户名称" ></el-input>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">保存</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common';
  import {updateCustomerName} from '@/api/alteraction';

  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      dataId: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        newCusName:'',
        oldCutName:''
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
    
       getDetail() {
         this.oldCutName = this.dataId.custName
      },

      submit() { 
            if(!this.newCusName){
                Utils.error("客户名字不能为空")
                return
            }
            this.submitLoading = true;
            var modify  = {
                orderId:this.dataId.orderId,
                cusName:this.newCusName
            }
            updateCustomerName(modify).then(response => {
              this.submitLoading = false;
              console.log(response);
              Utils.success(response.data);
              this.$emit('close');
              this.$emit('refresh')
            }).catch(error => {
              console.log(error);
              this.submitLoading = false;
            });
          }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader, .el-select {
    width: 100%;
  }
  .modal-container{
    height: calc(100% - 300px);
  }
</style>
