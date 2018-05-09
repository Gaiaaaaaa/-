<template>
  <div class="credit-approval-info-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="basic">
        <keep-alive>
          <basic-pane v-if='activeName=="basic"' :customer="customer"></basic-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="贷款信息" name="loans">
        <keep-alive>
          <loans-pane v-if='activeName=="loans"' :customer="customer"></loans-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="联系人信息" name="contacts">
        <keep-alive>
          <contacts-pane v-if='activeName=="contacts"' :customer="customer"></contacts-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="职业信息" name="occupation">
        <keep-alive>
          <occupation-pane v-if='activeName=="occupation"' :customer="customer"></occupation-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="征信信息" name="credit">
        <keep-alive>
          <credit-pane v-if='activeName=="credit"' :customer="customer"></credit-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import basicPane from '../order/entering/basic'
  import loansPane from '../order/entering/loans'
  import contactsPane from '../order/entering/contacts'
  import occupationPane from '../order/entering/occupation'
  import creditPane from '../order/entering/credit'

  export default {
    name: 'order-list',
    props: ['customer'],
    components: {
      basicPane,
      loansPane,
      contactsPane,
      occupationPane,
      creditPane
    },
    data() {
      return {
        activeName: 'basic'
      }
    },
    created() {
      console.log(this.customer)
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
