import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import index from '@/pages/index.vue'
import todo from '@/pages/todo.vue'
import login from '@/pages/login.vue'
import photo from '@/pages/photo.vue'
import register from '@/pages/register.vue'
import admin from '@/pages/admin.vue'
import theme from '@/pages/theme.vue'
import themeDetail from '@/pages/themedetail.vue'
import notFont from '@/pages/404.vue'
import store from '@/store/index.js'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: themeDetail
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/theme/add',
      name: 'themeAdd',
      component: theme,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/theme/edit/:id',
      name: 'themeEdit',
      component: theme,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/photo',
      name: 'photo',
      component: photo
    },
    {
      path: '/todo',
      name: 'todo',
      component: todo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/404',
      name: 'notFont',
      component: notFont
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.token || Cookies.get('token') || Cookies.get('Token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  if (to.matched.length === 0) {
    next('/404')
  } else {
    next()
  }
})
router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})
export default router
