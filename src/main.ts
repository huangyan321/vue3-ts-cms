import { createApp } from 'vue'
import { registerApp } from './global'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
registerApp(app)
console.log(performance.now())

app.use(store)
app.use(router)
app.mount('#app')

console.log(performance.now())
