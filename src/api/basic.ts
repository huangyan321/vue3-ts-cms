import hyRequest from '@/service'
import type { DateType } from '@/service/request/type'
import { LoginType } from './type'
export function login(data: LoginType): Promise<any> {
  return hyRequest.post<DateType>({
    url: '/user/login',
    showLoading: false,
    data,
    interceptors: {
      requestInterceptors: (config) => {
        return config
      },
      requestInterceptorsCatch(err) {
        return err
      },
      responseInterceptors: (config) => {
        return config
      },
      responseInterceptorsCatch(err) {
        return err
      }
    }
  })
}
export function getInfo(token: string): Promise<any> {
  return hyRequest.get<DateType>({
    url: '/user/fetchUserInfo',
    showLoading: false,
    params: {
      token
    },
    interceptors: {
      requestInterceptors: (config) => {
        return config
      },
      requestInterceptorsCatch(err) {
        return err
      },
      responseInterceptors: (config) => {
        return config
      },
      responseInterceptorsCatch(err) {
        return err
      }
    }
  })
}
