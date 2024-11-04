<template>
  <main>
    <branches-table class="p-4" />
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
