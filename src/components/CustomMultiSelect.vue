<template>
  <div class="flex flex-col relative">
    <label>{{ label }}</label>
    <div class="p-1 border border-gray-300 bg-gray-50 rounded-lg flex flex-wrap gap-1">
      <div
        v-for="(option, index) in values"
        :key="index"
        class="bg-primary text-white rounded-full px-4 py-1 flex items-center gap-1"
      >
        <span>{{ prepend ? `${prepend} - ${option.name}` : option.name }}</span>
        <button v-if="!readOnly" @click="removeOption(option)" class="text-white font-bold ml-1">x</button>
      </div>
      <input
        :placeholder="!values || values?.length === 0 ? 'Select tables' : ''"
        class="outline-none flex-grow"
        @blur="showDropdown = false"
        @click.stop="toggleDropdown"
        :disabled="readOnly"
      />
    </div>
    <div v-if="showDropdown && remainingOptions?.length" class="absolute z-10 bg-gray-50 border border-gray-300 rounded-lg top-20 w-full">
      <ul>
        <li
          v-for="option in remainingOptions"
          :key="option.value"
          class="p-2 hover:bg-gray-200 cursor-pointer"
          @click="selectOption(option)"
        >
          {{ prepend ? `${prepend} - ${option.name}` : option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomMultiSelect',
  data() {
    return {
      showDropdown: false,
    }
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    prepend: {
      type: String,
      required: false,
    },
    readOnly: {
      type: Boolean,
      default: () => false,
    }
  },
  computed: {
    remainingOptions() {
      return this.options.filter(option => !this.values.includes(option));
    },
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option);
      this.showDropdown = false;
    },
    removeOption(value) {
      this.$emit('remove', value);
    },
    toggleDropdown() {
      if (!this.readOnly) {
        this.showDropdown = !this.showDropdown;
      }
    }
  }
}
</script>
