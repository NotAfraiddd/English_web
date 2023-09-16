<template lang="">
  <a-radio-group
    :disabled="disabled"
    v-model:value="radio"
    :class="externalClass"
    @change="updateGender"
  >
    <a-radio :value="0">Male</a-radio>
    <a-radio :value="1">Female</a-radio>
  </a-radio-group>
</template>
<script>
export default {
  props: {
    externalClass: { type: String, default: '' },
    radioProp: { type: Number, default: 0 },
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
      radio: this.radioProp,
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
