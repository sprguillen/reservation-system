<template>
  <div>
    <button
      v-if="type"
      class="px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      :class="buttonType"
      :disabled="disable"
      :type="type"
    >
      <slot></slot>
    </button>
    <button
      v-else
      class="px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      :class="buttonType"
      @click="$emit('onClick')"
      :disabled="disable"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: 'CustomButton',
  props: {
    color: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonType () {
      if (this.color === 'primary') {
        return 'bg-primary hover:bg-primary-2 text-white';
      } else if (this.color === 'secondary') {
        return 'bg-secondary hover:bg-secondary-2 text-white';
      }

      return 'border-2 border-gray-200 hover:bg-gray-200 text-gray-500';
    }
  }
}
</script>