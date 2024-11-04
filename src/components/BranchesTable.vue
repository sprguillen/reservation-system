<template>
  <div>
    <section class="branches-table">
      <div class="branches-table__actions">
        <CustomButton type="primary" @onClick="openModal">Add Branches</CustomButton>
      </div>
      <div class="branches-table__content">
        <table>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Reference</th>
              <th>Number of Tables</th>
              <th>Reservation Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(branch, i) in branches" :key="i">
              <td class="cursor-pointer"><router-link to="/edit">{{ branch.name }}</router-link></td>
              <td>{{ branch.reference }}</td>
              <td>{{ branch.numOfTables }}</td>
              <td>{{ branch.reservationDuration }}</td>
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
        <div class="footer-action">
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
<style scoped>
.branches-table {
  -webkit-box-shadow: 1px 1px 5px 0px #D3D3D3;
  -moz-box-shadow: 1px 1px 5px 0px #D3D3D3;
  box-shadow: 1px 1px 5px 0px #D3D3D3;
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 1rem;
}

.branches-table__content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.branches-table__actions {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 1rem;
}

.branches-table table {
  border-collapse: collapse;
}

table thead {
  border-top: 1px solid #D3D3D3;
  border-bottom: 1px solid #D3D3D3; 
}

table tr th, table tr td {
  padding: 1em;
}

.footer-action {
  display: flex;
  gap: 1em;
}
</style>