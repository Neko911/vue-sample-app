import * as firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

const firebaseConfig = {
  apiKey: 'AIzaSyDYSkEsp2KcrQQjRuiags9cTVfvcCMQ-pg',
  authDomain: 'modern-library.firebaseapp.com',
  databaseURL: 'https://modern-library.firebaseio.com',
  projectId: 'modern-library',
  storageBucket: 'modern-library.appspot.com',
  messagingSenderId: '703523161905'
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
