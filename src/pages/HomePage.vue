<template>
  <main>
    <branches-table />
  </main>
</template>
<script>
import BranchesTable from '../components/BranchesTable.vue';

export default {
  name: 'HomePage',
  components: {
    BranchesTable,
  }
}
</script>
