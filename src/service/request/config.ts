let BASE_URL = ''
const TIME_OUT = 5000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://docs.hgyn23.cn/admin/'
} else {
  BASE_URL = 'https://docs.hgyn23.cn/admin/'
}

export { BASE_URL, TIME_OUT }
