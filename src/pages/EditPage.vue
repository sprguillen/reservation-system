<template>
  <main class="p-4 flex justify-center">
    <section class="shadow bg-white rounded-lg flex flex-col justify-start p-4 w-6/12">
      <h1 class="mb-8">Edit Branch Reservation Settings</h1>
      <div class="p-4 mb-4 text-sm bg-blue-50 rounded-lg" role="alert">
        Branch working hours are {{ branch?.opening_from }} - {{ branch?.opening_to }}.
      </div>
      <form @submit.prevent="submitForm">
        <custom-input
          class="mb-4"
          type="number"
          label="Reservation Duration (minutes)"
          v-model="reservationDuration"
          required
        />
        <custom-multi-select
          v-for="(section, i) in branch?.sections"
          :key="i"
          label="Tables"
          class="mb-4"
          :prepend="section?.name"
          :options="section?.tables"
          :values="section?.tables.filter((table) => !!table.accepts_reservations)"
          readOnly
        />
        <custom-slots
          v-for="day in days"
          :key="day"
          :label="day"
          class="mb-4"
          :currentSlots="currentSlots(day)"
          @applyAllDays="applyAllDays"
          @onUpdate="slotUpdate"
        />
        <div class="flex justify-between items-center">
          <span class="text-secondary font-semibold">Disable Branch Reservation</span>
          <custom-button :disable="!isDirty" type="submit" color="primary">Submit</custom-button>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomMultiSelect from '@/components/CustomMultiSelect.vue';
import CustomSlots from '@/components/CustomSlots.vue';

export default {
  name: 'EditPage',
  components: {
    CustomInput,
    CustomButton,
    CustomMultiSelect,
    CustomSlots,
  },
  data() {
    return {
      days: [
        'saturday',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
      ],
      reservationDuration: null,
      reservationTimes: {}
    }
  },
  computed: {
    ...mapGetters({
      branch: 'getCurrentBranch',
    }),
    currentSlots() {
      return (day) => {
        console.log('aw');
        return this.reservationTimes[day] || [];
      };
    },
    isDirty() {
      return this.branch.reservation_duration !== this.reservationDuration
        || this.branch.reservation_times !== this.reservationTimes;
    }
  },
  methods: {
    ...mapActions(['fetchBranch']),
    submitForm() {
      console.log(this.branch);
    },
    slotUpdate(slots, label) {
      this.reservationTimes[label] = slots;
    },
    applyAllDays() {
      this.days.forEach((day) => {
        if (day !== 'saturday') {
          this.reservationTimes[day] = [...this.reservationTimes['saturday']];
        }
      });
    }
  },
  created() {
    const { branchId } = this.$route.params;
    this.fetchBranch(branchId);
  },
  watch: {
    branch (newVal) {
      if (newVal) {
        this.reservationDuration = newVal.reservation_duration;
        this.reservationTimes = newVal.reservation_times ? newVal.reservation_times : {};
      }
    }
  }
}
</script>
