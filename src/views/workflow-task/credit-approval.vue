<template>
  <div class="credit-approval-container">
    <el-row :gutter="10">
      <el-col :span="12" :md="{span: 12}" :sm="{span: 24}" style="margin-bottom: 20px;">
        <file-pane :customer="customer" />
      </el-col>
      <el-col :span="12" :md="{span: 12}" :sm="{span: 24}">
        <info-pane :customer="customer" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import { getBusiBasicLoan, getOrderStatus } from '@/api/order'
  import filePane from './credit-approval-file'
  import infoPane from './credit-approval-info'

  export default {
    name: 'credit-approval',
    props: ['customer'],
    components: {
      filePane,
      infoPane
    },
    data() {
      return {
        listLoading: true
      }
    },
    filters: {

    },
    created() {

    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
