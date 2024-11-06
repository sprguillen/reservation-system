<template>
  <div id="app">
    <header>
      <nav-header />
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue';

export default {
  name: 'App',
  components: {
    NavHeader,
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(226 232 240);
}

@media (min-width: 1024px) {
  #app {
    min-height: 1000px;
  }
}

@media (min-width: 2048px) {
  #app {
    min-height: 1500px;
  }
}
</style>
