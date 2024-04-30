import { createApp } from 'vue'
import App from '@/App.vue'
import '@/assets/styles/global.css'
import 'vant/es/notify/style'
import 'vant/es/dialog/style'
import VConsole from 'vconsole'

createApp(App)
  .mount('#app')

new VConsole()
