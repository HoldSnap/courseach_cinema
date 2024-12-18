// stores/seats.js
import axios from 'axios'
import {defineStore} from 'pinia'
import {ref} from 'vue'

import {eventBus} from '../event-bus'

import {useAuthStore} from './auth'

export const useSeatsStore = defineStore('seats', () => {
  const seats = ref([])
const loading = ref(false)

  const fetchSeats = async (sessionId) => {
  loading.value = true
  try {
    const response = await axios.get(
        `http://localhost:3000/api/seats/availability?sessionId=${sessionId}`)
    seats.value = response.data
  } catch (err) {
    console.error('Error in fetchSeats:', err)
    eventBus.addError('Ошибка при загрузке мест')
  } finally {
    loading.value = false
  }
  }

  const bookSeat = async (seat) => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  if (!token) {
    eventBus.addError('Необходима авторизация')
    console.error('No token for authorization')
    return
  }

  const bookingData = {
    sessionId: Number(seat.sessionId),
    seatId: seat.seatId
  }

  const config = {
    headers:
        {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
  }

  try {
    const response = await axios.post(
        'http://localhost:3000/api/tickets/book', bookingData, config)
    console.log('Booking response:', response)
    alert('Место забронировано')
  } catch (err) {
    console.error('Booking error:', err.response ? err.response.data : err)

    if (err.response && err.response.data &&
        err.response.data.error === 'Insufficient balance') {
      eventBus.addError('Недостаточно средств для бронирования')
    }
    else {
      eventBus.addError('Ошибка при бронировании места')
    }
  }
  }

  return {
  seats, loading, fetchSeats, bookSeat
  }
})
