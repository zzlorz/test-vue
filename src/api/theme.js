import request from '@/utils/request.js'

export function getItem (data) {
  return request.get('theme/item', {params: data})
}

export function postItem (data) {
  return request.post('theme/item', data)
}

export function putItem (data) {
  return request.put('theme/item', data)
}

export function deleteItem (data) {
  return request.delete('theme/item', {params: data})
}
