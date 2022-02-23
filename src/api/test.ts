import hyRequest from '@/service'
import type { DateType } from '@/service/request/type'
export function test(): Promise<any> {
  return hyRequest.request<DateType>({
    method: 'get',
    url: '/bp/api/tags/queryAll',
    showLoading: false
  })
}
