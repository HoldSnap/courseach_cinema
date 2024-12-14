<template>
  <div class="auth-container">
    <h2>{{ isLogin ? 'Вход' : 'Регистрация' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="login">Логин</label>
        <input v-model="login" type="text" id="login" required />
      </div>
      <div class="input-group">
        <label for="password">Пароль</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться') }}
      </button>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
    <p>
      <router-link :to="isLogin ? '/register' : '/login'">
        {{ isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите' }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'; // Добавлен импорт 'computed'
import { useAuthStore } from '../stores/auth';

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  }
});

const login = ref('');
const password = ref('');
const authStore = useAuthStore();

const error = computed(() => authStore.error);
const loading = computed(() => authStore.loading);

const handleSubmit = () => {
  if (props.isLogin) {
    authStore.login({ login: login.value, password: password.value });
  } else {
    authStore.register({ login: login.value, password: password.value });
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #369870;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}

p {
  text-align: center;
  margin-top: 1rem;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
