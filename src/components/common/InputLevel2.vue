<template>
  <a-select
    :disabled="disabled"
    v-model:value="selectedValue"
    :class="externalClass"
    @change="updateLevel"
  >
    <a-select-option :value="1">Beginner</a-select-option>
    <a-select-option :value="2">Intermediate</a-select-option>
    <a-select-option :value="3">Advanced</a-select-option>
  </a-select>
</template>

<script>
export default {
  props: {
    externalClass: { type: String, default: '' },
    selectedValueProp: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
  },
  created() {
    this.selectedValue = this.selectedValueProp;
  },
  data() {
    return {
      selectedValue: this.selectedValueProp,
    };
  },
  watch: {
    selectedValueProp(newVal) {
      this.selectedValue = newVal;
    },
  },
  methods: {
    updateLevel(value) {
      this.selectedValue = value;
      this.$emit('update', value);
    },
  },
};
</script>
<style lang="scss">
.ant-select-selector {
  border-radius: 8px !important;
}
</style>
