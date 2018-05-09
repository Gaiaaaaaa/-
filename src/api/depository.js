import fetch from '@/utils/fetch'

// 富友开户
export function getFyBankLogs(query) {
  return fetch({
    url: '/depository/fy-bank-logs',
    method: 'get',
    params: query
  })
}

// 存管开户绑卡列表
export function getAccountList(query) {
  return fetch({
    url: '/depository/load-depository-list',
    method: 'get',
    params: query
  })
}

// 存管历史记录列表
export function loadByCertNo(query) {
  return fetch({
    url: `/depository/load-by-cert-no`,
    method: 'get',
    params: query
  })
}

// 存管解绑
export function unBindBankcard(query) {
  return fetch({
    url: `/depository/un-bind-bank-card`,
    method: 'get',
    params: query
  })
}
