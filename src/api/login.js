import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo() {
  return fetch({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function changePassword(query) {
  return fetch({
    url: '/user/change-password',
    method: 'post',
    params: query
  })
}
