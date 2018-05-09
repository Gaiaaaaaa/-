<template>
  <div class="dashboard-container app-container">
    <div class="dashboard-wrapper clearfix">
      <img src="../../assets/dashboard.png" alt="dashboard">
      <div class='dashboard-text'>
        <h2>WELCOME</h2>
        <p>欢迎登录综合资产进件管理系统！</p>
    </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'nickName',
        'menus'
      ])
    },
    created() {
      if (this.menus.indexOf('workbench-todo') > 0) {
        this.$router.push({ path: '/workbench/todo' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      height: 100%;
      position: relative;
      .dashboard-wrapper{
        width: 1000px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img, .dashboard-text {
          display: inline-block;
          vertical-align: middle;
        }
      }
      img {
        margin-right: 50px;
        max-width: 100%;
        width: 400px;
      }
      .dashboard-text{
        h2{
          font-family: 'Microsoft Yahei';
          font-size: 80px;
          color: #3a9add;
          font-weight: normal;
        }
        p{
          font-size: 24px;
          color: #3a9add;
        }
      }
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      text-align: center;
    }
  }
</style>
