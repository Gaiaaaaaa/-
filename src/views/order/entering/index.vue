<template>
  <div class="order-entering-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="basic">
        <keep-alive>
          <basic-pane v-if='activeName=="basic"' :customer.sync="customer" @switchTab="switchTab"></basic-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="贷款信息" name="loans" :disabled="customer.proType<5">
        <keep-alive>
          <loans-pane v-if='activeName=="loans"' :customer.sync="customer" @switchTab="switchTab"></loans-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="联系人信息" name="contacts" :disabled="customer.proType<10">
        <keep-alive>
          <contacts-pane v-if='activeName=="contacts"' :customer.sync="customer" @switchTab="switchTab"></contacts-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="职业信息" name="occupation" :disabled="customer.proType<15">
        <keep-alive>
          <occupation-pane v-if='activeName=="occupation"' :customer.sync="customer" @switchTab="switchTab"></occupation-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="征信信息" name="credit" :disabled="customer.proType<20">
        <keep-alive>
          <credit-pane v-if='activeName=="credit"' :customer.sync="customer" @switchTab="switchTab"></credit-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="资料附件" name="attachment" :disabled="customer.proType<25">
        <keep-alive>
          <attachment-pane v-if='activeName=="attachment"' :customer.sync="customer" @switchTab="switchTab"></attachment-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="审核轨迹" name="check-track" v-if="customer.isView">
        <keep-alive>
          <check-track-pane v-if='activeName=="check-track"' :customer="customer"></check-track-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="合同信息" name="contract-info" v-if="customer.isView">
        <keep-alive>
          <contract-info-pane v-if='activeName=="contract-info"' :customer="customer"></contract-info-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import basicPane from './basic'
  import loansPane from './loans'
  import contactsPane from './contacts'
  import occupationPane from './occupation'
  import creditPane from './credit'
  import attachmentPane from './attachment'
  import checkTrackPane from '../../workflow-task/check-track'
  import contractInfoPane from '../contract-info'
  import { getOrder } from '@/api/order'

  export default {
    name: 'orderEntering',
    components: {
      basicPane,
      loansPane,
      contactsPane,
      occupationPane,
      creditPane,
      attachmentPane,
      checkTrackPane,
      contractInfoPane
    },
    data() {
      return {
        customer: {
          isView: this.$route.params.type === 'view',
          customerId: this.$route.params.customerId || '',
          orderId: this.$route.params.orderId || '',
          businessKey: this.$route.query.businessKey || '',
          allowEditFile: true,
          basic: null,
          loans: null,
          contacts: null,
          occupation: null,
          proType: NaN
        },
        activeName: 'basic'
      }
    },
    methods: {
      switchTab(tabName) {
        this.activeName = tabName
      },
      getProcessType() {
        getOrder(this.customer.orderId).then(response => {
          this.proType = response.data.processType
          switch (this.proType) {
            case 0:
              this.activeName = 'basic';
              break;
            case 5:
              this.activeName = 'loans';
              break;
            case 10:
              this.activeName = 'contacts';
              break;
            case 15:
              this.activeName = 'occupation';
              break;
            case 20:
              this.activeName = 'credit';
              break;
            case 25:
              this.activeName = 'attachment';
              break;
            default:
              this.activeName = 'basic';
              break;
          }
          this.customer.itemStatusKey = response.data.itemStatusKey
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created() {
      if (this.customer.isView) {
        this.customer.proType = 35
      } else {
        if (this.customer.customerId) {
          this.getProcessType()
        } else {
          this.customer.proType = 0
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  .order-entering-container .el-select {
    width: 100%;
  }

  .order-entering-container .el-date-editor.el-input {
    width: 100%;
  }
</style>
