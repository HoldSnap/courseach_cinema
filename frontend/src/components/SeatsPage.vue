<template>
  <v-container>
    <!-- Сообщение об ошибке -->
    <v-alert
      v-for="(error, index) in eventBus.errors"
      :key="index"
      type="error"
      dismissible
      @dismiss="eventBus.errors.splice(index, 1)"
    >
      {{ error }}
    </v-alert>

    <!-- Индикатор загрузки -->
    <v-progress-circular
      v-if="seatsStore.loading"
      indeterminate
      color="primary"
      class="ma-4"
    ></v-progress-circular>

    <!-- Места -->
    <v-row class="my-4">
      <v-col v-for="seat in seatsStore.seats" :key="seat.id" cols="3">
        <v-btn
          :color="seat.isAvailable ? 'blue' : 'red'"
          @click="bookSeat(seat)"
          :disabled="!seat.isAvailable"
        >
          Место {{ seat.number }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSeatsStore } from '../stores/seats'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { eventBus } from '../event-bus'

const route = useRoute()
const seatsStore = useSeatsStore()
const authStore = useAuthStore()
const router = useRouter()

const sessionId = ref(route.query.sessionId)

const fetchSeats = async () => {
  if (sessionId.value) {
    await seatsStore.fetchSeats(sessionId.value)
  }
}

const bookSeat = async (seat) => {
  if (!authStore.user) {
    router.push('/login')
    return
  }

  const data = {
    sessionId: sessionId.value,
    seatId: seat.id
  }

  try {
    await seatsStore.bookSeat(data)
    await fetchSeats()  // Обновить доступные места после бронирования
  } catch (error) {
    console.error('Booking error:', error)
    eventBus.addError('Ошибка при бронировании места')
  }
}

onMounted(() => {
  fetchSeats()
})
</script>
