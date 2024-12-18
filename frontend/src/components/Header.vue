<template>
  <v-app-bar app>
    <v-toolbar-title>My Cinema App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="authStore.user" @click="goToProfile" color="primary">
      Профиль
    </v-btn>

    <v-btn v-if="authStore.user" @click="logout" color="secondary">
      Выйти
    </v-btn>

    <v-btn v-else @click="goToLogin" color="primary">
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
</script>
