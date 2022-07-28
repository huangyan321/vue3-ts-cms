let BASE_URL = ''
const TIME_OUT = 5000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://159.75.104.17:9000'
} else {
  BASE_URL = 'http://121.196.101.73:9000'
}

export { BASE_URL, TIME_OUT }
