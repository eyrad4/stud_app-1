import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const HTTP = 'http://api.studapp.mm/'
const Store = new Vuex.Store({
  state: {
    error: null,
    congratulations: null,
    user: {
      token: '',
      role: '',
      login: '',
      id: ''
    }
  },
  mutations: {
    setError (state, params) {
      state.error = params
    },
    clearError (state) {
      state.error = null
    },
    setCongratulations (state, params) {
      state.congratulations = params
    },
    setUser (store, params) {
      console.log(params)
      store.user.token = params.token
      store.user.role = params.userRole
      store.user.login = params.userLogin
      store.user.id = params.userId
    }
  },
  actions: {
    signUp ({commit}, params) {
      commit('clearError')
      let data = JSON.stringify({
        name: params.name,
        login: params.email,
        password: params.password
      })
      axios.post(HTTP + 'register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            commit('setCongratulations', {title: 'Congratulations', text: 'Now you can Sign In!'})
          }
        })
        .catch(function (error) {
          commit('setError', 'Error, maybe user already exist, or else...')
        })
    },
    signIn ({commit}, params) {
      let data = JSON.stringify({
        login: params.email,
        password: params.password
      })
      axios.post(HTTP + 'login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            console.log('все ок сохраняем в стор')
            commit('setUser', response.data)
            localStorage.setItem('userToken', response.data.token)
            localStorage.setItem('userRole', response.data.userRole.name)
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('userLogin', response.data.userLogin)
          }
        })
        .catch(function (error) {
          localStorage.removeItem('userToken')
          localStorage.removeItem('userRole')
          localStorage.removeItem('userId')
          localStorage.removeItem('userLogin')
          commit('setError', 'Login or password wrong...')
        })
    },
    logout ({commit}) {
      axios.post(HTTP + 'logout', {}, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': this.state.user.token
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            localStorage.removeItem('userToken')
            localStorage.removeItem('userRole')
            localStorage.removeItem('userId')
            localStorage.removeItem('userLogin')
            commit('setUser', {token: '', userRole: '', userLogin: '', userId: ''})
          }
        })
        .catch(function (error) {
          localStorage.removeItem('userToken')
          localStorage.removeItem('userRole')
          localStorage.removeItem('userId')
          localStorage.removeItem('userLogin')
        })
    },
    userInfo ({commit}) {
      let data = {
        token: (localStorage.getItem('userToken')) ? localStorage.getItem('userToken') : '',
        userRole: (localStorage.getItem('userRole')) ? localStorage.getItem('userRole') : '',
        userLogin: (localStorage.getItem('userLogin')) ? localStorage.getItem('userLogin') : '',
        userId: (localStorage.getItem('userId')) ? localStorage.getItem('userId') : ''
      }
      commit('setUser', data)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    error (state) {
      return state.error
    },
    congratulations (state) {
      return state.congratulations
    },
    userInfo (state) {
      return state.user
    }
  }
})

export default Store
