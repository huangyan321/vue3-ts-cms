import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import type { HyAxiosRequestConfig } from './type'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = true
class HyRequest {
  instance: AxiosInstance
  loading: any
  showLoading: boolean
  constructor(config: HyAxiosRequestConfig) {
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch
    )
    //全局拦截
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        console.log('全局request拦截')
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (res: AxiosRequestConfig) => {
        if (this.showLoading === true) {
          setTimeout(() => {
            this.loading.close()
          }, 2000)
        }
        this.showLoading = DEFAULT_LOADING
        console.log('全局response拦截')
        return res
      },
      (err) => {
        if (this.showLoading === true) {
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
      if (config.showLoading === false) {
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
