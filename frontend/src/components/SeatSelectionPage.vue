<!-- src/components/SeatSelectionPage.vue -->
<template>
  <v-container>
    <v-row justify="center" class="my-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Выберите место для сеанса: {{ session?.film.title }} в зале {{ session?.hall.name }}
          </v-card-title>

          <v-card-text>
            <!-- Индикатор загрузки мест -->
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
              class="ma-4"
            ></v-progress-circular>

            <!-- Сообщение об ошибке при загрузке мест -->
            <v-alert v-if="error" type="error" dismissible>
              {{ error }}
            </v-alert>

            <!-- Отображение мест -->
            <v-row v-if="!loading && !error" justify="center">
              <v-col cols="12" class="d-flex flex-wrap justify-center">
                <v-btn
                  v-for="seat in seats"
                  :key="seat.id"
                  :color="seat.isAvailable ? 'blue' : 'red'"
                  class="ma-1"
                  @click="handleSeatClick(seat)"
                  :disabled="!seat.isAvailable || bookingLoading"
                  small
                >
                  {{ seat.number }}
                </v-btn>
              </v-col>
            </v-row>

            <!-- Индикатор загрузки при бронировании -->
            <v-row v-if="bookingLoading" justify="center" class="my-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>

            <!-- Сообщение об успешном бронировании -->
            <v-alert v-if="bookingSuccess" type="success" dismissible class="mt-4">
              Билет успешно забронирован!
            </v-alert>

            <!-- Сообщение об ошибке бронирования -->
            <v-alert v-if="bookingError" type="error" dismissible class="mt-4">
              {{ bookingError }}
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <v-btn color="secondary" @click="goBack">Назад</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookingStore } from '../stores/booking';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();
const authStore = useAuthStore();

const sessionId = parseInt(route.params.id, 10);

// Проверка валидности sessionId
if (isNaN(sessionId)) {
  // Если sessionId некорректен, перенаправляем пользователя на страницу сессий
  router.push('/sessions');
}

const fetchSessionDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${authStore.user?.token}`,
      },
    });
    bookingStore.selectedSession = response.data;
  } catch (err) {
    console.error('Ошибка при загрузке сеанса:', err);
    bookingStore.error = 'Не удалось загрузить информацию о сеансе';
  }
};

onMounted(async () => {
  await fetchSessionDetails();
  await bookingStore.fetchSeats(sessionId);
});

const session = computed(() => bookingStore.selectedSession);
const seats = computed(() => bookingStore.seats);
const loading = computed(() => bookingStore.loading);
const error = computed(() => bookingStore.error);
const bookingLoading = computed(() => bookingStore.bookingLoading);
const bookingError = computed(() => bookingStore.bookingError);
const bookingSuccess = computed(() => bookingStore.bookingSuccess);

const handleSeatClick = async (seat) => {
  if (!authStore.user) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    router.push('/login');
    return;
  }

  await bookingStore.bookSeat(sessionId, seat.id);
};

const goBack = () => {
  router.push('/sessions');
};
</script>

<style scoped>
.v-btn {
  min-width: 40px;
  min-height: 40px;
}
</style>
