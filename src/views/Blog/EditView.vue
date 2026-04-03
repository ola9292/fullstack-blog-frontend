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

const handleEditBlog = () => {
    console.log(formData.value)
    blogStore.editBlog(formData.value)
}

const formData = ref({
    "slug" : null,
    "title" : null,
    "content" : null
})

onMounted(async () => {
    const slug = route.params.slug
    let result = await blogStore.getSingleBlog(slug);
    loading.value = false
    blog.value = result.data
    formData.value.title = result.data.title
    formData.value.content = result.data.content
    formData.value.slug = result.data.slug
    
}) 
</script>

<template>
    <main class="w-full lg:w-1/2 px-4 py-8 mx-auto">
        <h1 class="text-xl text-center">Create a Post</h1>
        <form @submit.prevent="handleEditBlog">
            <fieldset class="fieldset my-4">
                <legend class="fieldset-legend">Title</legend>
                <input type="text" class="input w-full" placeholder="Type here" v-model="formData.title"/>
                <p v-if="blogStore.errors.title" class="label text-red-500">{{ blogStore.errors.title[0] }}</p>
            </fieldset>
           

            <fieldset class="fieldset my-4">
                <legend class="fieldset-legend">Content</legend>
                <textarea class="textarea h-24 w-full" placeholder="Content" v-model="formData.content"></textarea>
                <p v-if="blogStore.errors.content" class="label text-red-500">{{ blogStore.errors.content[0] }}</p>
            </fieldset>

            <div class="my-4">
                <button class="btn btn-active btn-neutral w-full">Submit</button>
            </div>
            
        </form>
    </main> 
</template>