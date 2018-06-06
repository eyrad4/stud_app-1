import Vue from 'vue'
import Router from 'vue-router'
import AddsList from '@/components/AddsList'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import SingleAdd from '@/components/SingleAdd'
import AddForm from '@/components/AddForm'
import Page404 from '@/components/Page404'
import store from '../store'

Vue.use(Router)

const checkAuth = (to, from, next) => {
  let userInfo = store.getters.userInfo
  if (userInfo.token) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddsList',
      component: AddsList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ad/:id(\\d+)',
      name: 'SingleAdd',
      component: SingleAdd
    },
    {
      path: '/new',
      name: 'AddForm',
      component: AddForm,
      beforeEnter: checkAuth
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ],
  mode: 'history'
})
