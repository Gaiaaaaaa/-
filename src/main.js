import Vue from 'vue'
import ElementUI from 'element-ui'
// import './styles/index.css' 橙色主题
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import * as filter from './utils/filter'
import { components } from '@/components'
Vue.use(ElementUI, { locale })

components.map(component => {
  Vue.component(component.name, component)
})
Vue.config.productionTip = false

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
