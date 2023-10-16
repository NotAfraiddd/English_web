<template>
  <div
    @click.stop="showOptions(id)"
    :class="['relative cursor-pointer px-2 py-1 icon-option']"
    ref="notifyBox"
  >
    <img :src="OPTION_ICON" alt="" srcset="" />
  </div>
  <div
    :class="[
      'w-32 rounded-lg absolute menu-option right-14 bg-white border py-2',
      showOption && activeId === id ? 'block' : 'hidden',
    ]"
  >
    <div v-for="(item, index) in options" :key="index">
      <div class="h-7 leading-7 hover:bg-table_border cursor-pointer">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { OPTION_ICON } from '../../constants/image';

export default {
  props: {
    idProp: { type: String, default: '' },
  },
  created() {
    this.OPTION_ICON = OPTION_ICON;
  },
  data() {
    return {
      showOption: false,
      activeId: null,
      id: this.idProp,
      options: [
        { id: 1, title: 'Delete' },
        { id: 2, title: 'Edit' },
      ],
    };
  },
  watch: {
    idProp(newVal) {
      this.id = newVal;
    },
  },
  methods: {
    showOptions(data) {
      console.log('id ne', data);
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
