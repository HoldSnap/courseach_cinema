<template>
  <v-container>
    <!-- Фильтр по дате и кнопка сброса -->
    <v-row class="my-4" align="center" justify="space-between">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="selectedDate"
          label="Выберите дату"
          type="date"
          @change="onDateChange"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-btn color="primary" @click="resetFilter">Сбросить фильтр</v-btn>
      </v-col>
    </v-row>

    <!-- Сообщение об ошибке -->
    <v-alert v-if="sessionsStore.error" type="error" dismissible>
      {{ sessionsStore.error }}
    </v-alert>

    <!-- Индикатор загрузки -->
    <v-progress-circular
      v-if="sessionsStore.loading"
      indeterminate
      color="primary"
      class="ma-4"
    ></v-progress-circular>

    <!-- Таблица сессий -->
    <v-data-table
      :headers="headers"
      :items="sessionsStore.sessions"
      :search="search"
      :loading="sessionsStore.loading"
      class="elevation-1"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
        ></v-text-field>
      </template>

      <!-- Форматирование времени начала -->
      <template #item.startTime="{ item }">
        {{ formatDate(item.startTime) }}
      </template>

      <!-- Форматирование времени конца -->
      <template #item.endTime="{ item }">
        {{ formatDate(item.endTime) }}
      </template>

      <!-- Кнопка для перехода на страницу с местами -->
      <template #item.actions="{ item }">
        <v-btn @click="goToSeats(item.id)" color="primary">Забронировать</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { useSessionsStore } from '../stores/sessions'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const sessionsStore = useSessionsStore()
const router = useRouter()

const selectedDate = ref('')
const search = ref('')

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Начало', value: 'startTime' },
  { text: 'Конец', value: 'endTime' },
  { text: 'Цена билета', value: 'ticketPrice' },
  { text: 'Фильм', value: 'film.title' },
  { text: 'Зал', value: 'hall.name' },
  { text: 'Действия', value: 'actions', sortable: false }
]

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('ru-RU', { timeZone: 'UTC' })
}

const onDateChange = () => {
  sessionsStore.fetchSessions(selectedDate.value)
}

const resetFilter = () => {
  selectedDate.value = ''
  sessionsStore.fetchSessions()
}

const goToSeats = (sessionId) => {
  router.push({ name: 'seats', query: { sessionId } })
}

onMounted(() => {
  sessionsStore.fetchSessions()
})
</script>

<style scoped>
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
