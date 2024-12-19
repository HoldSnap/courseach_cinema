<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title class="title">My Cinema App</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Кнопка перехода на страницу фильмов -->
    <v-btn
      @click="goToMovies"
      color="cyan"
      class="nav-btn"
      rounded
      elevation="5"
      large
    >
      <v-icon left>mdi-movie</v-icon>
      Фильмы
    </v-btn>

    <!-- Кнопка перехода к профилю -->
    <v-btn
      v-if="authStore.user"
      @click="goToProfile"
      color="green"
      class="nav-btn"
      rounded
      elevation="5"
      large
    >
      <v-icon left>mdi-account</v-icon>
      Профиль
    </v-btn>

    <!-- Кнопка выхода -->
    <v-btn
      v-if="authStore.user"
      @click="logout"
      color="red"
      class="nav-btn"
      rounded
      elevation="5"
      large
    >
      <v-icon left>mdi-logout</v-icon>
      Выйти
    </v-btn>

    <!-- Кнопка входа, если пользователь не авторизован -->
    <v-btn
      v-else
      @click="goToLogin"
      color="primary"
      class="nav-btn"
      rounded
      elevation="5"
      large
    >
      <v-icon left>mdi-login</v-icon>
      Войти
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';  // Импортируем useRouter

const authStore = useAuthStore();
const router = useRouter();  // Определяем router

const goToProfile = () => {
  router.push('/profile');
};

const logout = () => {
  authStore.logout();
  router.push('/login');  // Перенаправляем на страницу входа после выхода
};

const goToLogin = () => {
  router.push('/login');
};

// Новый метод для перехода к фильмам
const goToMovies = () => {
  router.push('/sessions');  // Путь для страницы с фильмами
};
</script>

<style scoped>
/* Стиль для навигационных кнопок */
.nav-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
}

.nav-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-toolbar-title {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1.5rem;
  text-transform: uppercase;
}

/* Стиль для иконок в кнопках */
.v-btn .v-icon {
  font-size: 1.2rem;
  margin-right: 10px;
}

/* Дополнительный стиль для кнопок */
.v-btn {
  margin: 0 10px;
}
</style>
