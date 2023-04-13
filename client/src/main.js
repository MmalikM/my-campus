import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'


import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
  clientId: '462354141802-u1etkl7ijs304k7oqasp64al9ue34bhk.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')
