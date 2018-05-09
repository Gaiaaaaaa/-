<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>


<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout'
import { Notification } from 'element-ui'
import { mapGetters } from 'vuex'
import Utils from '@/utils/common'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  created() {
    this.createConnection()
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    createConnection(){
      Utils.webSocketConnection(this.userId,result => {
        const config = {
          message: result.msg,
          duration: 5000
        }
        if (result.code === '000000') {
          Notification.success(config);
        } else {
          Notification.error(config);
        }
      });
    },
    error(event) {
      setTimeout(() => {
        // 3s自动重连
        this.createConnection()
      }, 3000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:36px;
				overflow: inherit;
			}
			.main-container {
				margin-left: 36px;
			}
		}
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 180px;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			background: #324157;
			z-index: 888;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 180px;
			padding-top:50px;
		}
	}
</style>
