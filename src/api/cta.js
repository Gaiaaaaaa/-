import fetch from '@/utils/fetch'

export function assetTool(query) {
  return fetch({
    url: `/cta/asset-tool`,
    method: 'get',
    params: query
  })
}
