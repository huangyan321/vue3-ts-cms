let BASE_URL = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://159.75.104.17:9000'
} else {
  BASE_URL = 'http://121.196.101.73:9000'
}

export default BASE_URL
