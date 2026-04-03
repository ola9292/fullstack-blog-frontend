<script setup>
import { onMounted, ref } from 'vue'
import { useBlogStore } from '@/stores/blog';

const blogStore = useBlogStore()

const blogs = ref([])
const loading = ref(true)

onMounted(async () => {
    
    let result = await blogStore.getBlogs();
    loading.value = false
    blogs.value = result.data
    
}) 
</script>

<template>
    <main class="w-full lg:w-1/2 px-4 py-8 mx-auto">
        <div class="my-4">
            <h1 class="text-2xl">Latest Blogs</h1>
        </div>
        <div v-if="loading">
            <span class="loading loading-ring loading-lg"></span>
        </div>
     
        <div v-else-if="blogs.length > 0" class="space-y-6">
            <div v-for="blog in blogs" :key="blog.id" class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div class="card-body p-6">
                
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                    <div class="avatar placeholder">
                        <div class="bg-primary text-primary-content rounded-full w-8">
                        <span class="text-xs">{{ blog.user.name.charAt(0).toUpperCase() }}</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">{{ blog.user.name }}</p>
                        <p class="text-xs opacity-60">Posted on {{ blog.member_since }}</p>
                    </div>
                    </div>
                    <div class="badge badge-ghost badge-sm italic">#{{ blog.id }}</div>
                </div>

                <h2 class="card-title text-2xl hover:text-primary cursor-pointer">
                    
                    {{ blog.title }}
                
                </h2>
                
                <p class="text-base-content/70 line-clamp-3">
                    {{ blog.content }}
                </p>

                <div class="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
                    <div class="flex gap-4">
                    <div class="flex items-center gap-1 text-sm opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <span>{{ blog.likes }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-sm opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        <span>{{ blog.comments.length }}</span>
                    </div>
                    </div>

                    <RouterLink 
                        :to="{ name: 'show', params: { slug: blog.slug } }" 
                        class="btn btn-primary btn-sm"
                        >
                        Read More
                    </RouterLink>
                </div>

                </div>
            </div>
        </div>
        <div v-else>
            <div role="alert" class="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Warning: No blogs yet!</span>
            </div>
        </div>
    </main>
</template>