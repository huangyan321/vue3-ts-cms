import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global'
const app = createApp(App)
registerApp(app)

// import elementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

app.use(store)
app.use(router)
app.mount('#app')
