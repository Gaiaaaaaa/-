import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/organ/list',
    method: 'get',
    params: query
  })
}

export function submitOrgan(isEdit, organ) {
  if (isEdit){
    return updateOrgan(organ);
  } else {
    return addOrgan(organ);
  }
}

//管理营业部变更接口
export function userListByBelongId(query) {
  return fetch({
    url: '/change-management/torders-department-update',
    method: 'post',
    params: query
  })
}

export function getDutyList(query) {
  return fetch({
    url: '/organ/list-duty',
    method: 'get',
    params: query
  })
}

export function getTeamDetail(teamId) {
  return fetch({
    url: `/organ/select/${teamId}`,
    method: 'get'
  })
}

export function getTeamList(query) {
  return fetch({
    url: '/organ/select-team-list',
    method: 'get',
    params: query
  })
}


