<template>
  <div class="flex flex-col">
    <label>{{ label }}</label>
    <div class="grid items-center">
      <select 
        class="p-2.5 bg-gray-50 border border-gray-300 rounded-lg appearance-none row-start-1 col-start-1"
        :value="value"
        @change="$emit('onChange', $event.target.value)"
      >
        <option selected disabled value="">{{ placeholder }}</option>
        <option
          v-for="(option, i) in options"
          :key="i"
          :value="option.id || option.name"
        >{{ option.name || option.label }}</option>
      </select>
      <span class="pointer-events-none row-start-1 col-start-1 absolute right-6">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path
            fill-rule="evenodd"
            d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomSelect',
  props: {
    value: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: () => 'Please choose an option',
    }
  }
}
</script>