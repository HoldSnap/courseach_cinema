import axios from 'axios';
import {defineStore} from 'pinia';
import {ref} from 'vue';

import router from '../router'; // Предполагается, что вы используете Vue Router

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const login = async (loginData) => {
    loading.value = true;
    error.value = null;
    try {
      const response =
          await axios.post('http://localhost:3000/api/auth/login', loginData);
      user.value = response.data;
      // Перенаправление после успешного логина
      router.push('/dashboard');
    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка при входе';
    } finally {
      loading.value = false;
    }
  };

  const register = async (registerData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
          'http://localhost:3000/api/auth/register', registerData);
      user.value = response.data;
      // Перенаправление после успешной регистрации
      router.push('/dashboard');
    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка при регистрации';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    router.push('/login');
  };

  return {user, error, loading, login, register, logout};
});
