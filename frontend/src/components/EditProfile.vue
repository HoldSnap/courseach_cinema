<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Редактировать профиль</v-card-title>

          <!-- Форма для редактирования профиля -->
          <v-form @submit.prevent="updateProfile">
            <v-text-field
              v-model="formData.name"
              label="Имя"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="formData.avatar"
              label="Ссылка на аватар"
              outlined
            ></v-text-field>

            <v-btn type="submit" color="primary">Сохранить изменения</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Данные формы
const formData = ref({
  name: '',
  avatar: ''
});

// Получаем текущие данные пользователя
onMounted(() => {
  const user = authStore.user;
  if (user) {
    formData.value.name = user.name;
    formData.value.avatar = user.avatar;
  }
});

// Обновление профиля
const updateProfile = async () => {
  const token = authStore.user.token;
  try {
    await axios.post(
      'http://localhost:3000/api/auth/user/update-profile',
      formData.value,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    // После успешного обновления перенаправляем на профиль
    router.push('/profile');
  } catch (error) {
    console.error('Ошибка при обновлении профиля', error);
  }
};
</script>
