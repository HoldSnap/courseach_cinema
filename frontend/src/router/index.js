import {createRouter, createWebHistory} from 'vue-router';

import Dashboard from '../views/Dashboard.vue'; // Создайте эту страницу по необходимости
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  {path: '/', redirect: '/login'}, {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/dashboard', component: Dashboard, meta: {requiresAuth: true}}
];

const router = createRouter({history: createWebHistory(), routes});

// Защита маршрутов, требующих аутентификации
import {useAuthStore} from '../stores/auth';

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
