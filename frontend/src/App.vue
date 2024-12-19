<template>
  <v-app class="app-container">
    <Header />
    <router-view />
    <Footer />
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
.app-container {
  padding: 100px;  /* Добавляем небольшой padding */
}
</style>
