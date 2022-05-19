<template>
    <div class="main">
    <div class="container">
        <h1>Compte</h1>
        <div class="card">
            <div class="card-content">
                <div class="nom">
                    Nom : 
                </div>
                <div class="last_name">
                    Prénom : 
                </div>
                <div class="email">
                    Email :
                </div>

            </div>
            <button>
                Supprimer mon compte
            </button>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: 'Profil',
        data () {
            return {
                user: null
            }
        },
        
        async created () {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:3000/api/auth/user/${id}`, { 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
                
            });
            //this.$store.dispatch('user', response.data);
            console.log('ici');
            this.user = response.data;   
        },
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

// BODY 
.card-body {
    padding: 0 10px;
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