import axios from 'axios'
import type { AxiosInstance } from 'axios'
//接口扩展
import type { HyAxiosRequestConfig, HyInterceptors } from './type'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = false
class HyRequest {
  instance: AxiosInstance
  loading?: any
  showLoading: boolean
  interceptors?: HyInterceptors
  constructor(config: HyAxiosRequestConfig) {
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
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
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        if (this.showLoading) {
          this.loading.close()
        }
        this.showLoading = DEFAULT_LOADING
        const data = config.data
        if (data.code !== 200) {
          return Promise.reject(data.msg)
        }
        return data
      },
      (err) => {
        if (this.showLoading) {
          this.loading.close()
        }
        this.showLoading = DEFAULT_LOADING
        return Promise.reject(err)
      }
    )
  }
  async request<T>(config: HyAxiosRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }
      //单个请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T>(config: HyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: HyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default HyRequest
