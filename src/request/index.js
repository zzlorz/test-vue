import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import store from '@/store/index'
import router from '@/router/index'

const instance = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 10000
})

// POST传参序列化(添加请求拦截器)
// 在发送请求之前做某件事
instance.interceptors.request.use(config => {
  // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
  // if (config.method === 'post') {
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // }
  // 下面会说在什么时候存储 token
  let token = Cookies.get('token') || Cookies.get('Token')
  if (token) {
    config.headers.Authorization = token
    config.headers.Accept = 'application/json'
    store.commit('token', token)
  } else {
    store.commit('token', '')
    store.commit('setUserInfo', {})
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 自定义的 axios 响应拦截器
instance.interceptors.response.use((response) => {
  // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
  var token = response.headers.authorization
  if (token) {
    // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    axios.defaults.headers.common['Authorization'] = token
    Cookies.set('token', token)
    // store.commit('token', token)
  }
  return response.data
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 500:
      // 这里写清除token的代码
        store.commit('token', '')
        router.replace({
          path: '/login'
        })
    }
  }
  return Promise.reject(error)
})

export default instance