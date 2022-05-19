<template>
    <div class="main">
        <div class="card">
            <div class="card-body">
                <input type="text" class="card-content">
                    
                <button type="submit" class="card-btn" @clik="commentData">Envoyer</button>
            </div>

           
        </div>
    </div>
</template>

<script>
import axios from "axios"

    export default {
    name: 'CommentCreate',
            data () {
                return {
                    content: '',
                    postId: '',
                    userId: '',
                }
            },
            methods: {
                async createComment() {
                    const response = await axios.post('http://localhost:3000/api/comment', {
                        content: this.content,
                        postId: this.postId,
                        userId: this.userId,
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                    });
                }
            }
    }
</script>

<style lang="scss" scoped>
// HEADER
.main {
    margin: 10px;
    height: 60px;
}
.card {
    background: #FFFF;
    border-radius: 5px;
    margin-bottom: 10px;
}
.card-body {
    display: flex;

}
.card-content {
    background-color: #eee;
    border: none;
    padding: 14px 16px;
    width: 90%;
    margin-right: -5px;
    border-radius: 6px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4);
    overflow: hidden;
    font-size:17px;
    &:focus {
    outline: none;
    background-color: #fff;
    }
}
.card-btn {
    background-color: #0F3471;
    border-radius: 0 6px 6px 0;
    border: none;
    color: #fff;
    font-weight: bold;
    &:active {
        transform: scale(.9);
    }
    &:focus {
        outline: none;
    }
}


</style>