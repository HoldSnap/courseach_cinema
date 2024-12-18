<template>
  <v-app class="app-container">
    <Header />
    <router-view />
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style scoped>
.app-container {
  padding: 34px;  /* Добавляем небольшой padding */
}
</style>
