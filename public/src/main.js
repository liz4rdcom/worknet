// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import '@/customized-bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App'
import router from './router'
import utils from './utils'
import webApi from './webApi'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.prototype.$http = webApi

Vue.filter('boolToText', function (value) {
  return value ? 'დიახ' : 'არა'
})

Vue.filter('stringDateToDateMonthYearForm', utils.stringDateToDateMonthYearForm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
