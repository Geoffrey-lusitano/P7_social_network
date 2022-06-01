<template>
    <div class="main">
        <div class="container">
            <form @submit.prevent="handleSubmit" class="sign-up" action="#">
                <input type="text" v-model="name" placeholder="Prénom"/>
                <input type="text" v-model="last_name" placeholder="Nom de famille"/>
                <input type="email" v-model="email" placeholder="Email"/>
                <input type="password" v-model="password" placeholder="Password"/>
                <input type="password" v-model="confirm_password" placeholder="Confirm Password"/>
                <button>Inscription</button>
                <button @click="$router.push('login')">Connexion</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Signup",
    props: {
        msg: String,
    },

// stockage des information de compte
    dataSignup: () => {
        return {
          name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password:''
        }
    },
    methods: {
        // recuperation des informations de compte
        // envoi des information de compte a l'api
        async handleSubmit () {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                name: this.name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            });
            const log = await axios.post('http://localhost:3000/api/auth/login', {
                email: this.email,
                password: this.password
            });
            localStorage.setItem('token', log.data.token);
            localStorage.setItem('userId', log.data.userId);
            localStorage.setItem('admin', response.data.admin);
            this.$router.push('actu');
        
        },
    },
};
</script>

<style lang="scss" scoped>
   .main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        width: 350px;
        background-color: #fff;
        //margin: 20px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        overflow: hidden;
    }
    form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 5px 10px;

        input {
            background-color: #eee;
            border: none;
            padding: 14px 16px;
            margin: 6px;
            width: 90%;
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
        button {
            border-radius: 6px;
            border: 1px solid #0F3471;
            background-color: #0F3471;
            color: #fff;
            width: 100%;
            font-size: 17px;
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
        a {
            text-decoration: none;
            color: #D05059;
            font-size: 15px;
        }
        .btn-secondary {
            width: 70%;
            font-size: 15px;
            padding: 15px 30px;
        }
    }
</style>

