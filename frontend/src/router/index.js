import {createRouter, createWebHistory} from 'vue-router'

import AdminSessions from '../components/AdminSessions.vue';
import SeatsPage from '../components/SeatsPage.vue'
import SessionsList from '../components/SessionsList.vue'
import ProfilePage from '../components/UserProfile.vue'; // Импортируем компонент профиля
import AdminDashboard from '../views/AdminDashboard.vue'
import UserLogin from '../views/UserLogin.vue'
import UserRegister from '../views/UserRegister.vue'

const routes =
    [
      {path: '/', redirect: '/login'},
      {path: '/login', component: UserLogin},
      {path: '/register', component: UserRegister},
      {
        path: '/dashboard',
        component: AdminDashboard,
        meta: {requiresAuth: true}
      },
      {path: '/sessions', component: SessionsList},
      {
        path: '/seats',
        name: 'seats',
        component: SeatsPage,
        props: route => ({sessionId: route.query.sessionId})
      },
      {
        path: '/profile',  // Путь для профиля
        component: ProfilePage,  // Компонент, который будет отображаться
        meta: {
          requiresAuth: true
        },  // Можно добавить защиту для авторизованных пользователей
      },
      {
        path: '/profile/edit',
        name: 'EditProfile',
        component: () => import(
            '../components/EditProfile.vue')  // Страница редактирования профиля
      },
      {
        path: '/admin/sessions',
        name: 'AdminSessions',
        component: AdminSessions,
        meta: {requiresAdmin: true}
      },
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

import{useAuthStore} from '../stores/auth'

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
