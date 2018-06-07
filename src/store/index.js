import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'

Vue.use(Vuex)

const axiosHeaders = {
  basic: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  auth: {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': localStorage.getItem('userToken')
    }
  }
}

const Store = new Vuex.Store({
  state: {
    alert: null,
    success: false,
    user: {
      token: (localStorage.getItem('userToken')) ? localStorage.getItem('userToken') : '',
      role: (localStorage.getItem('userRole')) ? localStorage.getItem('userRole') : '',
      login: (localStorage.getItem('userLogin')) ? localStorage.getItem('userLogin') : '',
      id: (localStorage.getItem('userId')) ? localStorage.getItem('userId') : ''
    }
  },
  mutations: {
    setAlert (state, params) {
      state.alert = params
    },
    clearAlert (state) {
      state.alert = null
    },
    setSuccess (state) {
      state.success = true
    },
    setUser (store, params) {
      store.user = {
        token: params.token,
        role: params.userRole.name,
        login: params.userLogin,
        id: params.userId
      }
      localStorage.setItem('userToken', params.token)
      localStorage.setItem('userRole', params.userRole.name)
      localStorage.setItem('userId', params.userId)
      localStorage.setItem('userLogin', params.userLogin)
    },
    claerUser (store) {
      store.user = {
        token: '',
        role: '',
        login: '',
        id: ''
      }
      localStorage.removeItem('userToken')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      localStorage.removeItem('userLogin')
    }
  },
  actions: {
    signUp ({commit}, params) {
      commit('clearAlert')
      let data = {
        name: params.name,
        login: params.email,
        password: params.password
      }
      axios.post(API.signup, data, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('setAlert', {alertType: 'success', title: 'Congratulations', text: 'Now you can Sign In!'})
            commit('setSuccess')
          }
        })
        .catch(function (error) {
          commit('setAlert', {alertType: 'error', title: 'Error', text: 'Maybe user already exist, or else...'})
        })
    },
    signIn ({commit}, params) {
      commit('clearAlert')
      let data = {
        login: params.email,
        password: params.password
      }
      axios.post(API.signin, data, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('setUser', response.data)
            commit('setAlert', {alertType: 'success', title: 'Congratulations', text: 'You are logged!'})
            commit('setSuccess')
          }
        })
        .catch(function (error) {
          commit('claerUser')
          commit('setAlert', {alertType: 'error', title: 'Error', text: 'Login or password wrong...'})
        })
    },
    logout ({commit}) {
      axios.post(API.logout, {id: this.state.user.id}, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('claerUser')
          }
        })
        .catch(function (error) {
          commit('claerUser')
        })
    },
    clearAlert ({commit}) {
      commit('clearAlert')
    }
  }
})

export default Store
