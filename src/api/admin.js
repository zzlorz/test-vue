import request from '@/utils/request.js'

export function getThemeList (data) {
  return request.get('theme', {params: data})
}
