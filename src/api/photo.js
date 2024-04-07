import request from '@/utils/request.js'

export function getPhoto (data) {
  return request.get('photo', {params: data})
}

export function postPhoto (data) {
  return request.post('photo', data)
}

export function putPhoto (data) {
  return request.put('photo', data)
}

export function deletePhoto (data) {
  return request.delete('photo', {params: data})
}
