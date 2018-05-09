import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: `/repay-account/list-by-page`,
    method: 'get',
    params:query
  })
}

export function getFYBalance(subAccount) {
  return fetch({
    url: `/repay-account/query-fybalance/${subAccount}`,
    method: 'get',
    // params:fyAccount
  })
}

export function getCGBalance(custCode) {
  return fetch({
    url: `/repay-account/query-cgbalance/${custCode}`,
    method: 'get',
    // params:fyAccount
  })
}

export function getrecharge(agreementNo) {
  return fetch({
    url: `/repay-account/query-recharge-log/${agreementNo}`,
    method: 'get'
    // data: fyAccountNo
  })
}

export function getAccountInfo(query) {
  return fetch({
    url: `/repayment-plan/query-accountInfo//${query}`,
    method: 'get',
    params: {
      agreementNo: query
    }
  })
}

export function getAccountRepayPlan(query) {
  return fetch({
    url: `/repayment-plan/query-repayPlan/${query}`,
    method: 'get',
    params: {
      agreementNo: query
    }
  })
}

export function selectRepaiedBill(query) {
  return fetch({
    url: `/repayment-plan/repaiedBill-by-page`,
    method: 'post',
    data: query
  })
}

export function selectRepaiedPenaltyBill(query) {
  return fetch({
    url: `/repayment-plan/get-penaltyList`,
    method: 'post',
    data: query
  })
}

export function repaymentFn(query) {
  return fetch({
    url: `/repayment-plan/realtime-report`,
    method: 'post',
    data: query
  })
}

// 加载扣款渠道
export function repaymentChannelFn(agreementNo) {
  return fetch({
    url: `/repay-account/query-thirdtype-options/${agreementNo}`,
    method: 'get'
  })
}

// 加载扣款失败次数
export function repaymentFieldAccountFn(agreementNo) {
  return fetch({
    url: `/repay-account/query-reported-msg/${agreementNo}`,
    method: 'get'
  })
}

// 还款计划费用免除
export function coastExempt(data) {
  return fetch({
    url: '/repay-account/outlay-exempt-report',
    method: 'post',
    data: data
  })
}
