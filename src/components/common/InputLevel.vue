<template lang="">
  <a-radio-group
    :disabled="disabled"
    v-model:value="radio"
    :class="externalClass"
    @change="updateGender"
  >
    <a-radio :value="1">Basic</a-radio>
    <a-radio :value="2">Intermediate</a-radio>
    <a-radio :value="3">Advanced</a-radio>
  </a-radio-group>
</template>
<script>
export default {
  props: {
    externalClass: { type: String, default: '' },
    radioProp: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  created() {
    this.radio = this.radioProp;
  },
  watch: {
    radioProp(newVal) {
      this.radio = newVal;
    },
  },
  data() {
    return {
      radio: null,
    };
  },
  methods: {
    updateGender(e) {
      this.$emit('update', e.target.value);
    },
  },
};
</script>
<style lang="scss">
.ant-radio + span,
.ant-radio-disabled + span {
  color: #615a5a;
}
</style>
