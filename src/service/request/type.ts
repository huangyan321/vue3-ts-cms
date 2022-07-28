import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface HyInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface HyAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HyInterceptors<T>
  showLoading?: boolean
}
export interface DateType {
  code: number
  data: any
  msg: string
}
