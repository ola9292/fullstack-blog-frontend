<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AboutView from './views/AboutView.vue';
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'


const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout();
}

onMounted(() => {
  authStore.getUser();
})
</script>

<template>
  <header>
    <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
                <RouterLink :to="{name: 'home'}">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{name: 'create'}">Create</RouterLink>
            </li>
            <li v-if="!authStore.user" class="nav-item">
                <RouterLink :to="{name:'register'}">Register</RouterLink>
            </li>
            <li v-if="authStore.user" class="nav-item">
              <a class="nav-link" href="#">
                <form @submit.prevent="handleLogout">
                    <button class="btn btn-danger">Logout</button>
                </form>
              </a>
            </li>
            <li v-if="authStore.user" class="nav-item">
              <p>welcome {{ authStore.user.name }}</p>
            </li>
            <li v-if="!authStore.user" class="nav-item">
              <a href="/login" class="btn btn-success">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav> -->

   <div class="bg-base-500 shadow-sm w-full rounded-md mb-4">
  <div class="navbar w-full">
    <div class="navbar-start">
      <label for="mobile-menu" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </label>
      <button class="btn btn-ghost text-xl"> <a href="/">Ola Blogs</a> <span v-if="authStore.user">(welcome {{ authStore.user.name }})</span></button>
    </div>

    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a><RouterLink :to="{name: 'create'}">Create</RouterLink></a></li>
        <li v-if="!authStore.user"><a><RouterLink :to="{name: 'login'}">Login</RouterLink></a></li>
        <li v-if="!authStore.user"><a><RouterLink :to="{name: 'register'}">Register</RouterLink></a></li>
        <li v-if="authStore.user">
          <form @submit.prevent="handleLogout">
              <button class="btn btn-danger">Logout</button>
          </form>
        </li>
      </ul>
    </div>

    <!-- <div class="navbar-end">
       <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs" />
    </div> -->
  </div>

  <input type="checkbox" id="mobile-menu" class="peer hidden" />
  
  <div class="hidden peer-checked:block lg:hidden bg-base-100 border-t border-base-300">
    <ul class="menu w-full p-4">
      <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul>
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
</div>
  </header>

  <RouterView />
</template>

