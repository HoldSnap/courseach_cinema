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

    <!-- Кнопка для перехода в админ-меню, если пользователь администратор -->
    <v-btn
      v-if="isAdmin"
      @click="goToAdminPanel"
      color="amber"
      class="nav-btn"
      rounded
      elevation="5"
      large
    >
      <v-icon left>mdi-cogs</v-icon>  <!-- Иконка для админ-панели -->
      Админ Панель
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();

// Стейт для проверки роли пользователя
const isAdmin = ref(false);

// Метод для перехода к фильму
const goToMovies = () => {
  router.push('/sessions');
};

// Метод для перехода в админ-панель
const goToAdminPanel = () => {
  router.push('/admin/sessions');
};

// Метод для выхода
const logout = () => {
  authStore.logout();
  localStorage.removeItem('userRole');  // Удаление роли из локального хранилища
  isAdmin.value = false;  // Обновляем состояние для скрытия кнопки
  router.push('/login');
};

// Метод для перехода в профиль
const goToProfile = () => {
  router.push('/profile');
};

// Метод для входа
const goToLogin = () => {
  router.push('/login');
};

// Получаем роль и данные пользователя при монтировании компонента
onMounted(async () => {
  // Если пользователь уже авторизован
  if (authStore.user) {
    // Получаем данные с сервера для определения роли
    try {
      const response = await axios.get('http://localhost:3000/api/auth/user/data', {
        headers: {
          Authorization: `Bearer ${authStore.user.token}`,
        },
      });
      const role = response.data.role;
      localStorage.setItem('userRole', role); // Сохраняем роль в localStorage
      isAdmin.value = role === 'administrator';
    } catch (err) {
      console.error('Ошибка при получении данных о пользователе', err);
    }
  } else {
    // Если пользователь не авторизован, проверяем роль из localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      isAdmin.value = storedRole === 'administrator';
    }
  }
});

// Следим за состоянием пользователя и обновляем роль
watch(
  () => authStore.user,
  async (newUser) => {
    if (newUser) {
      // Пользователь авторизован, получаем роль с сервера
      try {
        const response = await axios.get('http://localhost:3000/api/auth/user/data', {
          headers: {
            Authorization: `Bearer ${newUser.token}`,
          },
        });
        const role = response.data.role;
        localStorage.setItem('userRole', role);
        isAdmin.value = role === 'administrator';
      } catch (err) {
        console.error('Ошибка при получении данных о пользователе', err);
      }
    } else {
      // Пользователь вышел, скрываем админ-кнопку
      isAdmin.value = false;
      localStorage.removeItem('userRole');
    }
  }
);
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
