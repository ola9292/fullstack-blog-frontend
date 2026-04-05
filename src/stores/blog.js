// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth';

export const useBlogStore = defineStore('blogStore', {
  state: () => {
    return { 
        count: 0,
        user: null,
        errors:{},
        blogs:[],
        message:null
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async createBlog(formData) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('/api/blogs', formData ,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            this.router.push({name: 'home'})
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
    async getBlogs(page) {
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(`/api/blogs?page=${page}`);
           console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error.response.data);
        }
    },
    async getSingleBlog(slug) {
        try {
           
            const response = await axios.get(`/api/blogs/${slug}`);
            
            return response.data
        } catch (error) {
            console.error(error.response.data);
        }
    },
    async deleteBlog(blog) {
        const authStore = useAuthStore()
        const user_id = authStore.user.id;
        
        if(user_id === blog.user.id){
            try {
                const token = localStorage.getItem("token");
                const response = await axios.delete(`/api/blogs/delete/${blog.slug}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
               
                this.router.push({name: 'home'})
            } catch (error) {
                console.error(error.response.data);
            }
        }else{
            console.log("you are not authorized to take this action")
        }
        
    },
    async editBlog(formData) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`/api/blogs/update/${formData.slug}`, formData ,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            this.router.push({name: 'home'})
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
    async addComment(slug, comment) {
        //console.log(slug, comment)
        const formData = {"message": comment}
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`/api/blogs/comment/${slug}`, formData ,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data)
            return response.data.data
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
    async toggleLike(slug) {
        console.log(slug)
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`/api/blogs/like/${slug}`,{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
           
            return response.data
        } catch (error) {
            this.errors = error.response.data.errors
        }
    },
  },
})