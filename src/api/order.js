import fetch from '@/utils/fetch'
import fetchFile from '@/utils/fetchFile'

export function getBusiBasicLoan(query) {
  return fetch({
    url: `/busi-basic-loan/list-by-page`,
    method: 'get',
    params: query
  })
}

export function getCustomerManage() {
  return fetch({
    url: `/user/users-by-role/cust_manager`,
    method: 'get'
  })
}

// 客户经理变更/客服变更
export function getselectManager(query) {
  return fetch({
    url: `busi-basic-loan/list-by-page-status`,
    method: 'get',
    params: query
  })
}

// 客户姓名修改
export function getselectChangeName(query) {
  return fetch({
    url: `busi-basic-loan/list-by-page-changename`,
    method: 'get',
    params: query
  })
}

// 请求管理营业部变更数据
export function getdepartmentList(query) {
  return fetch({
    url: `busi-basic-loan/list-by-page-apply`,
    method: 'get',
    params: query
  })
}

export function submitBasicInfo(customer) {
  return fetch({
    url: `/customer/entry-order-customer`,
    method: 'post',
    data: customer
  })
}

export function submitContacts(customer) {
  return fetch({
    url: `/customer/entry-contract`,
    method: 'post',
    data: customer
  })
}

export function submitOccupation(customer) {
  return fetch({
    url: `/customer/entry-company`,
    method: 'post',
    data: customer
  })
}

export function submitCredit(customer) {
  return fetch({
    url: `/customer/entry-credit`,
    method: 'post',
    data: customer
  })
}

export function submitLoansInfo(customer) {
  return fetch({
    url: `/customer/entry-loan`,
    method: 'post',
    data: customer
  })
}

export function loadBasicInfo(customer) {
  return fetch({
    url: `/customer/info-by-name-no`,
    method: 'get',
    params: customer
  })
}

export function loadBasicInfoById(custId) {
  return fetch({
    url: `/customer/info/${custId}`,
    method: 'get'
  })
}

export function loadLoanInfo(customer) {
  return fetch({
    url: `/customer/loan-by-order`,
    method: 'get',
    params: customer
  })
}

export function loadContactsInfo(customer) {
  return fetch({
    url: `/customer/contract-by-order`,
    method: 'get',
    params: customer
  })
}

export function loadCompanyInfo(customer) {
  return fetch({
    url: `/customer/company-by-order`,
    method: 'get',
    params: customer
  })
}

export function loadCreditInfo(customer) {
  return fetch({
    url: `/customer/credit-by-order`,
    method: 'get',
    params: customer
  })
}

export function getFileList(query) {
  return fetch({
    url: `/file/file-list-page`,
    method: 'get',
    params: query
  })
}

export function deleteFileById(id) {
  return fetch({
    url: `/file/delete-by-id`,
    method: 'post',
    data: { id: id }
  })
}

export function updateFileNameById(query) {
  return fetch({
    url: `/file/update-file-by-id`,
    method: 'post',
    data: query
  })
}

export function entryComplete(customer) {
  return fetch({
    url: `/customer/entry-complete`,
    method: 'post',
    data: customer
  })
}

export function entryApply(customer) {
  return fetch({
    url: `/customer/entry-apply`,
    method: 'post',
    data: customer
  })
}

// 管理营业部变更数据
export function findOrderDuplicate(query) {
  return fetch({
    url: `/customer/duplicate-by-order`,
    method: 'get',
    params: query
  })
}

// 更改客户经理列表
export function getselectCustomInfo(query) {
  return fetch({
    url: `/changeManager/customTotal/selectCustomInfo`,
    method: 'post',
    data: query
  })
}

// 订单申请
export function applyOrder(orderId) {
  return fetch({
    url: `/activiti/order-apply/${orderId}`,
    method: 'get'
  })
}

// 订单删除
export function deleteOrder(orderId) {
  return fetch({
    url: `/busi-basic-loan/delete-order/${orderId}`,
    method: 'get'
  })
}

// 订单详情
export function getOrder(orderId) {
  return fetch({
    url: `/busi-basic-loan/detail/${orderId}`,
    method: 'get'
  })
}

export function cancelOrder(taskIds) {
  return fetch({
    url: `/activiti/cancel`,
    method: 'post',
    data: taskIds
  })
}

// 开户绑卡-发送验证码
export function sendSms(param) {
  return fetch({
    url: `/customer/send-sms`,
    method: 'get',
    params: param
  })
}

// 合同信息开户
export function getOpenAnAccount(param) {
  return fetch({
    url: `/customer/open-an-account`,
    method: 'post',
    data: param
  })
}

// 获取富有开户城市.
export function selectFycitys() {
  return fetch({
    url: `/customer/province-fy-cities`,
    method: 'get'
  })
}

// 合同列表
export function selectPreviewlist(basicCustId, loanNo) {
  return fetch({
    url: `/contract/preview-list/${basicCustId}/${loanNo}`,
    method: 'get'
  })
}

// 订单列表 下载功能
export function exportExcel(query) {
  return fetchFile({
    url: `/busi-basic-loan/export-list`,
    method: 'get',
    params: query
  })
}

// 查询放款账号
export function selectBankAcct(basicCustId) {
  return fetch({
    url: `/customer/get-loanAccount/${basicCustId}`,
    method: 'get'
  })
}

// 预览合同
export function previewContract(data) {
  return fetch({
    url: `/contract-preview/preview`,
    method: 'get',
    params: data
  })
}

// 生成合同
export function ContractOfGeneration(data) {
  return fetch({
    url: `/contract/generator-contract`,
    method: 'post',
    data: data
  })
}

// 查询合同信息
export function selectContractInfo(data) {
  return fetch({
    url: `/customer/get-contractInfo`,
    method: 'get',
    params: data
  })
}

// 修改合同查看的信息
export function updateContractLoanInfo(data) {
  return fetch({
    url: `/customer/update-contracInfo`,
    method: 'post',
    data: data
  })
}

// 查询是否生成合同
export function selectContractIsNo(loanNo) {
  return fetch({
    url: `/contract/isNo-generator-contract/${loanNo}`,
    method: 'get'
  })
}

