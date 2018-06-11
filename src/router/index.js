import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import SingleAd from '@/components/SingleAd'
import AddForm from '@/components/AddForm'
import Page404 from '@/components/Page404'

Vue.use(Router)

const checkAuth = (to, from, next) => {
  if (localStorage.getItem('userToken')) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      name: 'SingleAd',
      component: SingleAd
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
