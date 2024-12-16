// src/main.js
// Импорт иконок Material Design
import '@mdi/font/css/materialdesignicons.css'

import {createPinia} from 'pinia'
import {createApp} from 'vue'

import App from './App.vue'
// Импорт плагина Vuetify
import vuetify from './plugins/vuetify'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)  // Подключение Vuetify

app.mount('#app')
