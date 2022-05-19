<template>
    <div class="main">
        <div  class="card">
            <header class="card-header">
                <div class="card-title">
                    Créer un post
                </div>
            </header>
            <div class="card-body">
                <form @submit.prevent="createPost">
                    <h2 class="card-title">
                        <input type="text" class="input-title" v-model="title" placeholder="Titre">
                    </h2>
                    <p class="card-content">
                        <input type="text" class="input-content" v-model="content" placeholder="Contenu">
                    </p>
                    <div class="card-body-button">
                        <label class="btn btn-secondary">
                            Ajouter une image
                            <input type="file" @change="onFileSelected"/>
                        </label>
                        <button type="submit" class="btn " @clik="postData">
                            Publier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: 'PostCreate',
        data () {
            return {
                title: '',
                content: '',
                userId: '',
                selectdFile: null,
            }
        },
        methods: {
            onFileSelected (event) {
                this.selectedFile = event.target.files[0];
                console.log(this.selectedFile);
            },
            async createPost() {
                const attachment = new FormData()
                attachment.append('files', this.selectdFile)
                console.log('ok')
                const id = localStorage.getItem('userId');
                const response = await axios.post('http://localhost:3000/api/post', {
                    title: this.title,
                    content: this.content,
                    userId: parseInt(id),
                    attachment,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
            },

        }
    }
</script>

<style lang="scss" scoped>
// HEADER
.card {
    border: 1px solid #DBDBDB;
    background: #FFFF;
    border-radius: 5px;
    margin-bottom: 20px;
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
.card-body-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
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
input[type="file"] {
    display: none;
}
input {
    width: calc(100% - 10px);
    overflow: hidden;
    border:none;
    background-color: #eee;
    border-radius: 3px;
    &:focus {
        outline: none;
        background-color: #fff;
    }
}
.input-title {

}
.input-content {

    height: 100px;
}
button, label {
    border-radius: 3px;
    border: 1px solid #0F3471;
    background-color: #0F3471;
    color: #fff;
    font-weight: bold;
    padding: 15px 40px;
    margin: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;
    &:active {
        transform: scale(.9);
    }
    &:focus {
        outline: none;
    }
}
.btn-secondary {
    background-color: #D05059;
    border: 1px solid #D05059;
}


</style>