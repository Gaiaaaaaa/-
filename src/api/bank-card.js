import fetch from '@/utils/fetch'

export function getInfo(query) {
  return fetch({
    url: '/replace/fy/get-bank-info',
    method: 'get',
    params: query
  })
}

// 查询银行卡变更记录
export function getBankcdChangeRecord(custId) {
  return fetch({
    url: `/replace/fy/get-change-recored/${custId}`,
    method: 'get'
  })
}

// 更换银行卡
export function changeBankCard(changQuery) {
  return fetch({
    url: `/replace/fy/change-bankcard`,
    method: 'post',
    data: changQuery
  })
}

