import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import '@/assets/css/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
const app = createApp(App)
registerApp(app)
// 在页面刷新时将store中的数据保存到sessionStorage中
window.addEventListener('beforeunload', () => {
  const userInfo = {
    ...store.state.login
  }
  window.sessionStorage.setItem('USER_INFO', JSON.stringify(userInfo))
})
// 在页面刷新后获取sessionStorage中的token
const userInfo = window.sessionStorage.getItem('USER_INFO')
if (userInfo) {
  const user = JSON.parse(userInfo)

  store.commit('login/changeUserInfo', user.userInfo)
}
app.use(store)
app.use(router)
app.mount('#app')
