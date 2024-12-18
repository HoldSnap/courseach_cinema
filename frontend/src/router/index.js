import {createRouter, createWebHistory} from 'vue-router'

import SeatsPage from '../components/SeatsPage.vue'
import SessionsList from '../components/SessionsList.vue'
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
