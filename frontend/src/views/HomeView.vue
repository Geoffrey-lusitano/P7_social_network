<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-above-font.svg" />
    <Signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/Signup.vue";

export default {
  name: "HomeView",
  components: {
    Signup
  },
};
</script>

<style lang="scss" scoped>
  .home {
    img {
      width: 30%;
    }
  }


</style>
