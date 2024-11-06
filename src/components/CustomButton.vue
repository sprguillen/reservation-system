<template>
  <div>
    <button
      class="disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      :class="buttonType"
      @click="$emit('onClick')"
      :disabled="disable"
      :type="type"
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
      default: () => 'button',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String,
      required: false,
    }
  },
  computed: {
    buttonType () {
      if (this.shape && this.shape === 'circle') {
        return 'rounded-full h-8 w-8 text-gray-500 border-2 border-gray-200';
      } else {
        if (this.color === 'primary') {
          return 'px-4 py-2 rounded-md border-2 bg-primary hover:bg-primary-2 text-white';
        } else if (this.color === 'secondary') {
          return 'px-4 py-2 rounded-md border-2 bg-secondary hover:bg-secondary-2 text-white';
        }

      }

      return 'px-4 py-2 rounded-md border-2 border-gray-200 hover:bg-gray-200 text-gray-500';
    }
  }
}
</script>