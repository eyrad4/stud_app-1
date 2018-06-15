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
    },
    dataConfig: {
      cities: '',
      categories: '',
      adTypes: ''
    },
    ad: '',
    adsList: '',
    sortList: [
      { value: 'Date ASC' },
      { value: 'Date DESC' },
      { value: 'Price ASC' },
      { value: 'Price DESC' }
    ],
    sort: 'Date DESC',
    searchResult: ''
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
    clearSuccess (state) {
      state.success = false
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
    },
    setDataConfig (store, params) {
      store.dataConfig = {
        cities: params.cities,
        categories: Array.from(params.categories),
        adTypes: Array.from(params.adTypes)
      }
    },
    setAd (store, params) {
      store.ad = params
    },
    setAdsList (store, params) {
      store.adsList = params
    },
    setSort (store, params) {
      store.sort = params
    },
    setSearchResult (store, params) {
      store.searchResult = params
    }
  },
  actions: {
    clearAlert ({commit}) {
      commit('clearAlert')
    },
    clearSuccess ({commit}) {
      commit('clearSuccess')
    },
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
          if (error.status !== 200) {
            commit('setAlert', {alertType: 'error', title: 'Error', text: 'Maybe user already exist, or else...'})
          }
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
          if (error.status !== 200) {
            commit('claerUser')
            commit('setAlert', {alertType: 'error', title: 'Error', text: 'Login or password wrong...'})
          }
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
          if (error.status !== 200) {
            commit('claerUser')
          }
        })
    },
    dataConfig (context, params) {
      axios.get(API.dataConfig, {}, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            context.commit('setDataConfig', response.data)
          }
        })
    },
    createAd ({commit}, params) {
      commit('clearAlert')
      let data = new FormData()
      if (params.id !== '' || params.id === undefined) {
        data.append('id', params.id)
      }
      data.append('name', params.name)
      data.append('text', params.text)
      data.append('photo', params.photo)
      data.append('price', params.price)
      data.append('category_id', params.categoryId)
      data.append('city_id', params.cityId)
      data.append('typead_id', params.typeAdId)
      data.append('user_id', params.user_id)

      axios.post(API.createAd, data, axiosHeaders.auth)
        .then(function (response) {
          if (params.id === '' || params.id === undefined) {
            commit('setAlert', {alertType: 'success', title: 'Congratulations', text: 'You create new ad!'})
            commit('setAdsList', response.data)
          } else {
            console.log(response.data.price)
            commit('setAlert', {alertType: 'success', title: 'Congratulations', text: 'You ad is edit!'})
            commit('setAd', response.data)
          }
          commit('setSuccess')
        })
        .catch(function (error) {
          if (error.status !== 200) {
            commit('setAlert', {alertType: 'error', title: 'Error', text: 'Something wrong...'})
          }
        })
    },
    getAd ({commit}, params) {
      axios.get(API.showAd + params.id, {}, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('setAd', response.data)
          }
        })
        .catch(function (error) {
          if (error.status !== 200) {
            console.log(error)
          }
        })
    },
    getAdsList ({commit}, params) {
      let data = {
        params: {
          sort: this.state.sort,
          category: '',
          limit: ''
        }
      }
      if (Object.keys(params).length >= 1) {
        commit('setSort', params.sort)
        data = {
          params: {
            sort: params.sort,
            category: params.currentCategory,
            limit: params.display,
            f_cities: (params.filters) ? params.filters.f_cities : '',
            f_vip: (params.filters) ? params.filters.f_vip : '',
            f_my: (params.filters) ? params.filters.f_my : ''
          }
        }
      }
      axios.get(API.adsList, data, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('setAdsList', response.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    search ({commit}, params) {
      axios.get(API.search + params.search, {}, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('setSearchResult', response.data)
          }
        })
        .catch(function (error) {
          if (error.status !== 200) {
            console.log(error)
          }
        })
    },
    getAdsListIndex ({commit}, params) {
      axios.get(API.index, {}, axiosHeaders.basic)
        .then(function (response) {
          if (response.status === 200) {
            commit('setAdsList', response.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  getters: {
    adsListLimitShow (state) {
      return (limitNumber) => {
        return state.adsList.slice(0, limitNumber)
      }
    }
  }
})

export default Store
