<template>
  <v-footer
    color="indigo"
    app
    padless
  >
    <v-row
      class="d-flex align-center justify-center"
      justify="center"
      align="center"
      style="height: 100px"
    >
      <v-col class="text-center">
        <span class="footer-text">
          © 2024 My Cinema App. Права не защищены 3&gt;
        </span>
      </v-col>
      <!-- Иконка GitHub в футере -->
      <v-col
        class="text-center"
        cols="auto"
      >
        <v-btn
          text
          @click="goToGitHub"
          class="github-btn"
        >
          <v-icon class="github-icon">mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>


const goToGitHub = () => {
  window.open('https://github.com/HoldSnap', '_blank'); // Открыть GitHub в новом окне
};
</script>

<style scoped>
.footer-text {
  color: white;
  font-size: 14px;
}

.github-btn {
  padding: 0;
}

.github-icon {
  font-size: 2rem;
  color: rgb(11, 80, 119);
}

.github-icon:hover {
  color: #00bcd4; /* Цвет иконки при наведении */
}
</style>
