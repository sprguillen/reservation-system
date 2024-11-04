<template>
  <dialog ref="dialog" class="dialog">
    <div class="dialog__header">
      <h3 class="dialog__title">{{ title }}</h3>
      <span class="dialog__close-btn" @click="close">X</span>
    </div>
    <div class="dialog__body">
      <slot></slot>
    </div>
    <div class="dialog__footer">
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
  width: 400px;
  max-width: 90%;
  border: none;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  position: relative;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1em;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f7f7f7;
}

.dialog__title {
  margin: 0;
  font-size: 1em;
  font-weight: bold;
}

.dialog__close-btn {
  background: transparent;
  border: none;
  font-size: 1em;
  cursor: pointer;
  color: #888;
}

.dialog__close-btn:hover {
  color: #555;
}

.dialog__body {
  padding: 1.2em;
  font-size: 16px;
  color: #333;
}

.dialog__footer {
  display: flex;
  justify-content: flex-end;
  padding: 0.675em 1em;
  border-top: 1px solid #e0e0e0;
  background-color: #f7f7f7;
}

</style>
