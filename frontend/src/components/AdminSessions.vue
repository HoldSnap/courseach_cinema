<template>
  <v-container fluid>
    <!-- Проверка, является ли пользователь администратором -->
    <v-row v-if="isAdmin">
      <v-col cols="12" md="6">
        <v-card class="session-card" elevation="10">
          <v-card-title class="session-card-title">
            <h2>Создание новой сессии</h2>
          </v-card-title>

          <v-form @submit.prevent="createSession">
            <v-text-field v-model="filmId" label="ID фильма" type="number" required></v-text-field>
            <v-text-field v-model="hallId" label="ID зала" type="number" required></v-text-field>
            <v-text-field v-model="startTime" label="Время начала" type="datetime-local" required></v-text-field>
            <v-text-field v-model="endTime" label="Время окончания" type="datetime-local" required></v-text-field>
            <v-text-field v-model="ticketPrice" label="Цена билета" type="number" step="0.01" required></v-text-field>

            <v-btn type="submit" color="primary" :loading="loading">Создать сессию</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Сообщение об ошибке -->
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="error">
          У вас нет прав для доступа к этой странице.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isAdmin = ref(false);
const filmId = ref('');
const hallId = ref('');
const startTime = ref('');
const endTime = ref('');
const ticketPrice = ref('');
const loading = ref(false);
const error = ref('');

// Проверка, является ли пользователь администратором
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/auth/user/data', {
      headers: {
        Authorization: `Bearer ${authStore.user.token}`
      }
    });
    isAdmin.value = response.data.role === 'administrator';
  } catch (err) {
    console.error('Ошибка при получении данных о пользователе', err);
  }
});


const createSession = async () => {
  if (!filmId.value || !hallId.value || !startTime.value || !endTime.value || !ticketPrice.value) {
    error.value = 'Пожалуйста, заполните все поля.';
    return;
  }

  loading.value = true;

  try {
    // Преобразуем строковое значение времени в объект Date
    const startTimeUTC = new Date(startTime.value).toISOString();
    const endTimeUTC = new Date(endTime.value).toISOString();

    // Отправляем данные на сервер
    await axios.post('http://localhost:3000/api/sessions', {
      filmId: parseInt(filmId.value),
      hallId: parseInt(hallId.value),
      startTime: startTimeUTC,
      endTime: endTimeUTC,
      ticketPrice: parseFloat(ticketPrice.value)
    }, {
      headers: {
        Authorization: `Bearer ${authStore.user.token}`
      }
    });

    // Очистка формы после успешного создания сессии
    filmId.value = '';
    hallId.value = '';
    startTime.value = '';
    endTime.value = '';
    ticketPrice.value = '';
    loading.value = false;
    router.push('/sessions'); // Перенаправляем на страницу с сессиями
  } catch (err) {
    loading.value = false;
    error.value = 'Ошибка при создании сессии.';
    console.error('Ошибка при создании сессии', err);
  }
};

</script>

<style scoped>
.session-card {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 30px;
}

.session-card-title h2 {
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
}

.v-btn {
  margin-top: 20px;
}

.v-alert {
  margin-top: 20px;
}

.v-text-field {
  margin-bottom: 15px;
}
</style>
