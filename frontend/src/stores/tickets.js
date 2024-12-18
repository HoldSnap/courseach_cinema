// src/stores/tickets.js
import axios from 'axios'
import {defineStore} from 'pinia'
import {ref} from 'vue'

import {useAuthStore} from './auth'

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref([])
const loading = ref(false)
const error = ref(null)
const authStore = useAuthStore()

  const purchaseTicket = async (sessionId, seatId) => {
  loading.value = true
  error.value = null
  try {
    const token =
        authStore.user?.token  // Предполагается, что токен хранится в user
    const response = await axios.post(
        'http://localhost:3000/api/tickets/book', {sessionId, seatId}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
    tickets.value.push(response.data.ticket)
    return response.data.ticket
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка при бронировании билета'
    console.error('Ошибка при бронировании билета:', error.value)
    throw new Error(error.value)
  } finally {
    loading.value = false
  }
  }

  return {
  tickets, loading, error, purchaseTicket,
  }
})
