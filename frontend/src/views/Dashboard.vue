<template>
  <div class="dashboard">
    <h1>Добро пожаловать, {{ auth.user.login }}!</h1>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();

const logout = () => {
  auth.logout();
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 100px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style>
