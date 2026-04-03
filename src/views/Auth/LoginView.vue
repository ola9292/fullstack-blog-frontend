<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'


const authStore = useAuthStore()

const formData = ref({
    email:null,
    password:null,
})

const handleSubmit = () => {
    authStore.login(formData.value)
}

onMounted(() => {
    authStore.errors = {}
})
</script>

<template>
    <main class="mt-24">

        <form @submit.prevent="handleSubmit">
            <div class="w-96 border rounded mx-auto p-4">
                <div class="my-2">
                    <h1 class="text-xl">Login</h1>
                </div>
                <label class="floating-label my-4">
                    <span>Your Email</span>
                    <input type="text" placeholder="mail@site.com" class="input input-primary input-md w-full" v-model="formData.email"/>
                    <p class="text-red-500" v-if="authStore.errors?.email">{{ authStore.errors.email[0] }}</p>
                </label>
                <label class="floating-label my-4">
                    <span>Your Password</span>
                    <input type="password" placeholder="mail@site.com" class="input input-primary input-md w-full" v-model="formData.password"/>
                    <p class="text-red-500" v-if="authStore.errors?.password">{{ authStore.errors.password[0] }}</p>
                </label>
                <button class="btn btn-active btn-primary w-full">Login</button>
            </div>
        </form>
        
    </main>
</template>