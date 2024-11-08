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
        class="rounded-full p-0.5 w-40"
      >
        <div class="relative flex items-center justify-center gap-1 border rounded-md bg-primary">
          <input
            type="text"
            :value="slot.start"
            @input="onStartInput($event, index)"
            class="bg-transparent text-white p-1 w-1/3 text-sm font-semibold"
          />
          <input
            type="text"
            :value="slot.end"
            @input="onEndInput($event, index)"
            class="bg-transparent text-white p-1 w-1/3 text-sm font-semibold"
          />
          <button
            class="rounded-full h-4 w-4 bg-white flex items-center justify-center"
            type="button"
            @click="removeSlot(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-2 w-2 text-secondary font-semibold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <custom-button
          class="absolute top-7 right-2"
          shape="circle"
          @onClick="addSlot"
        >
          +
        </custom-button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import CustomButton from './CustomButton.vue';

export default {
  name: 'CustomSlots',
  components: {
    CustomButton
  },
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
    },
    removeSlot(index) {
      if (this.slots.length > 1) {
        this.slots.splice(index, 1);
        this.$emit('onUpdate', this.slots, this.label);
      }
    }
  },
  watch: {
    currentSlots: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && newVal.length) {
          this.slots = [...newVal];
        } else {
          this.slots = [['00:00', '00:00']];
        }
      }
    },
  }
}
</script>