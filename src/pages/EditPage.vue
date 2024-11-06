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
          <span class="text-secondary font-semibold cursor-pointer" @click="disableBranch">Disable Branch Reservation</span>
          <custom-button :disable="!isDirty || isLoading" type="submit" color="primary">Submit</custom-button>
        </div>
      </form>
    </section>
    <popup-modal ref="confirmModal" title="Confirm">
      <p>Confirm {{ actionType === 'edit' ? `the edit of branch ${branch.name}`: `disable reservation of ${branch.name}` }}</p>
      <template slot="footer">
        <div class="flex gap-x-4">
          <custom-button @onClick="closeConfirmModal">Cancel</custom-button>
          <custom-button :disable="isLoading" @onClick="editBranchAction" color="primary">
            <loader-spinner v-if="isLoading" />
            <span v-else>Ok</span>
          </custom-button>
        </div>
      </template>
    </popup-modal>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomMultiSelect from '@/components/CustomMultiSelect.vue';
import CustomSlots from '@/components/CustomSlots.vue';
import PopupModal from '@/components/PopupModal.vue';
import LoaderSpinner from '@/components/LoaderSpinner.vue';
import { isEmpty } from '@/utils';

export default {
  name: 'EditPage',
  components: {
    CustomInput,
    CustomButton,
    CustomMultiSelect,
    CustomSlots,
    PopupModal,
    LoaderSpinner,
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
      reservationTimes: {},
      isDirty: false,
      isLoading: false,
      actionType: null,
    }
  },
  computed: {
    ...mapGetters({
      branch: 'getCurrentBranch',
    }),
    currentSlots() {
      return (day) => {
        return this.reservationTimes[day] || [];
      };
    },
    reservationTimesCloned() {
      return Object.assign({}, this.reservationTimes);
    },
    branchId() {
      return this.$route.params.branchId;
    },
  },
  methods: {
    ...mapActions(['fetchBranch', 'updateBranch']),
    reset() {
      this.actionType = null;
      this.isLoading = false;
    },
    closeConfirmModal() {
      this.$refs.confirmModal.close();
    },
    disableBranch() {
      this.actionType = 'disable';
      this.$refs.confirmModal.open();
    },
    submitForm() {
      this.actionType = 'edit';
      this.$refs.confirmModal.open();
    },
    async editBranchAction() {
      this.isLoading = true;
      const data = {
        id: this.branchId,
        payload: {},
      };

      if (this.actionType === 'edit') {
        data.payload = {
          'reservation_duration': this.reservationDuration,
          'reservation_times': this.reservationTimes,
        }
      } else {
        data.payload['accepts_reservations'] = false;
      }

      await this.updateBranch(data);
      await this.fetchBranch(this.branchId);
      this.reset()
      this.$refs.confirmModal.close();
      this.$router.go(-1);
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
    this.fetchBranch(this.branchId);
  },
  watch: {
    branch(newVal) {
      if (newVal) {
        this.reservationDuration = newVal.reservation_duration;
        this.reservationTimes = newVal.reservation_times ? newVal.reservation_times : {};
      }
    },
    reservationDuration(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        this.isDirty = true;
      }
    },
    reservationTimesCloned: {
      deep: true,
      handler(newVal, oldVal) {
        if (!isEmpty(oldVal) && newVal !== oldVal) {
          this.isDirty = true;
        }
      }
    }
  }
}
</script>
