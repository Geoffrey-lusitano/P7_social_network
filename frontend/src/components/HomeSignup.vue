<template>
    <article>
        <div class="container" :class="{'sign-up-active':signUp}">
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-right">
                        <h2>Bienvenue</h2>
                        <p>Merci de t'inscrire en remplisant tous les champs</p>
                        <button class="invert" id="signIn" @click="signUp = !signUp">Inscription</button>
                    </div>
                    <div class="overlay-left">
                        <h2>Bienvenue</h2>
                        <p>Veuillez vous connecter avec vos identifiants personnels</p>
                        <button class="invert" id="signUp" @click="signUp = !signUp">Connexion</button>
                    </div>
                </div>
            </div>
            <form class="sign-in" action="#">
                <h2>Connexion au compte</h2>
                <div>Entrez votre email et password</div>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <a href="#">Mot de passe oublié ?</a>
                <button>Connexion</button>
            </form>
                <form @submit.prevent="handleSubmit" class="sign-up" action="#">
                <h2>Creation du compte</h2>
                <div>Renseignez les champs suivant</div>
                <input type="text" v-model="name" placeholder="Prénom"/>
                <input type="text" v-model="last_name" placeholder="Nom de famille"/>
                <input type="email" v-model="email" placeholder="Email"/>
                <input type="password" v-model="password" placeholder="Password"/>
                <input type="password" v-model="confirm_password" placeholder="Confirm Password"/>
                <button>Inscription</button>
            </form>
        </div>
    </article>
</template>

<script>
export default {
  name: "HomeSignup",
  props: {
    msg: String,
  },
  data: () => {
      return {
          signUp: false,
          name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password:''
      }
  },
  methods: {
      handleSubmit () {
          const data = {
              name: this.name,
              last_name: this.last_name,
              email: this.email,
              password: this.password,
              confirm_password: this.confirm_password
            };
          console.log(data);
      }
  }
};
</script>

<style lang="scss" scoped>
    article {
        display: flex;
        justify-content: center;
    }
    .container {
        position: relative;
        width: 768px;
        height: 480px;
        border-radius: 50px;
        overflow: hidden;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                    0 10px 10px rgba(0, 0, 0, .2);
        background: linear-gradient(to bottom, #efefef, #ccc);

        .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform .5s ease-in-out;
            z-index: 100;
        }

        .overlay {
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            background: linear-gradient(to bottom right, #0064B1, #0F3471);
            color: #fff;
            transform: translateX(0);
            transition: transform .5s ease-in-out;
        }

        @mixin overlay($property) {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            padding: 70px 40px;
            width: calc(50% - 80px);
            height: calc(100% - 140px);
            text-align: center;
            transform: translateX($property);
            transition: transform .5s ease-in-out;
        }
        .overlay-left {
            @include overlay(-20%);
            //left: 0;
        }

        .overlay-right {
            @include overlay(0);
            right: 0;

        }
    }
    h2 {
        margin: 0;
        text-decoration: underline;
        text-decoration-color: #D05059;
        text-underline-offset: 7px ;
    }

    p {
        margin: 20px 0 30px;
    }

    a {
        color: #222;
        text-decoration: none;
        margin: 15px 0;
        font-size: 1rem;
    }

    button {
        border-radius: 20px;
        border: 1px solid #0F3471;
        background-color: #0F3471;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px 40px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform .1s ease-in;

        &:active {
            transform: scale(.9);
        }
        &:focus {
            outline: none;
        }
    }

    button.invert {
        background-color: transparent;
        border-color: #fff;
    }

    form {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 90px 60px;
        width: calc(50% - 120px);
        height: calc(100% - 180px);
        text-align: center;
        background: linear-gradient(to bottom, #efefef, #ccc);
        transition: all .5s ease-in-out;

        div {
            margin-top: 10px;
            font-size: 1rem;
        }

        input {
            background-color: #eee;
            border: none;
            padding: 8px 15px;
            margin: 6px 0;
            width: calc(100% - 30px);
            border-radius: 15px;
            border-bottom: 1px solid #ddd;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4);
            overflow: hidden;

            &:focus {
                outline: none;
                background-color: #fff;
            }
        }
    }

    .sign-in {
        left: 0;
        z-index: 2;
    }

    .sign-up {
        left: 0;
        z-index: 1;
        opacity: 0;
    }

    .sign-up-active {
        .sign-in {
            transform: translateX(100%);
        }
        .sign-up {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: show .5s;
        }

        .overlay-container {
            transform: translateX(-100%);
        }

        .overlay {
            transform: translateX(50%);
        }

        .overlay-left {
            transform: translateX(0);
        }

        .overlay-right {
            transform: translateX(20%);
        }
    }

    @keyframes show {
        0% {
            opacity: 0;
            z-index: 1;
        }
        49% {
            opacity: 0;
            z-index: 1;
        }
        50% {
            opacity: 0;
            z-index: 10;
        }
    }

</style>

