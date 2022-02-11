import hyRequest from '@/service'
export function test(): Promise<any> {
  return hyRequest.request({
    method: 'get',
    url: '/bp/api/tags/queryAll'
  })
}
