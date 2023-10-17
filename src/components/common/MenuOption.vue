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
      'w-32 rounded-lg absolute menu-option right-14 bg-white border py-2',
      showOption && activeId === id ? 'block' : 'hidden',
    ]"
  >
    <div
      class="h-7 leading-7 hover:bg-table_border cursor-pointer"
      @click="handleDelete"
    >
      Delete
    </div>
    <div
      class="h-7 leading-7 hover:bg-table_border cursor-pointer"
      @click="handleEdit"
    >
      Edit
    </div>
    <div
      class="h-7 leading-7 hover:bg-table_border cursor-pointer"
      @click="handleReport"
    >
      Report
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
    };
  },
  watch: {
    idProp(newVal) {
      this.id = newVal;
    },
  },
  methods: {
    handleDelete() {
      console.log('Delete method');
    },
    handleEdit() {
      console.log('Edit method');
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
