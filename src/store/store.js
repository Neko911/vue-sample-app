import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    tokenHeader: 'X-Firebase-Auth',
    restUrl: 'https://spring-library-api.herokuapp.com/rest'
  },
  mutations: {
    set (state, { path, items }) {
      this.state[path] = items
    }
  }
})
