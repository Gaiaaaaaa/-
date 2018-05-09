import fetch from '@/utils/fetch'

export function getCustomerManagerList(belongId) {
  return fetch({
    url: `/user/list-customer-manager/${belongId}`,
    method: 'get'
  })
}

export function updateCustomerManager(query) {
  return fetch({
    url: `/change-management/torders-manager-update`,
    method: 'post',
    params: query
  })
}

export function managerUpdateHis(query) {
  return fetch({
    url: `/change-management/manager-update-his`,
    method: 'get',
    params: query
  })
}

export function getCustomerServiceList(param) {
  return fetch({
    url: `/change-management/torders-customservice-list`,
    method: 'get',
    params: param
  })
}

export function updateCustomerService(query) {
  return fetch({
    url: `/change-management/torders-customerservice-update`,
    method: 'post',
    params: query
  })
}

export function serviceUpdateHis(query) {
  return fetch({
    url: `/change-management/servcie-update-his`,
    method: 'get',
    params: query
  })
}

export function updateCustomerName(query) {
  return fetch({
    url: `/change-management/torders-cusname-update`,
    method: 'post',
    params: query
  })
}

export function updateCustomerNameRecord(query) {
  return fetch({
    url: `/change-management/custname-update-his`,
    method: 'get',
    params: query
  })
}


export function updateDepartmentService(query) {
  return fetch({
    url: `/change-management/torders-department-update`,
    method: 'post',
    params: query
  })
}

export function departmentUpdateHis(query) {
  return fetch({
    url: `/change-management/department-update-his`,
    method: 'get',
    params: query
  })
}