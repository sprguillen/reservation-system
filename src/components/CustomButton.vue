<template>
  <button
    class="px-4 py-2 rounded-md font-semibold"
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
        return 'bg-primary hover:bg-primary-2 text-white';
      } else if (this.type === 'secondary') {
        return 'bg-secondary hover:bg-secondary-2 text-white';
      }

      return 'border-2 border-gray-200 hover:bg-gray-200 text-gray-500';
    }
  }
}
</script>