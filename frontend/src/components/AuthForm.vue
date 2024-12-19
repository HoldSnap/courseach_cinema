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
      <button type="submit" :disabled="loading" class="submit-btn">
        <v-icon left v-if="loading">mdi-loading</v-icon>
        {{ loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться') }}
      </button>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
    <p>
      <router-link :to="isLogin ? '/register' : '/login'" class="auth-link">
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
  max-width: 450px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: 'Roboto', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.75rem;
  font-weight: bold;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #bbb;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #333;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.4);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-btn:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #369870;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1rem;
}

p {
  text-align: center;
  margin-top: 1.5rem;
}

.auth-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.auth-link:hover {
  text-decoration: underline;
  color: #369870;
}
</style>
