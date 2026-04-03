<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'


const authStore = useAuthStore()

const formData = ref({
    name:null,
    email:null,
    password:null,
    password_confirmation:null
})

const handleSubmit = () => {
    authStore.register(formData.value)
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
                    <h1 class="text-xl">Register</h1>
                </div>
                <label class="floating-label my-4">
                    <span>Your Name</span>
                    <input type="text" placeholder="mail@site.com" class="input input-primary input-md w-full" v-model="formData.email"/>
                    <p class="text-red-500" v-if="authStore.errors.name">{{ authStore.errors.name[0] }}</p>
                </label>
                <label class="floating-label my-4">
                    <span>Your Email</span>
                    <input type="text" placeholder="mail@site.com" class="input input-primary input-md w-full" v-model="formData.email"/>
                    <p class="text-red-500" v-if="authStore.errors.email">{{ authStore.errors.email[0] }}</p>
                </label>
                <label class="floating-label my-4">
                    <span>Your Password</span>
                    <input type="password" placeholder="*********" class="input input-primary input-md w-full" v-model="formData.password"/>
                    <p class="text-red-500" v-if="authStore.errors?.password">{{ authStore.errors.password[0] }}</p>
                </label>
                <label class="floating-label my-4">
                    <span>Password Confirmation</span>
                    <input type="password" placeholder="*********" class="input input-primary input-md w-full" v-model="formData.password"/>
                    <p class="text-red-500" v-if="authStore.errors?.password_confirmation">{{ authStore.errors.password_confirmation[0] }}</p>
                </label>
                <button class="btn btn-active btn-primary w-full">Register</button>
            </div>
        </form>
        
    </main>
</template>