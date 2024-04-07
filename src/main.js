// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import taskClassify from './utils/task.js'
import request from './request'
//import ElementUI from 'element-ui'
import moment from 'moment'
import Cookies from 'js-cookie'
//import 'element-ui/lib/theme-chalk/index.css'
import 'moment/locale/zh-cn'
// import windowSize from './utils/window.size.js'
// Vue.use(ElementUI)
// Vue.use(moment)
// Vue.use(Cookies)
Vue.prototype.$http = request
Vue.prototype.moment = moment
Vue.prototype.Cookies = Cookies
Vue.prototype.taskClassify = taskClassify
Vue.config.productionTip = false

Vue.filter('dateformat', (myInput, arg1) => {
  if (!myInput) {
    return ''
  }
  var date = moment(new Date(myInput)).format('MMMDo')
  var today = moment().format('MMMDo')
  var yesterday = moment(new Date(moment().format('YYYY-MM-') + (Number(moment().format('DD')) - 1) + ' 00:00:00')).format('MMMDo')
  var tomorrow = moment(new Date(moment().format('YYYY-MM-') + (Number(moment().format('DD')) + 1) + ' 00:00:00')).format('MMMDo')
  if (date === today) {
    return '今天'
  } else if (date === yesterday) {
    return '昨天'
  } else if (date === tomorrow) {
    return '明天'
  } else {
    return date
  }
})
Vue.filter('dateformats', (myInput, arg1) => {
  if (!myInput) {
    return '设置日期'
  }
  var date = moment(new Date(myInput)).format('MMMDo')

  var day = moment(new Date(myInput)).format('DD')
  var today = moment(new Date()).format('DD')

  var mouth = moment(new Date(myInput)).format('MM')
  var tomouth = moment(new Date()).format('MM')

  var year = moment(new Date(myInput)).format('YYYY')
  var toyear = moment(new Date()).format('YYYY')

  var todays = moment().format('MMMDo')
  var yesterday =moment(new Date(moment().format('YYYY-MM-') + (Number(moment().format('DD')) - 1) + ' 00:00:00')).format('MMMDo')
  var tomorrow = moment(new Date(moment().format('YYYY-MM-') + (Number(moment().format('DD')) + 1) + ' 00:00:00')).format('MMMDo')
  if (date === todays) {
    return '今天'
  } else if (date === yesterday) {
    return '昨天'
  } else if (date === tomorrow) {
    return '明天'
  } else {
    if (toyear - year > 0) {
      return toyear - year + '年前' + ',' + date
    } else if (toyear - year === 0 && tomouth - mouth > 0) {
      return tomouth - mouth + '月前' + ',' + date
    } else if (toyear - year === 0 && tomouth - mouth === 0 && today - day > 0) {
      return today - day + '天前' + ',' + date
    } else {
      return date
    }
  }
})
// Vue.mixin(windowSize)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
