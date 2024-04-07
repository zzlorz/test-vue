import Vue from 'vue'
import Vuex from 'vuex'
import request from '../request/index.js'
Vue.use(Vuex)

const s = {
  state: {
    token: '',
    leftbarTrigger: true,
    leftbarCount: 0,
    leftbarData: {},
    checkStatus: {},
    changeBar: {},
    detail: {},
    levelChange: {},
    titleChange: {},
    windowChange: {},
    taskimg: [],
    showSlider: {bool: false, index: 0},
    detailShow: false,
    userInfo: {},
    detailChange: {},
    detailPlanChange: {},
    orderlist: [],
    windowInfo: {}
  },
  mutations: {
    token (state, payload) {
      state.token = payload
    },
    leftbarTrigger (state, payload) {
      state.leftbarTrigger = payload
    },
    leftBarChange (state, payload) {
      state.leftbarData = payload
    },
    changeBar (state, payload) {
      state.changeBar = payload
      state.detailShow = false
    },
    todetail (state, payload) {
      state.detail = payload
      state.detailShow = true
    },
    detailShow (state, payload) {
      state.detailShow = payload
    },
    checkStatus (state, payload) {
      state.checkStatus = payload
    },
    levelChange (state, payload) {
      state.levelChange = payload
    },
    titleChange (state, payload) {
      state.titleChange = payload
    },
    windowChange (state, payload) {
      state.windowChange = payload
    },
    setWindowInfo ( state, payload ) {
      state.windowInfo = payload
    },
    taskimg (state, payload) {
      state.taskimg = payload
    },
    setSlider (state, payload) {
      state.showSlider = payload
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    detailChange (state, payload) {
      console.log(this)
      state.detailChange = payload
    },
    detailPlanChange (state, payload) {
      state.detailPlanChange = payload
    },
    getOrder (state, payload) {
      state.orderlist = payload
    }
  },
  actions: {
    getOrder (context, payload) {
      context.commit('getOrder', payload)
    },
    setTaskImgList (context, payload) {
      request({
        url: '/worklist/gettaskimg',
        method: 'post',
        data: {taskid: payload}
      }).then(res => {
        if (res.errcode === 0) {
          context.commit('taskimg', res.data)
        }
      })
    }
  },
  getters: {
    taskHeight (state) {
      return state.windowChange.taskHeight - 130 + 'px'
    }
  }
}
const store = new Vuex.Store(s)

export default store