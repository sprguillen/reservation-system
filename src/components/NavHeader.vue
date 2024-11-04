<template>
  <nav class="px-4 py-4 flex justify-between items-center">
    <div>
      <router-link to="/">
        <img src="../assets/logo.png" alt="logo" class="w-12 h-12" />
      </router-link>
    </div>
    <div>
      <CustomButton type="secondary" @onClick="clickHandler">Disable Reservations</CustomButton>
    </div>
  </nav>
</template>
<script>
import CustomButton from './CustomButton.vue';

export default {
  name: 'NavHeader',
  components: {
    CustomButton,
  },
  methods: {
    clickHandler () {
      console.log('test');
    }
  }
}
</script>