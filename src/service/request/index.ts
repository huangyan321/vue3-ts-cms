import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import type { HyAxiosRequestConfig } from './type'
class HyRequest {
  instance: AxiosInstance
  constructor(config: HyAxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch
    )
  }
  async request(config: HyAxiosRequestConfig): Promise<any> {
    //单个请求拦截器
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    if (config.interceptors?.responseInterceptors) {
      config = config.interceptors.responseInterceptors(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default HyRequest
