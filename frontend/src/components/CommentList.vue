<template>
    <div class="main">
        <div class="line"></div>
        <h2> Commentaires </h2>
        <div  v-for="comment in comments" class="card">
                <h3 class="card-user">
                    Name of user {{ comment.userId }}
                </h3>
                <p class="card-content">
                    {{ comment.content }}
                </p>
        </div>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: 'CommentList',
        data () {
            return {
                comments: []
            }
        },
        async created () {
            console.log('ok');
            const response = await axios.get('http://localhost:3000/api/comment', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.comments = response.data;
            console.log(this.comments); 
        },  
    }
</script>

<style lang="scss" scoped>
// HEADER
.main {
    
    margin: 10px;
}
.line {
    background-color: rgba(208,80,89,0.5);
    height: 10px;
    border-radius: 5px;
}
h2 {
    font-size: 1.1rem;
    margin: 0;
    color: rgba(208,80,89);
}
.card {
    //border: 1px solid rgba(208,80,89,0.5);
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    padding: 0 10px;

    //margin-bottom: 1px;
}

.card-user {
    font-style: italic;
    font-size: 0.9rem;
    color: rgba(208,80,89);

    margin: 0;
}

.card-content {
        margin: 0;
        font-size: 0.9rem;
}


</style>