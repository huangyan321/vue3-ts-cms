import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
interface HyInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptorsCatch?: (err: any) => any
}

interface HyAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: HyInterceptors
}
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
  async request(config: AxiosRequestConfig): Promise<any> {
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
