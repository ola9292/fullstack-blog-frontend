<script setup>
import { onMounted, ref } from 'vue'
import { useBlogStore } from '@/stores/blog';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const blogStore = useBlogStore()
const authStore = useAuthStore()
const blog = ref(null)
const loading = ref(true)
const comment = ref(null)
const isLiked = ref(false)

const handleDelete = (blog) => {
    blogStore.deleteBlog(blog)
}

const handleSubmitComment = async (slug) => {
  const new_comment_from_server =  await blogStore.addComment(slug, comment.value)
  blog.value.comments.push(new_comment_from_server)
  comment.value = "";
}

const handleToggleLike = async (slug) => {
    const like = await blogStore.toggleLike(slug)
    isLiked.value = like.liked
    if(isLiked.value){
        blog.value.likes++
    }else{
        blog.value.likes--
    }
}
onMounted(async () => {
    //console.log(route.params.slug)
    const slug = route.params.slug
    let result = await blogStore.getSingleBlog(slug);
    loading.value = false
    blog.value = result.data
}) 
</script>

<template>
    <main class="w-full lg:w-1/2 px-4 py-8 mx-auto">
        
       <div v-if="loading">
            <span class="loading loading-ring loading-lg"></span>
       </div>
        <div v-else-if="blog" class="container mx-auto px-4 py-10 max-w-4xl">
            <div v-if="loading" class="space-y-6">
            <div class="skeleton h-12 w-3/4"></div> <div class="flex gap-4 items-center">
                <div class="skeleton w-12 h-12 rounded-full shrink-0"></div> <div class="space-y-2">
                <div class="skeleton h-4 w-32"></div>
                <div class="skeleton h-4 w-20"></div>
                </div>
            </div>
            <div class="skeleton h-64 w-full"></div> </div>

            <article v-else class="animate-fade-in">
            
            <div class="text-sm breadcrumbs mb-6 opacity-60">
                <ul>
                <li><RouterLink to="/">Home</RouterLink></li> 
                <li>Blog Details</li>
                </ul>
            </div>

            <header class="mb-10">
                <h1 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                {{ blog.title }}
                </h1>

                <div class="flex items-center justify-between border-y border-base-200 py-6">
                    <div class="flex items-center gap-4">
                        <div class="avatar placeholder">
                            <div class="bg-primary text-primary-content rounded-full w-12">
                                <span class="text-lg">{{ blog.user.name.charAt(0).toUpperCase() }}</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-bold text-lg">{{ blog.user.name }}</p>
                            <p class="text-sm opacity-60">Published on {{ blog.member_since }}</p>
                        </div>
                    </div>

                    <div v-if="authStore.user" class="flex gap-2">
                        <button @click="handleToggleLike(blog.slug)" class="btn btn-ghost btn-circle">
                            <svg v-if="isLiked" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-error" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.74 4.5 2.056C13.454 3.74 14.943 3 16.5 3c2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.438 7.11-4.74 9.27a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <span class="flex items-center font-semibold">{{ blog.likes }}</span>
                    </div>
                </div>
            </header>

            <div class="prose lg:prose-xl max-w-none text-base-content/80 leading-relaxed">
                {{ blog.content }}
            </div>

            <footer class="mt-16 pt-10 border-t border-base-300">
                <div class="mb-4">
                    <div class="join">
                        <div>
                            <label class="input validator join-item">
                            <input type="email" placeholder="Nice post" v-model="comment"/>
                            </label>
                        </div>
                        <button class="btn btn-neutral join-item" @click="handleSubmitComment(blog.slug)">comment</button>
                    </div>
                </div>
                <h3 class="text-2xl font-bold mb-6">Comments ({{ blog.comments.length }})</h3>
                
                <div v-if="blog.comments.length" class="space-y-4 max-h-[200px] overflow-y-auto pr-4 custom-scrollbar">
                    <div v-for="comment in blog.comments" :key="comment.id" class="chat chat-start">
                        <div class="chat-header opacity-50 mb-1">{{ comment.user.name }}</div>
                        <div class="chat-bubble bg-base-200 text-base-content">{{ comment.message }}</div>
                    </div>
                </div>
                
                <div v-else class="alert bg-base-200">
                    <span>No comments yet. Be the first to join the conversation!</span>
                </div>
                <div v-if="authStore.user" class="flex gap-2">
                    <div v-if="authStore.user.id === blog.user.id" class="my-4">
                        <form @submit.prevent="handleDelete(blog)">
                            <button class="btn btn-secondary">Delete</button>
                        </form>
                    </div>
                    <div v-if="authStore.user.id === blog.user.id" class="my-4">
                        <RouterLink 
                            :to="{ name: 'edit', params: { slug: blog.slug } }" 
                            class="btn btn-primary"
                            >
                        Edit
                        </RouterLink>
                    </div>
                </div>
                
            </footer>
            </article>
        </div>

        <div v-else role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! This blog does not exist!</span>
        </div>

    </main>
</template>