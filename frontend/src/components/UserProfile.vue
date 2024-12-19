<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Профиль пользователя</v-card-title>

          <!-- Отображение аватара -->
          <v-img
            v-if="userData.avatar"
            :src="userData.avatar"
            alt="Аватар пользователя"
            class="avatar"
            height="150"
            width="150"
            contain
          ></v-img>

          <v-card-subtitle>
            <strong>Имя:</strong> {{ userData.name }}
          </v-card-subtitle>

          <v-card-subtitle>
            <strong>Баланс:</strong> {{ userData.balance }} $
          </v-card-subtitle>

          <!-- Кнопка редактирования профиля -->
          <v-btn @click="goToEditProfile" color="primary">Редактировать профиль</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userData = ref({});
const authStore = useAuthStore();
const router = useRouter();  // Определяем router

onMounted(async () => {
  if (!authStore.user) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return router.push('/login');
  }

  // Загружаем данные о пользователе с сервера
  const token = authStore.user.token; // Берем токен из authStore
  try {
    const response = await axios.get('http://localhost:3000/api/auth/user/data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    userData.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении данных о пользователе', error);
  }
});

// Перенаправление на страницу редактирования профиля
const goToEditProfile = () => {
  router.push('/profile/edit'); // Перенаправляем на страницу редактирования профиля
};
</script>

<style scoped>
/* Стиль для аватара */
.avatar {
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>
