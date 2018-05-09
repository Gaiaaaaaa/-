<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">客户经理变更</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！" style="min-height: 310px;" >
            <slot name="body">
              <el-form class="form-container" :model="organization"  ref="submitForm">
                <el-form-item label="客户姓名" prop="custName">
                  <el-input v-model="this.itemData.custName" placeholder="客户姓名" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="certNo">
                  <el-input v-model="this.itemData.certNo" placeholder="身份证号" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="归属分公司">
                  <el-cascader v-model="organization.belongDept" placeholder="直接输入可搜索" filterable :options="belongDeptOptions" :props="belongDeptProps"
                    @change="belongDeptChange" :disabled="true"></el-cascader>
                </el-form-item>
                <el-form-item label="客户经理" prop="managerId">
                  <el-select v-model="managerId" size="small">
                    <el-option size="small" v-for="item in managerList" :key="item.userName" :label="item.userName+' ('+(item.teamName?item.teamName:'无')+')'"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common'
  import {
    getList,
    getTeamDetail,
    submitOrgan,
    getDutyList,
    userListByBelongId,
    getTeamList
  } from '@/api/organization'
  import {
    getCustomerManagerList, updateCustomerManager
  } from '@/api/alteraction'
  export default {
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        managerId: '',
        managerList: [],
        belongDeptQuery: {
          nodeLevel: '',
          dgLevel: 0,
          dgTotal: 3,
          pid: 0,
          teamFlag: '2'
        },
        organization: {
          id: this.itemData.businessId,
          roleCode: '',
          dutyId: '',
          belongDept: [],
          pid: ''
        },
        belongDeptOptions: [{
          id: '',
          name: '江苏',
          level: '1',
          children: []
        }],
        belongDeptProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        rules: {
          dptName: [{
            required: true,
            message: '请输入团队名称',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getList();
      this.getDetail();
    },
    methods: {
      getList() {
        this.getDataLoading = true;
        getList(this.belongDeptQuery).then(response => {
          this.getDataLoading = false;
          this.belongDeptOptions = response.data;
        }).catch(error => {
          console.log(error);
          this.getDataLoading = false;
        })
      },
      getDetail() {
        var data = {
          id: this.itemData.businessId
        };

        //获取归属分公司
        this.getDataLoading = true;
        getTeamList(data).then(response => {
          this.getDataLoading = false;
          var belongDept = [];
          var idList = response.data.idList;
          idList.push(parseInt(this.itemData.businessId))
          idList.forEach((id, index) => {
            belongDept.push(id);
          });
          //获取团队信息
          this.getDataLoading = true;
          getTeamDetail(this.itemData.businessId).then(response => {
            this.getDataLoading = false;
            this.organization.dptName = response.data.dptName;
            this.organization.belongDept = belongDept;
            this.organization.valid = response.data.valid;
            this.organization.isLeaf = response.data.isLeaf;
            var depId = response.data.id;
            this.belongDeptChange(belongDept, true, depId);
            this.managerId = parseInt(this.itemData.founderId)
          }).catch(error => {
            this.getDataLoading = false;
            console.log(error);
          })

        }).catch(error => {
          console.log(error);
          this.getDataLoading = false;
        })
      },

      submit() {
        if(!this.managerId){
          Utils.error("请选择客户经理")
          return
        }
          this.submitLoading=true
          var params = {
            custIds:this.itemData.custId,
            customerManagerId:this.managerId
          }
          updateCustomerManager(params).then(response => {
            this.submitLoading=false
            this.$emit('close')
            this.$emit('refresh')
            Utils.success(response.data)
          }).catch(error => {
            this.submitLoading=fasle
            console.log(error);
          })

      },

      belongDeptChange(value, isEditFlag, depId) {
        if (value) {
          this.managerId = ''
          var belongId = value[value.length - 1];
          if (belongId !== '') {
            getCustomerManagerList(belongId).then(response => {
              this.managerList = response.data;
            }).catch(error => {
              console.log(error);
            });
          } else {

          }
        }
      }

    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader {
    width: 100%;
  }

</style>
