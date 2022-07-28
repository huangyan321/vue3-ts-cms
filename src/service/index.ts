// 统一输出
import HyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
export default new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = ''
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('requestInterceptors')
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log('requestInterceptorsCatch')
    },
    responseInterceptors: (config) => {
      console.log('responseInterceptors')
      return config
    },
    responseInterceptorsCatch: (err) => {
      console.log('requestInterceptorsCatch')
    }
  },
  showLoading: false
})
