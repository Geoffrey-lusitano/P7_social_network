<template>
    <div class="main">
    <div class="container">
        <h1>Compte</h1>
        <div class="card">
            <div class="card-content">
                <div class="nom">
                    Nom : {{user.last_name}}
                </div>
                <div class="last_name">
                    Prénom : {{user.name}}
                </div>
                <div class="email">
                    Email : {{user.email}}
                </div>

            </div>
            <form @submit.prevent="deleted" class="form">
                <button type="submit" class="btn btn-primary" @clik="deteledData;">
                    Supprimer mon compte
                </button>
            </form>
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
                user: '',
            }
        },
        
        async created () {
            const id = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:3000/api/auth/user/${id}`, 
            { 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
                
            });
            console.log('ici');
            this.user = response.data;   
        },
        methods: {
            async deleted () {
                const id = localStorage.getItem('userId');
                const response = await axios.delete(`http://localhost:3000/api/auth/user/${id}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                this.user = response.data;
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                this.$router.push('/login');
                console.log('deleted');

            },
        }



    }
</script>

<style lang="scss" scoped>
.card {
    border: 1px solid #DBDBDB;
    background: #FFFF;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

// BODY 
.card-content {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
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

@media only screen and (max-width: 925px) {
    h1 {
        display: flex;
        justify-content: center;
    }
    .card {
        display:flex;
        flex-direction: column;
    }
    .form {
        display: flex;
        //align-items: center;
        justify-content: center;
    }
}
</style>