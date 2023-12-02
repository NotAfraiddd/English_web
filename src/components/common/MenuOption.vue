<template>
  <div
    @click.stop="showOptions(id)"
    :class="['cursor-pointer icon-option']"
    ref="notifyBox"
  >
    <img
      :src="OPTION_ICON"
      alt=""
      srcset=""
      class="px-2 py-1 hover:opacity-70"
    />
  </div>
  <div
    :class="[
      'w-28 rounded-lg absolute menu-option right-11 bg-white border z-10',
      showOption && activeId === id ? 'block' : 'hidden',
    ]"
  >
    <div
      class="hover:bg-table_border cursor-pointer flex px-3 py-1"
      @click="handleReport"
    >
      <img :src="REPORT" alt="" class="h-6 leading-6 mr-3 text-sm" />
      Report
    </div>
  </div>
</template>

<script>
import { OPTION_ICON, REPORT } from '../../constants/image';

export default {
  props: {
    idProp: { type: Number, default: null },
  },
  created() {
    this.REPORT = REPORT;
    this.OPTION_ICON = OPTION_ICON;
  },
  data() {
    return {
      showOption: false,
      activeId: null,
      id: this.idProp,
    };
  },
  watch: {
    idProp(newVal) {
      this.id = newVal;
    },
  },
  methods: {
    handleReport() {
      this.$emit('report');
    },
    showOptions(data) {
      this.activeId = data;
      if (!this.showOption) {
        this.showOption = true;
        setTimeout(() => {
          document.addEventListener('click', this.handleDocumentClick);
        }, 0);
      }
    },
    handleDocumentClick(event) {
      const notifyBox = this.$refs.notifyBox;
      const target = event.target;
      if (notifyBox && !notifyBox.contains(target)) {
        this.showOption = false;
        document.removeEventListener('click', this.handleDocumentClick);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
