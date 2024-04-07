import request from '@/utils/request.js'

export function getIndexList (data) {
  return request.get('gettheme', {params: data})
}
export function getItemDetail (data) {
  return request.get('gettheme/item', {params: data})
}
