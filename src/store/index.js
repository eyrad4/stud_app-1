import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
      axios.post('http://api.studapp.mm/register', data, {
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
    }
  }
})

export default Store
