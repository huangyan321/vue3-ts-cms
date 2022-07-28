import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
//接口扩展
import type { HyAxiosRequestConfig, HyInterceptors } from './type'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = true
class HyRequest {
  instance: AxiosInstance
  loading?: any
  showLoading: boolean
  interceptors?: HyInterceptors
  constructor(config: HyAxiosRequestConfig) {
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    console.log(this.showLoading, 'showLoading')
    this.instance = axios.create(config)
    //定制拦截
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch
    )
    //定制拦截
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch
    )
    //全局拦截
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log(this.showLoading)

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        console.log('所有实例request拦截')
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (res: AxiosRequestConfig) => {
        if (this.showLoading) {
          this.loading.close()
        }
        this.showLoading = DEFAULT_LOADING
        console.log('所有实例response拦截')
        return res
      },
      (err) => {
        if (this.showLoading) {
          this.loading.close()
        }
        this.showLoading = DEFAULT_LOADING
        console.log(err)
        return err
      }
    )
  }
  async request<T>(config: HyAxiosRequestConfig): Promise<T> {
    //单个请求拦截器
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    if (config.interceptors?.responseInterceptors) {
      config = config.interceptors.responseInterceptors(config)
    }
    return new Promise((resolve, reject) => {
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default HyRequest
