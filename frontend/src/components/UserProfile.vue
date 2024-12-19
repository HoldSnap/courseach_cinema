<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="profile-card" elevation="10">
          <v-card-title class="profile-card-title">
            <v-avatar size="80" class="mr-6">
              <v-img :src="userData.avatar || '/default-avatar.jpg'" />
            </v-avatar>
            <div>
              <h2 class="headline">{{ userData.name }}</h2>
              <v-card-subtitle class="balance">
                <strong>Баланс:</strong> {{ userData.balance }} $
              </v-card-subtitle>
            </div>
          </v-card-title>

          <!-- Добавим раздел с аватаром -->
          <v-card-actions>
            <v-btn
              @click="goToEditProfile"
              class="profile-btn"
              rounded
              large
              elevation="2"
            >
              Редактировать профиль
            </v-btn>
          </v-card-actions>
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
/* Стиль для карточки профиля */
.profile-card {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 30px;
}

/* Стиль для заголовка */
.profile-card-title {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 2px solid #ddd;
}

/* Стиль для имени пользователя */
.profile-card-title .headline {
  font-size: 2rem; /* Увеличили размер шрифта */
  font-weight: bold;
  margin: 0;
  color: #333;
}

/* Стиль для баланса */
.balance {
  font-size: 1.25rem; /* Увеличили размер шрифта */
  font-weight: 500;
  margin-top: 10px;
  color: #555;
}

/* Стиль для кнопки редактирования профиля */
.profile-btn {
  display: flex;  /* Используем flexbox для выравнивания текста */
  justify-content: center;  /* Горизонтальное выравнивание */
  align-items: center;  /* Вертикальное выравнивание */
  transition: all 0.3s ease; /* Плавный переход для всех свойств */
  padding: 12px 24px; /* Увеличены отступы для кнопки */
  font-size: 1.1rem; /* Увеличили размер текста */
  font-weight: 600; /* Сделали текст жирным для лучшего контраста */
  color: #1976d2; /* Цвет текста по умолчанию */
  border: 2px solid #1976d2; /* Рамка по умолчанию */
}

.profile-btn:hover {
  color: white; /* Белый цвет текста при наведении */
  background-color: #1976d2; /* Фон кнопки при наведении */
  border: 2px solid #1976d2; /* Рамка остается на месте */
}

.profile-btn:focus {
  outline: none; /* Убираем контур при фокусе */
}

/* Стиль для аватара */
.v-avatar {
  border-radius: 50%;
  border: 3px solid #1976d2;
}

.v-avatar img {
  object-fit: cover;
}

/* Отступы */
.v-btn {
  margin-top: 20px;
}
</style>
