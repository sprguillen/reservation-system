<template>
  <main class="p-4">
    <section class="shadow bg-white rounded-lg p-4 flex flex-col">
      <h1>Edit Branch Reservation Settings</h1>
      <form @submit.prevent="submitForm">

      </form>
    </section>
  </main>
</template>
<script>
export default {
  name: 'EditPage',
  methods: {
    submitForm() {
      console.log('test');
    }
  }
}
</script>
