// src/stores/booking.js
import axios from 'axios';
import {defineStore} from 'pinia';
import {ref} from 'vue';

import {useAuthStore} from './auth';  // Импортируем хранилище аутентификации

export const useBookingStore = defineStore('booking', () => {
  const selectedSession = ref(null);
  const seats = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const bookingLoading = ref(false);
  const bookingError = ref(null);
  const bookingSuccess = ref(false);

  const authStore =
      useAuthStore();  // Получаем доступ к хранилищу аутентификации

  const fetchSeats = async (sessionId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
          `http://localhost:3000/api/seats/availability?sessionId=${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${
                  authStore.user?.token}`,  // Передаём токен авторизации
            },
          });
      seats.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка при загрузке мест';
    } finally {
      loading.value = false;
    }
  };

  const bookSeat = async (sessionId, seatId) => {
    bookingLoading.value = true;
    bookingError.value = null;
    bookingSuccess.value = false;
    try {
      const response = await axios.post(
          'http://localhost:3000/api/tickets/book', {
            sessionId,
            seatId,
          },
          {
            headers: {
              Authorization: `Bearer ${
                  authStore.user?.token}`,  // Передаём токен авторизации
              'Content-Type': 'application/json',
            },
          });
      bookingSuccess.value = true;
      // Обновляем статус места после успешного бронирования
      const seatIndex = seats.value.findIndex((seat) => seat.id === seatId);
      if (seatIndex !== -1) {
        seats.value[seatIndex].isAvailable = false;
      }
      // Обновляем баланс пользователя, если требуется
      if (response.data.updatedBalance) {
        authStore.updateBalance(response.data.updatedBalance);
      }
    } catch (err) {
      bookingError.value =
          err.response?.data?.error || 'Ошибка при бронировании места';
    } finally {
      bookingLoading.value = false;
    }
  };

  const resetBooking = () => {
    selectedSession.value = null;
    seats.value = [];
    error.value = null;
    bookingError.value = null;
    bookingSuccess.value = false;
  };

  return {
    selectedSession,
    seats,
    loading,
    error,
    bookingLoading,
    bookingError,
    bookingSuccess,
    fetchSeats,
    bookSeat,
    resetBooking,
  };
});
