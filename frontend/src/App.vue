<template>
<div>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/actu">Actu</router-link>
  </nav>
  <router-view />
</div>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0F3471;
}



nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #0F3471;

    &.router-link-exact-active {
      color: #0064B1;
    }
  }
}
</style>
