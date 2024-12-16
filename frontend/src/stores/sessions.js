// src/stores/sessions.js
import axios from 'axios'
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSessionsStore = defineStore('sessions', () => {
  const sessions = ref([])
const loading = ref(false)
const error = ref(null)

  const fetchSessions = async (date = null) => {
  loading.value = true
  error.value = null
  try {
    let url = `http://localhost:3000/api/sessions`
    if (date) {
      url += `?date=${date}`
    }
    const response = await axios.get(url)

    // Логирование полного ответа от API
    console.log('API Response:', response.data)

    sessions.value = response.data  // response.data — массив сессий

    // Логирование полученных сессий
    console.log('Fetched Sessions:', sessions.value)
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка при загрузке сессий'
    console.error('Error fetching sessions:', error.value)
  } finally {
    loading.value = false
  }
  }

  return {
  sessions, loading, error, fetchSessions
  }
})
