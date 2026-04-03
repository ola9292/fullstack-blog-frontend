import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import CreateView from '@/views/Blog/CreateView.vue'
import ShowView from '@/views/Blog/ShowView.vue'
import { useAuthStore } from '@/stores/auth'
import EditView from '@/views/Blog/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta:{guest:true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{guest:true}
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { auth:true }
    },
    {
      path: '/show/:slug',
      name: 'show',
      component: ShowView,
    },
    {
      path: '/update/:slug',
      name: 'edit',
      component: EditView,
      meta: { auth:true }
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.getUser();

  if(authStore.user && to.meta.guest){
    return { name: "home"}
  }
  if(!authStore.user && to.meta.auth){
    return { name: "home"}
  }
})
export default router
