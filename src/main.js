// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store'
import AlertComponent from './components/General/Alert.vue'
import CreateEditAd from './components/General/CreateEditAd.vue'
import AdsList from './components/General/AdsList.vue'

Vue.use(Vuetify)
Vue.component('app-alert', AlertComponent)
Vue.component('app-create-edit-ad', CreateEditAd)
Vue.component('app-adslist', AdsList)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.$store.dispatch('dataConfig')
  }
})
