import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
class HyRequest {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log(config)
      return config
    })
    this.instance.interceptors.response.use((config: AxiosRequestConfig) => {
      console.log(config)
      return config
    })
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
