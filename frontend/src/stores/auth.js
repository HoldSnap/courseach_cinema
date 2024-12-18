import axios from 'axios';
import {defineStore} from 'pinia';
import {onMounted, ref} from 'vue';

import router from '../router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Функция для загрузки пользователя из localStorage при инициализации
  const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);
    }
  };

  // Вызов функции при инициализации хранилища
  onMounted(() => {
    loadUserFromLocalStorage();
  });

  // Вход в систему
  const login = async (loginData) => {
    loading.value = true;
    error.value = null;
    try {
      const response =
          await axios.post('http://localhost:3000/api/auth/login', loginData);
      user.value = response.data;
      // Сохранение пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Перенаправление после успешного логина
      router.push('/sessions');
    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка при входе';
    } finally {
      loading.value = false;
    }
  };

  // Регистрация пользователя
  const register = async (registerData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
          'http://localhost:3000/api/auth/register', registerData);
      user.value = response.data;
      // Сохранение пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Перенаправление после успешной регистрации
      router.push('/login');
    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка при регистрации';
    } finally {
      loading.value = false;
    }
  };

  // Выход из системы
  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
    router.push('/login');
  };

  return {user, error, loading, login, register, logout};
});
