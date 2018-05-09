import fetch from '@/utils/fetch'

export function getDictData(dictType) {
  return fetch({
    url: `/dict/data/${dictType}`,
    method: 'get'
  })
}

export function getDictMap(dictType) {
  return fetch({
    url: `/dict/map-by-code/${dictType}`,
    method: 'get'
  })
}

export function getDictDataByPid(pid) {
  return fetch({
    url: `/dict/data-by-pid/${pid}`,
    method: 'get'
  })
}

export function getDictDataById(id) {
  return fetch({
    url: `/dict/data-by-id/${id}`,
    method: 'get'
  })
}

export function getDictCities() {
  return fetch({
    url: `/dict/cities`,
    method: 'get'
  })
}

// 省市
export function getDictProvinceCities() {
  return fetch({
    url: `/dict/province-cities`,
    method: 'get'
  })
}

export function getDictFileTypes(orderId) {
  return fetch({
    url: `/dict/file-types?orderId=${orderId}`,
    method: 'get'
  })
}

// 查询文件列表，未分页
export function getFiles(query) {
  return fetch({
    url: `/file/file-list`,
    method: 'get',
    params: query
  })
}
