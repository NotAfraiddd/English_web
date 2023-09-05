<template>
  <div>
    <BaseSearch :search="inputSearch" @update="updateValue" />
  </div>
</template>
<script>
import BaseSearch from '../../../components/common/BaseSearch.vue';

BaseSearch;
export default {
  name: 'Course',
  components: { BaseSearch },

  data() {
    return {
      inputSearch: '',
    };
  },
  methods: {
    updateValue(data) {
      this.inputSearch = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
