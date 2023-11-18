<template>
  <a-select
    :disabled="disabled"
    v-model:value="selectedValue"
    :class="externalClass"
    @change="updateLevel"
  >
    <a-select-option :value="0">PENDING</a-select-option>
    <a-select-option :value="1">BEGINNER</a-select-option>
    <a-select-option :value="2">INTERMEDIATE</a-select-option>
    <a-select-option :value="3">ADVANCED</a-select-option>
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
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  height: 100%;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  align-items: center;
}
</style>
