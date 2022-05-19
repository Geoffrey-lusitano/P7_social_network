<template>
    <div class="main">
        <div  v-for="post in posts" class="card">
            <header class="card-header">
                <div class="card-title">
                    {{ post.user.name }} {{ post.user.last_name }}
                </div>
                <div class="card-date">
                    créer le :{{ post.createdAt }}
                </div>
            </header>
            <div class="card-body">
                <h2 class="card-title">{{ post.title }}</h2>
                <p class="card-content">
                    {{ post.content }}
                </p>
                <img :src='post.attachment'  class="fullwidth">
            </div>
            <div class="card-footer">

                <div class="card-comments">
                    <CommentList/>
                </div>
                <div class="card-comment-create">
                    <CommentCreate/>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
import axios from "axios"
import CommentList from "@/components/CommentList.vue";
import CommentCreate from "@/components/CommentCreate.vue";
    export default {
        name: 'PostList',
        components: {
            CommentList,
            CommentCreate,
        },
        data () {
            return {
                posts: [],
            }

        },
        async created () {
            console.log('ok');
            const response = await axios.get('http://localhost:3000/api/post', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.posts = response.data;
            console.log(this.posts); 
        },  
    }
</script>

<style lang="scss" scoped>
// HEADER
.card {
    border: 1px solid #DBDBDB;
    background: #FFFF;
    border-radius: 5px;
    margin-bottom: 10px;
}
.card-header {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgba(15,52,113, 0.6);
    margin: 10px;
    border-radius: 3px;
}


.card-title {
    font-weight: bold;
    color: #000;
    font-size: 18px;
    margin: 5px 0;
}
.card-date {
    color: rgba(0, 0, 0, 0.38);
    font-size: 12px;
}
// BODY 
.card-body {
    padding: 0 10px;
}
.card-body .fullwidth {
    width: calc(100% + 20px);
    display: block;
    margin: 0 -10px;
}
.card-body p:first-child {
    margin-top: 0;
}
.card-body p:last-child {
    margin-bottom: 0;
}


</style>