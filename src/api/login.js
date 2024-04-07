import request from '@/utils/request.js'

export function login (data) {
  return request.get('/login', {params: data})
}

export function logout (data) {
  return request.post('theme/logout', data)
}
