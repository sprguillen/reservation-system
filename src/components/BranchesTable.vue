<template>
  <div>
    <section class="shadow bg-white rounded-lg p-4">
      <div class="flex flex-row-reverse mb-4">
        <CustomButton @onClick="openModal">Add Branches</CustomButton>
      </div>
      <div class="flex items-center justify-center">
        <table class="w-full table-auto">
          <thead>
            <tr class="border-t border-b border-gray-300">
              <th class="p-4 text-left">Branch</th>
              <th class="p-4 text-left">Reference</th>
              <th class="p-4 text-left">Number of Tables</th>
              <th class="p-4 text-left">Reservation Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(branch, i) in branches" :key="i">
              <td class="p-4 text-left cursor-pointer underline"><router-link to="/edit">{{ branch.name }}</router-link></td>
              <td class="p-4 text-left">{{ branch.reference }}</td>
              <td class="p-4 text-left">{{ branch.numOfTables }}</td>
              <td class="p-4 text-left">{{ branch.reservationDuration }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <popup-modal ref="popupModal" title="Add Branches">
      <div>
        <CustomSelect :options="branches" :value="branchToUpdate" />
      </div>
      <template slot="footer">
        <div class="flex gap-4 mt-4">
          <CustomButton @click="closeModal">Cancel</CustomButton>
          <CustomButton type="primary">Save</CustomButton>
        </div>
      </template>
    </popup-modal>
  </div>
</template>
<script>
import PopupModal from './PopupModal.vue';
import CustomButton from './CustomButton.vue';
import CustomSelect from './CustomSelect.vue';
export default {
  name: 'BranchesTable',
  components: {
    PopupModal,
    CustomButton,
    CustomSelect,
  },
  data() {
    return {
      show: false,
      branchToUpdate: '',
      branches: [
        {
          name: 'Branch 1',
          reference: 'B01',
          numOfTables: 0,
          reservationDuration: '30 minutes',
        }
      ]
    }
  },
  methods: {
    openModal() {
      this.$refs.popupModal.open();
    },
    closeModal() {
      this.$refs.popupModal.close();
    }
  }
}
</script>