import * as fireabase from 'firebase/app'
import 'firebase/auth'

export default {
  namespaced: true,
  state: {
    status: false,
    token: '',
    roles: []
  },
  mutations: {
    auth (state, s) {
      state.status = !!s
    },
    updateToken (state, s) {
      if (!s) {
        state.token = ''
        return
      }
      fireabase.auth().currentUser
        .getIdToken()
        .then((t) => {
          state.token = t
        })
        .catch((e) => {
          if (e) { throw e }
        })
    },
    updateRoles (state, r) {
      state.roles = r || []
    }
  },
  actions: {
    async signIn ({ commit, dispatch, state, rootState }, { email, password, signup }) {
      const auth = fireabase.auth()
      const prom = signup
        ? auth.createUserWithEmailAndPassword(email, password)
        : auth.signInWithEmailAndPassword(email, password)
      return prom
        .then((r) => {
          commit('auth', true)
          commit('updateToken', true)
          dispatch('getRoles')
          return r
        })
        .catch((e) => {
          commit('auth', false)
          commit('updateToken', false)
          commit('updateRoles', [])
          throw e
        })
    },
    async signOut ({ commit }) {
      return fireabase
        .auth()
        .signOut()
        .then(() => {
          commit('auth', false)
          commit('updateToken', false)
          commit('updateRoles', [])
        })
    },
    async getRoles ({ commit, rootState }) {
      // debugger
      fireabase
        .auth()
        .currentUser
        .getIdToken()
        .then((t) => {
          fetch(`${rootState.restUrl}\\user`, { headers: { [rootState.tokenHeader]: t } })
            .then((r) => {
              r.json()
                .then((j) => {
                  commit('updateRoles', j)
                })
            })
        })
    },
    async checkAuth ({ commit, dispatch }) {
      if (!fireabase.auth().currentUser) {
        commit('auth', true)
        commit('updateToken')
        dispatch('getRoles')
      }
    }
  }
}
