import fetch from '@/utils/fetch'

export function getLoanByIpiecesNo(ipiecesNo) {
  return fetch({
    url: `/busi-cl-appr/loan/${ipiecesNo}`,
    method: 'get'
  })
}

export function getApprByIpiecesNo(ipiecesNo) {
  return fetch({
    url: `/busi-cl-appr/apprs/${ipiecesNo}`,
    method: 'get'
  })
}
