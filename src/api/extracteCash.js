import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: `/extracte/queryApplyListByPage`,
    method: 'post',
    params: query
  })
}

export function getCGBalance(custCode) {
  return fetch({
    url: `/extracte/queryCunguanBalance/${custCode}`,
    method: 'get'
    // params:fyAccount
  })
}

export function sendSmsCode(custId) {
  return fetch({
    url: `/extracte/getMobileVerificationCode/${custId}`,
    method: 'get'
    // data: fyAccountNo
  })
}

export function submitExtracteApply(query) {
  return fetch({
    url: `/extracte/submitExtracteApply/`,
    method: 'post',
    params: query
  })
}

export function queryCashRecordListByCustId(query) {
  return fetch({
    url: `/extracte/queryCashRecordListByCustId/`,
    method: 'post',
    params: query
  })
}

export function queryExtrateAuditListByPage(query) {
  return fetch({
    url: `/extracte/queryExtrateAuditListByPage`,
    method: 'post',
    params: query
  })
}

export function confirmAuditAction(query) {
  return fetch({
    url: `/extracte/confirmAuditAction`,
    method: 'post',
    params: query
  })
}

export function queryCashRecordListByPage(query) {
  return fetch({
    url: `/extracte/queryCashRecordListByPage`,
    method: 'post',
    params: query
  })
}
