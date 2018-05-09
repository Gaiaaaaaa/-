<template>
  <div class="app-container order-entering-container" v-loading="completeLoading">
    <el-tabs v-model="activeName" type="card" v-if="isLoadend">
      <el-tab-pane label="审核意见" name="customer-info">
        <keep-alive>
          <customer-info-pane v-show='activeName=="customer-info"' :customer.sync="customer"></customer-info-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="资料附件" name="attachement-info">
        <keep-alive>
          <attachement-info-pane v-show='activeName=="attachement-info"' :customer.sync="customer"></attachement-info-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="审核轨迹" name="check-track">
        <keep-alive>
          <check-track-pane v-show='activeName=="check-track"' :customer.sync="customer"></check-track-pane>
        </keep-alive>
      </el-tab-pane>

      <!--<el-tab-pane label="信贷审批" name="credit-approval">-->
        <!--<keep-alive>-->
          <!--<credit-approval-pane v-if='activeName=="credit-approval"' :customer.sync="customer"></credit-approval-pane>-->
        <!--</keep-alive>-->
      <!--</el-tab-pane>-->

      <el-tab-pane label="合同信息" name="contract-info"  v-if="showContractInfo">
        <keep-alive>
          <contract-info-pane v-show='activeName=="contract-info"' :customer.sync="customer"></contract-info-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import checkTrackPane from './check-track'
  // import creditApprovalPane from './credit-approval'
  import contractInfoPane from './contract-info'
  import customerInfoPane from './customer-info'
  import attachementInfoPane from '../order/entering/attachment'
  import { mapGetters } from 'vuex'
  import { getOrder, loadBasicInfoById, loadLoanInfo } from '@/api/order'

  export default {
    name: 'workflow-detail',
    components: {
      checkTrackPane,
      // creditApprovalPane,
      contractInfoPane,
      customerInfoPane,
      attachementInfoPane
    },
    data() {
      return {
        showContractInfo: false,
        completeLoading: false,
        customer: {
          isView: true,
          fullView: true,
          allowEditFile: false,
          isHandle: this.$route.params.type === 'handle',
          customerId: this.$route.params.customerId || '',
          orderId: this.$route.params.orderId || '',
          businessKey: this.$route.params.businessKey || '',
          taskId: this.$route.query.taskId || '',
          procInstId: this.$route.query.procInstId || '',
          order: null,
          basicInfo: null,
          loanInfo: null
        },
        activeName: 'customer-info'
      }
    },
    created() {
      this.getOrderDetail()
      this.getCustomerInfo()
      this.getLoan()
      if (this.customer.isHandle === true) {
        // 编辑模式下,只有签约客服才有上传文件的操作
        this.customer.allowEditFile = this.roles.indexOf('busi_depart_support') >= 0
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ]),
      isLoadend() {
        if(this.customer.order && this.customer.basicInfo && this.customer.loanInfo) return true;
        return false;
      }
    },
    methods: {
      getOrderDetail() {
        this.completeLoading = true
        if (this.customer.orderId) {
          getOrder(this.customer.orderId).then(response => {
            this.customer.order = response.data
            this.completeLoading = false
            const orderStatus = this.customer.order.itemStatusKey
            this.showContractInfo = orderStatus === '004' || orderStatus === '005' || orderStatus === '011' || orderStatus === '008'
          }).catch(error => {
            console.log(error)
            this.completeLoading = false
          })
        }
      },
      getCustomerInfo() {
        this.completeLoading = true
        loadBasicInfoById(this.customer.customerId).then(response => {
          this.completeLoading = false
          this.customer.basicInfo = response.data
        }).catch(error => {
          this.completeLoading = false
        })
      },
      getLoan() {
        this.completeLoading = true
        loadLoanInfo({
          orderId: this.customer.orderId,
          customerId: this.customer.customerId
        }).then(response => {
          this.customer.loanInfo = response.data
          this.loadLoading = false
        }).catch(error => {
          console.log(error)
          this.loadLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .order-entering-container {
    &-header {
      margin: 10px;
      color: #20A0FF;
      font-size: 18px;
    }
  }

  .order-entering-container .el-select {
    width: 100%;
  }

  .order-entering-container .el-date-editor.el-input {
    width: 100%;
  }
</style>
