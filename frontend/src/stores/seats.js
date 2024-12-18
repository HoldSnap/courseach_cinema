// stores/seats.js
import axios from 'axios'
import {defineStore} from 'pinia'
import {ref} from 'vue'

import {useAuthStore} from './auth'

export const useSeatsStore = defineStore('seats', () => {
  const seats = ref([])
const loading = ref(false)
const error = ref(null)

  const fetchSeats = async (sessionId) => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(
        `http://localhost:3000/api/seats/availability?sessionId=${sessionId}`)
    seats.value = response.data
  } catch (err) {
    error.value = 'Ошибка при загрузке мест'
    console.error('Fetch seats error:', err)
  } finally {
    loading.value = false
  }
  }

  const bookSeat = async (seat) => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  if (!token) {
    error.value = 'Необходима авторизация'
    console.error('No token for authorization')
    return
  }

  // Здесь мы создаём новый объект для данных бронирования
  const bookingData = {
    sessionId: Number(seat.sessionId),  // Преобразуем sessionId в число
    seatId: seat.seatId  // Убедитесь, что seat.id — это число
  }

  const config = {
    headers:
        {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
  }

                 console.log('Booking data:', bookingData)

  try {
    await axios.post(
        'http://localhost:3000/api/tickets/book', bookingData, config)
    alert('Место забронировано')
  } catch (err) {
    error.value = 'Ошибка при бронировании места'
    console.error('Booking error:', err.response ? err.response.data : err)
  }
  }

  return {
  seats, loading, error, fetchSeats, bookSeat
  }
})
