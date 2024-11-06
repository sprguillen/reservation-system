<template>
  <div class="flex flex-col relative">
    <div class="flex justify-between">
      <label>{{ label.charAt(0).toUpperCase() + label.slice(1) }}</label>
      <span
        v-if="label === 'saturday'"
        class="cursor-pointer text-sm font-semibold text-gray-500"
        @click="$emit('applyAllDays')"
      >
        Apply on all days
      </span>
    </div>
    <div class="p-1 border border-gray-300 bg-gray-50 rounded-lg flex flex-wrap gap-1">
      <div
        v-for="(slot, index) in convertedSlots"
        :key="index"
        class="rounded-full p-0.5 flex items-center gap-1 w-40"
      >
        <input
          type="text"
          :value="slot.start"
          @input="onStartInput($event, index)"
          class="bg-white text-gray-800 p-1 border border-gray-300 rounded-lg w-1/3 text-xs"
        />
        <input
          type="text"
          :value="slot.end"
          @input="onEndInput($event, index)"
          class="bg-white text-gray-800 p-1 border border-gray-300 rounded-lg w-1/3 text-xs"
        />
        <button class="rounded-full bg-gray-200 text-secondary-2 h-8 w-8 absolute right-2" @click="addSlot">+</button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'CustomSlots',
  props: {
    label: {
      type: String,
      required: false,
    },
    currentSlots: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      slots: [
        ['00:00', '00:00'],
      ],
    }
  },
  computed: {
    convertedSlots() {
      return this.slots?.map((slot) => {
        const [start, end] = slot;

        return {
          start,
          end,
        }
      });
    }
  },
  methods: {
    checkTimeIfValid(value) {
      return moment(value, 'HH:mm', true).isValid();
    },
    onStartInput(event, index) {
      const { value } = event.target;
      if (this.checkTimeIfValid(value) || value.length < 5) {
        this.$set(this.slots, index, [value, this.slots[index][1]]);
        this.$emit('onUpdate', this.slots, this.label);
      } else {
        this.$set(this.slots, index, ['00:00', this.slots[index][1]]);
        console.error('Please enter a valid time format');
      }
    },
    onEndInput(event, index) {
      const { value } = event.target;
      if (this.checkTimeIfValid(value)) {
        this.$set(this.slots, index, [this.slots[index][0], value]);
        this.$emit('onUpdate', this.slots, this.label);
      } else if (value.length >= 5) {
        this.$set(this.slots, index, [this.slots[index][0], '00:00']);
        console.error('Please enter a valid time format');
      }
    },
    addSlot() {
      if (this.slots.length < 3) {
        this.slots.push(['00:00', '00:00']);
      }
    }
  },
  watch: {
    currentSlots: {
      immediate: true,
      deep: true,
      handler(newSlots) {
        if (newSlots && newSlots.length) {
          this.slots = [...newSlots];
        } else {
          this.slots = [['00:00', '00:00']];
        }
      }
    },
  }
}
</script>