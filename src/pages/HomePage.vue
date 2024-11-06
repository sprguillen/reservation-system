<template>
  <main class="p-4">
    <section class="shadow bg-white rounded-lg p-4">
      <div class="flex flex-row-reverse mb-4 gap-2">
        <custom-button color="secondary" @onClick="openActionModal('disable')">Disable Reservations</custom-button>
        <custom-button @onClick="openActionModal('add')">Add Branches</custom-button>
      </div>
      <div class="flex items-center justify-center">
        <loader-spinner v-if="isTableLoading" />
        <table v-else class="w-full table-auto">
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
              <td class="p-4 text-left cursor-pointer underline">
                <router-link
                  :to="{
                    name: 'EditBranch',
                    params: {
                      branchId: branch.id
                    }
                  }"
                >
                  {{ branch.name }}
                </router-link>
              </td>
              <td class="p-4 text-left">{{ branch.reference }}</td>
              <td class="p-4 text-left">{{ getTableCount(branch) }}</td>
              <td class="p-4 text-left">{{ branch.reservation_duration }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <popup-modal ref="actionModal" :title="actionModalTitle">
      <custom-select
        v-if="branches.length || disabledBranches.length"
        :options="
          type === 'add' ? disabledBranches : branches"
        :value="branchToUpdate"
        @onChange="branchToUpdate = $event"
      />
      <template slot="footer">
        <div class="flex gap-4 mt-4">
          <custom-button @onClick="closeActionModal">Cancel</custom-button>
          <custom-button :disable="!branchToUpdate" @onClick="openConfirmModal" color="primary">Save</custom-button>
        </div>
      </template>
    </popup-modal>
    <popup-modal ref="confirmModal" title="Confirm">
      <p>Confirm {{ type === 'add' ? `enable reservation of ${branchName}?` : `disable reservation of ${branchName}?` }}</p>
      <template slot="footer">
        <div class="flex gap-4 mt-4">
          <custom-button @onClick="closeConfirmModal">Cancel</custom-button>
          <custom-button :disable="isLoading" @onClick="saveBranchAction" color="primary">
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
import LoaderSpinner from '@/components/LoaderSpinner.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import PopupModal from '@/components/PopupModal.vue';
import { countTables } from '@/utils';

export default {
  name: 'HomePage',
  components: {
    PopupModal,
    CustomButton,
    CustomSelect,
    LoaderSpinner,
  },
  data () {
    return {
      branchToUpdate: null,
      branchName: null,
      type: null,
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      branches: 'getAllBookableBranches',
      disabledBranches: 'getAllDisabledBranches',
    }),
    isTableLoading() {
      return this.branches.length === 0
    },
    actionModalTitle() {
      return this.type === 'add' ? 'Add Branches' : 'Disable Branches';
    },
  },
  methods: {
    ...mapActions(['fetchBranches', 'updateBranch']),
    getTableCount (branch) {
      return countTables(branch);
    },
    openActionModal(type) {
      this.type = type;
      this.$refs.actionModal.open();
    },
    reset() {
      this.branchToUpdate = null;
      this.branchName = null;
      this.type = null;
      this.isLoading = false;
    },
    closeActionModal() {
      this.reset();
      this.$refs.actionModal.close();
    },
    closeConfirmModal() {
      this.$refs.confirmModal.close();
    },
    openConfirmModal() {
      this.$refs.confirmModal.open();
    },
    async saveBranchAction() {
      this.isLoading = true;
      const data = {
        id: this.branchToUpdate,
        payload: {}
      };
      if (this.type === 'add') {
        data.payload['accepts_reservations'] = true;
      } else if (this.type === 'disable') {
        data.payload['accepts_reservations'] = false;
      }

      await this.updateBranch(data);
      await this.fetchBranches();
      this.reset();
      this.$refs.confirmModal.close();
      this.$refs.actionModal.close();
    }
  },
  created() {
    this.fetchBranches();
  },
  watch: {
    branchToUpdate(newVal) {
      if (newVal) {
        if (this.type === 'add') {
          this.branchName = this.disabledBranches.find((branch) => branch.id === newVal).name;
        } else {
          this.branchName = this.branches.find((branch) => branch.id === newVal).name;
        }
      }
    }
  }
}
</script>
