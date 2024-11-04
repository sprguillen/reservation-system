<template>
  <button
    class="px-4 py-2 rounded-md text-white font-semibold"
    :class="buttonType"
    @click="$emit('onClick')"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'CustomButton',
  props: {
    type: {
      type: String,
      required: false,
    },
  },
  computed: {
    buttonType () {
      if (this.type === 'primary') {
        return 'bg-primary hover:bg-primary-2';
      } else if (this.type === 'secondary') {
        return 'bg-secondary hover:bg-secondary-2';
      }

      return 'bg-gray-300 hover:bg-gray-400';
    }
  }
}
</script>