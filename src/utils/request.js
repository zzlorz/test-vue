import axios from 'axios'
import {getToken} from '@/utils/auth.js'
import { Message } from 'element-ui'

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.API_ROOT,
  // baseURL: 'http://localhost:3000',
  timeout: 5000
})

// Alter defaults after instance has been created
// instance.defaults.headers.common['authorization'] = getToken()

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = getToken()
  config.headers['Authorization'] = token
  config.headers['Accept'] = 'application/json'
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const data = response.data
  if (data.code !== 0) {
    Message({
      message: data.msg || 'Error',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(new Error(data.msg || 'Error'))
  } else {
    return data
  }
}, function (error) {
  // 对响应错误做点什么
  Message({
    message: error.msg || error,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default instance