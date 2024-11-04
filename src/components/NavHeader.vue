<template>
  <nav>
    <div>
      <router-link to="/">
        <img src="../assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div>
      <button class="secondary" @click="clickHandler">Disable Reservations</button>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavHeader',
  methods: {
    clickHandler () {
      console.log('test');
    }
  }
}
</script>
<style scoped>
img {
  width: 3rem;
  height: 3rem;
}

nav {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  justify-content: space-between;
}
</style>