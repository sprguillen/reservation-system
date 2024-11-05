<template>
  <dialog ref="dialog" class="dialog w-full max-w-md border-none rounded-lg shadow-lg bg-white p-0">
    <div class="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-gray-100">
      <h3 class="text-lg font-bold text-gray-700">{{ title }}</h3>
      <span class="text-gray-500 hover:text-gray-700 cursor-pointer" @click.self="close">X</span>
    </div>
    <div class="p-5 text-gray-800">
      <slot></slot>
    </div>
    <div class="flex justify-end px-4 py-3 border-t border-gray-300 bg-gray-100">
      <slot name="footer"></slot>
    </div>
  </dialog>
</template>
<script>
export default {
  name: 'PopupModal',
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    open() {
      this.$refs.dialog.showModal();
    },
    close() {
      this.$refs.dialog.close();
    }
  }
}
</script>
<style scoped>
.dialog {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
