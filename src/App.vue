<template>
  <div id="app">
    <nav>
      <router-link to="/">Paintings</router-link>
      <router-link to="/statues">Statues</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      state: 'Paintings'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav a{
  padding: 10px;
  color: white;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: rgb(187, 187, 187);
  text-decoration: none;
}
nav a.router-link-exact-active:hover {
  color: rgb(187, 187, 187);
  text-decoration: none;
}

nav a:hover {
  color: rgb(0, 183, 255);
  text-decoration: none;
}
</style>
