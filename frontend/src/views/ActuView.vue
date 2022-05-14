<template>
  <div class="actu">
    <header class="topbar">
      <a href="#" class="topbar-logo"><img alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white.svg" /></a>
      <nav class="topbar-nav">
        <a href="/actu">Accueil</a>
        <a href="#">Créer un post</a>
        <a href="#">Profil</a>
        <a  href="javascript:void(0)" @click="handleUnConect">Deconnexion</a>
      </nav>
    </header>
    <div class="container">
      <h1>Voici les derniers post</h1>
      <Home/>
    </div>


  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios"
import Home from "@/components/Home.vue";

export default {
  name: "ActuView",
    components: {
      Home,
  },
  method: {
    handleUnConect() {
        localStorage.removeItem('token');
        this.$router.push('/login');
    }
  },

};
</script>

<style lang="scss" scoped>
  // HEADER
  .topbar {
    background: #0F3471;
    color: #fff;
    padding: 16px 0;
    text-align: center;
  }
  .topbar-logo {
    img {
      margin: 15px;
      padding-left: 16px;
      width: 40%;
    }
  }
  .topbar a {
    text-decoration: none;
    color: inherit;
  }
  .topbar-nav {
    padding-bottom: 16px;
  }
  .topbar-nav a {
    display: inline-block;
    margin: 0 12px;
    color: rgba(255, 255, 255, 0.70);
    transition: color .3s;
  }
  .topbar-nav a:hover,
  .topbar-nav a:active {
    color: #fff;
  }
  // CONTAINER
  .container {
    padding: 0 15px;
    max-width: 1050px;
    margin: 0 auto;
  }

  @media only screen and (min-width: 925px) {
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .topbar-logo {
      margin: 0;
      text-align: left;
    }
    .topbar-logo,
    .topbar-nav {
      padding: 0;
    }
  }
</style>