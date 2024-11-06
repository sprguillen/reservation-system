<template>
  <div class="flex flex-col">
    <label class="text-left">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      class="p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
      :type="type"
      :value="value"
      @input="inputHandler"
      :placeholder="placeholder"
      :readonly="readOnly"
      :required="required"
    />
  </div>
</template>
<script>
export default {
  name: 'CustomInput',
  props: {
    label: {
      type: String,
      required: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    type: {
      type: String,
      default: () => 'text',
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    inputHandler(event) {
      if (this.type === 'number') {
        this.$emit('onInput', +event.target.value);
      } else {
        this.$emit('onInput', event.target.value);
      }
    }
  }
}
</script>
