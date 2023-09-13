<template lang="">
  <a-config-provider>
    <a-date-picker
      @change="handleChange"
      v-model:value="calendar"
      :allowClear="false"
      :placeholder="placeholder"
      :class="externalClass"
      :disabled="disabled"
      size="large"
    />
  </a-config-provider>
</template>
<script>
import dayjs from 'dayjs';

export default {
  props: {
    externalClass: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    calendarProp: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  created() {
    this.calendar = this.calendarProp
      ? dayjs(this.calendarProp, 'YYYY-MM-DD')
      : null;
  },
  watch: {
    calendarProp(newVal) {
      this.calendar = newVal ? dayjs(newVal, 'YYYY-MM-DD') : null;
    },
  },
  data() {
    return {
      localTime: null,
      calendar: '',
    };
  },
  methods: {
    /**
     * get new time and emit event to component parent
     */
    handleChange(newDate) {
      this.localTime = newDate.format('YYYY-MM-DD');
      this.$emit('update', this.localTime);
    },
  },
};
</script>
<style lang="scss">
.ant-picker-input > input {
  font-size: 15px !important;
}

.ant-picker {
  height: 40px !important;
}

.ant-picker-focused {
  border-color: #d9d9d9 !important;
  box-shadow: none !important;
}

.ant-picker:hover {
  border-color: #d9d9d9 !important;
}

.ant-picker-today-btn {
  font-size: 0;
  position: relative;
  &::after {
    content: 'Now';
    font-size: 16px;
    position: absolute;
    width: 50px;
    left: -28px;
  }
}
.ant-picker.ant-picker-disabled {
  background-color: transparent;
}
.ant-picker-input > input[disabled] {
  color: #615a5a;
}
</style>
