import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from '../utils/index'
import api from '../utils/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    uaerMsg: {}
  },
  mutations: {
    'CHANGE_USER_MSG' (state, userMsg) {
      state.userMsg = userMsg
    }
  },
  actions: {
    getUserMsg (context) {
      fetch.get(api.getUserMsg).then(res => {
        context.commit('CHANGE_USER_MSG', res.data)
      })
    }
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
})

export default store
