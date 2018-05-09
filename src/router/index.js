import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ code: ['index'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/order/files', component: _import('order/files'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    hidden: true,
    icon: 'zujian',
    children: [
      {
        path: 'index',
        component: _import('dashboard/index')
      }
    ]
  },
  { path: '/xfReportLimit', component: _import('repayment/account/bankslimit'), hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/workbench',
    component: Layout,
    redirect: 'noredirect',
    name: '我的工作台',
    hidden: false,
    icon: 'el-icon-xc-gongzuoshi',
    children: [
      {
        path: 'todo',
        name: '待办任务',
        meta: { code: '/sys/goIndex' },
        component: _import('dashboard/todos')
      },
      {
        path: 'tasks',
        name: '任务领取',
        meta: { code: '/workflow/claimApplylist' },
        component: _import('dashboard/tasks')
      },
      {
        path: 'app-client',
        name: 'APP客户分配',
        // meta: { code: 'workbench/app-client' },
        component: _import('dashboard/app-client')
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    name: '订单管理',
    icon: 'el-icon-xc-dingdan',
    children: [
      {
        path: 'duplicate-checking',
        name: '申请查重',
        meta: { code: 'order-duplicate-checking' },
        component: _import('order/duplicate-checking')
      },
      {
        path: 'entering',
        name: '订单录入',
        meta: { code: 'order-entering' },
        component: _import('order/entering/index')
      },
      {
        path: 'list',
        name: '订单列表',
        meta: { code: 'order-list' },
        component: _import('order/list/index')
      },
      {
        path: ':type/:customerId/:orderId',
        name: '订单详情',
        hidden: true,
        component: _import('order/entering/index')
      }
    ]
  },
  {
    path: '/channel-customers',
    component: Layout,
    redirect: 'noredirect',
    name: '渠道客户',
    icon: 'el-icon-xc-kehuguanli',
    children: [
      {
        path: 'address-list-manage',
        name: '通讯录管理',
        // meta: { code: '' },
        component: _import('channel-customers/address-list-manage/index')
      },
      {
        path: 'terminal-customers',
        name: '终端机推荐客户查询',
        // meta: { code: '' },
        component: _import('channel-customers/terminal-customers/index')
      }
    ]
  },
  {
    path: '/calculator',
    component: Layout,
    redirect: '/calculator/index',
    noDropdown: true,
    icon: 'el-icon-xc-jisuanqi',
    children: [
      {
        path: 'index',
        name: '计算器',
        meta: { code: 'calculator' },
        component: _import('calculator/index')
      }
    ]
  },
  {
    path: '/workflow-task',
    component: Layout,
    redirect: 'noredirect',
    name: '工作流管理',
    icon: 'el-icon-xc-liucheng',
    children: [
      {
        path: 'pending',
        name: '待处理流程任务',
        meta: {
          code: '/workflow/pending/tasklist',
          isComplete: true
        },
        component: _import('workflow-task/index')
      },
      {
        path: 'processed',
        name: '已处理流程任务',
        meta: {
          code: '/workflow/list/running',
          isCompleteHistory: true
        },
        component: _import('workflow-task/index')
      },
      {
        path: 'finished',
        name: '已结束流程任务',
        meta: {
          code: '/workflow/list/finished',
          isHistoryActiciti: true
        },
        component: _import('workflow-task/index')
      },
      {
        path: ':type/:customerId/:orderId/:businessKey',
        name: '流程任务详情',
        hidden: true,
        component: _import('workflow-task/detail')
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: 'noredirect',
    name: '合同管理',
    icon: 'el-icon-xc-hetong',
    children: [
      {
        path: 'list',
        name: '合同查询',
        meta: { code: '/contract/list/search' },
        component: _import('contract/index')
      },
      {
        path: 'view/:borrowNo',
        name: '合同查看',
        hidden: true,
        /* meta: { code: 'sys-department' }, */
        component: _import('contract/view')
      },
      {
        path: 'settleCertify',
        name: '结清证明',
        meta: { code: '/contract/settleCertify/search' },
        component: _import('contract/settleCertify-list')
      }
    ]
  },
  {
    path: '/repayment',
    component: Layout,
    redirect: 'noredirect',
    name: '还款管理',
    icon: 'el-icon-xc-huankuan',
    children: [
      {
        path: 'queryAccount',
        name: '账户查询',
        // meta: { code: 'repayment-queryAccount' },
        component: _import('repayment/queryAccount/index')
      },
      {
        path: 'repaymentPlan/:accountId',
        name: '还款计划',
        hidden: true,
        // meta: { code: 'repayment-account' },
        component: _import('repayment/account/repaymentPlan')
      }
      // {
      //   path: 'offer',
      //   name: '报盘明细查询',
      //   meta: { code: '/repayment/offerQuery' },
      //   component: _import('repayment/offer/index')
      // }
      // {
      //   path: 'late-offer',
      //   name: '逾期报盘明细查询',
      //   meta: { code: '/repayment/lateOfferQuery' },
      //   component: _import('repayment/late-offer/index')
      // }
    ]
  },
  {
    path: '/alteration',
    component: Layout,
    redirect: 'noredirect',
    name: '变更管理',
    icon: 'el-icon-xc-biangeng',
    children: [
      {
        path: 'customer-manager',
        name: '客户经理变更',
        meta: { code: 'alteration-customer-manager' },
        component: _import('alteration/customer-manager/index')
      },
      {
        path: 'customer-service',
        name: '客服变更',
        meta: { code: 'alteration-customer-service' },
        component: _import('alteration/customer-service/index')
      },
      {
        path: 'department',
        name: '管理营业部变更',
        meta: { code: 'alteration/department' },
        component: _import('alteration/department/index')
      },
      {
        path: 'customer-name',
        name: '客户姓名变更',
        meta: { code: 'alteration-customer-name' },
        component: _import('alteration/customer-name/index')
      },
      {
        path: 'bank-card',
        name: '富友变更',
        // meta: { code: 'busi_depart_support' },
        component: _import('order/bank-card/index')
      }
    ]
  },
  {
    path: '/openAccount',
    component: Layout,
    redirect: 'noredirect',
    name: '开户管理',
    icon: 'el-icon-xc-kehuguanli',
    children: [
      {
        path: 'account',
        name: '善林存款',
        // meta: { code: 'busi_depart_support' },
        component: _import('order/account/index')
      },
      {
        path: 'fy-open-account',
        name: '富友重新开户',
        // meta: { code: 'busi_depart_support' },
        component: _import('order/fy-open-account/index')
      }
    ]
  },
  {
    path: '/getCash',
    component: Layout,
    redirect: 'noredirect',
    name: '存管提现管理',
    icon: 'el-icon-xc-yinxingcunguan',
    children: [
      {
        path: 'apply',
        name: '存管提现申请',
        // meta: { code: 'busi_depart_support' },
        component: _import('cash/apply/index')
      },
      {
        path: 'history',
        name: '提现记录查询',
        // meta: { code: 'busi_depart_support' },
        component: _import('cash/history/index')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
