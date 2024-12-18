import axios from 'axios'
import {storeToRefs} from 'pinia'

import {useAuthStore} from '../stores/auth'

// Создаём экземпляр Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// Добавление интерцептора для добавления токена ко всем запросам
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.user && authStore.user.token) {
    config.headers.Authorization = `Bearer ${authStore.user.token}`
  }
  return config
}, (error) => {return Promise.reject(error)})

export default axiosInstance
