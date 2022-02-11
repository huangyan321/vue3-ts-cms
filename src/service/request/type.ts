import type { AxiosRequestConfig, AxiosInstance } from 'axios'
export interface HyInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptorsCatch?: (err: any) => any
}

export interface HyAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: HyInterceptors
}
