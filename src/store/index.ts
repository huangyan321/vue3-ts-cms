import { createStore } from 'vuex'
import getters from './getters'
import login from './module/login'
export default createStore({
  modules: {
    login
  },
  getters
})
