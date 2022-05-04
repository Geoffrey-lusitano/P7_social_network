<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.svg" />
    <HomeSignup/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSignup from "@/components/HomeSignup.vue";

export default {
  name: "HomeView",
  components: {
    HomeSignup
  },
};
</script>

<style lang="scss" scoped>
  .home {
    
    

    img {
      width: 30%;
    }
  }
  body {
    background-color: linear-gradient(to top, #D05059, white);
    border: 1px solid black;
  }

</style>
