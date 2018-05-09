import fetch from '@/utils/fetch'

// 查询合同列表
export function getContractList(query) {
  return fetch({
    url: '/contract/list-by-page',
    method: 'get',
    params: query
  })
}

// 查询还款计划列表
export function getReplaymentList(query) {
  return fetch({
    url: '/contract/replayment-list/' + query,
    method: 'post'
  })
}

// 查询合同详情
export function getContract(borrowNo) {
  return fetch({
    url: `/contract/${borrowNo}`,
    method: 'get'
  })
}

// 查询投资人列表
export function getLoanBorrows(borrowNo) {
  return fetch({
    url: `/contract/investor-list/${borrowNo}`,
    method: 'get'
  })
}

// 查询合同预览列表
export function selectContractList(basicCustId, loanNo) {
  return fetch({
    url: '/contract/preview-list/' + basicCustId + '/' + loanNo,
    method: 'get'
  })
}

// 预览合同
export function previewContract(data) {
  return fetch({
    url: `/contract/preview`,
    method: 'get',
    params: data
  })
}

// 结清证明列表
export function getsettleCertifyList(query) {
  return fetch({
    url: '/settleCertify/list',
    method: 'get',
    params: query
  })
}

// 申请结清
export function applySettleCertify(agreementNo, reportDate) {
  return fetch({
    url: '/settleCertify/apply-settle/' + agreementNo + '/' + reportDate,
    method: 'get'
  })
}
