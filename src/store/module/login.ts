import { Module } from 'vuex'
import { ILoginState } from '../store'
import { login, getInfo } from '@/api/basic'
import { getCache, setCache, deleteCache } from '@/utils/cache'
const getDefaultState = () => {
  return {
    token: getCache('token'),
    userInfo: {}
  }
}
const loginModule: Module<ILoginState, any> = {
  namespaced: true,
  state() {
    return getDefaultState()
  },
  getters: {},
  mutations: {
    changeToken(state, data) {
      state.token = data
    },
    changeUserInfo(state, data) {
      state.userInfo = data
    },
    resetToken(state) {
      state.token = ''
      state.userInfo = ''
    }
  },
  actions: {
    accountLoginAction({ commit }, { username, password }): Promise<void> {
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        })
          .then((res) => {
            if (res.code === 200) {
              const token = res.token
              commit('changeToken', token)
              setCache('token', token)
              resolve(token)
            } else {
              reject(res.msg)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getUserInfoAction({ state, commit }): Promise<void> {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then((res) => {
            if (res.code === 200) {
              commit('changeUserInfo', res.data[0])
              setCache('userInfo', res.data[0])
              resolve(res.data[0])
            } else {
              reject(res.msg)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    resetToken({ state, commit }): Promise<void> {
      return new Promise((resolve, reject) => {
        commit('resetToken')
        resolve()
        deleteCache('token')
        deleteCache('userInfo')
      })
    }
  }
}
export default loginModule
