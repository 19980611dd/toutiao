import { getLocal, setLocal } from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const tokenKey = 'toutiao_token'

export default new Vuex.Store({
  state: {
    user: getLocal(tokenKey)
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setLocal(tokenKey, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
